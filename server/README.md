# Football Results API

Production link: https://football-api.fly.dev/

This folder contains the API portion of the Football Results project. Due to a limitation on the source API I use to retrieve the standings, it is required to do some fancy work to ensure that it can always return a valid response! Fortunately, around the same time I started working on this project the amazing [fasterthanlime](https://fasterthanli.me/about) released [this article](https://fasterthanli.me/articles/request-coalescing-in-async-rust), looking into a very similar set of problems. The final solution I've arrived at draws heavily from the ideas written down there, and it's well worth a read!

## The Problem

I'd like for this server to be able to return the current season's premier league scores, at any given point of the day. However, I have a budget of 100 requests I can make to an API which is updated hourly. As I support Middlesbrough FC myself, a currently quite flaky looking Championship team, I'd also like to leave open the avenue to pull in scores for a few more leagues if possible.

I'm also positive that this frankly unremarkable project will draw in crowds from far and wide, so I'd best be able to serve requests asynchronously to really eke out all of the performance from a bottom of the rung free tier fly.io shared CPU VM.

In short, this set of requirements means I would like at most 1 request to go out hourly. As the backing API updates at a fixed point (a new hour on the clock, i.e. the first minute of each hour, xx:00), that "hour" must be timed independently of the previous request. Caching the response the first time we retrieve it within a given hour goes a long way towards mitigating the request limit, but it leaves one quite serious problem still open. Assuming an empty/stale cache, if several (say, 101) requests are made within a very short timeframe, smaller than the total roundtrip time to the backing API and then back again, each one of those requests will see an empty cache, make the call, and immediately exhaust my request quota for the day.

The solution to this is _request deduplication_, but it's not so straightforward. For fully deduplicated requests, the options for an incoming request now look something like

- If the cache is fresh, return the value inside
- Else, if a request to the backing API is already in-transit, subscribe to its result
- Else, start a request and broadcast availability to subscribe to the result we'll be fetching

all further compounded by the intricacies of the cached value being behind a Mutex (required due to several handlers being able to run concurrently) and therefore needing to carefully manage locking/unlocking behaviour.

The majority of this behaviour isn't exactly simple, but it's reasonably straightforward to implement. The real problem is in the 3rd bullet - the immediate broadcasting of the availability of a request as soon as it's made, to ensure that even a concurrent run of the same function behaves appropriately. The magical solution to this problem is a little counter-intuitive. If a request is still currently in-flight when another comes in, we're always happy to await its result instead of making a fresh roundtrip and wasting a precious one of the 100 requests per day. As such, we can simply immediately reach for the Mutex lock as soon as we begin constructing the broadast receiver, and then only drop it at the very end of the process, once all that's left is to await the response. By holding the Mutex lock, we guarantee that no other concurrently running handler can mess things up and send off its own request. Any other handler will immediately reach for the Mutex lock itself, and will dutifully wait in line up until it is released, which is the exact point we have declared the new request is ready to be subscribed to. Intentionally holding a Mutex lock for longer than is strictly necessary feels _wrong_, but the guarantees the Mutex makes are the exact logic we'd only end up implementing ourselves anyway.

With the above solution in place over at `src/cache/mod.rs`, everything works beautifully, and even smashing the server with 10,000 requests running off the back of 50 workers results in extremely timely responses with (most importantly) a single request sent to the rate limited API!

## Deployment

```
fly deploy
```

A combination of fly.io and Docker makes deployment incredibly straightfoward, as running the above command will
build the container on the local machine and then deploy straight to Fly. The `Dockerfile` I use is a 2-stage build
to reduce the overall container size by not bringing in the entire `target` folder when building the final release.
