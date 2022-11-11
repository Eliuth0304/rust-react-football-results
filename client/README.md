# Football Results UI

Production link: https://football.fly.dev/

This folder contains the UI portion of the Football Results project. It's a fairly straightforward React project,
built using [Redux Toolkit](https://redux-toolkit.js.org/).

The UI components are located under `src/features`, while the API query logic can be found under `src/services`.

## Deployment

```
fly deploy
```

A combination of fly.io and Docker makes deployment incredibly straightfoward, as running the above command will
build the container on the local machine and then deploy straight to Fly. There is potential work to be done minimising
the final container size by utilising a 2-stage build process to strip dependencies out of the final container
(see the `server` project for a Rust equivalent), but in practice the current setup is simple and works well enough.
