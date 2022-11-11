# Football Results

This project retrieves and displays up to date standings for the UK Premier League. As the API I
use to source the standings themselves has a fairly limited free tier of 100 requests per day, it has
made for an interesting challenge!

## Structure

The UI is a React application, and can be found under the `client` folder. It is hosted at https://football.fly.dev/.

The API is a Rust server built using `axum`, and can be found under the `server` folder.
It is hosted at https://football-api.fly.dev/.

There is also a minimal `axum` server under the `mock_football_api` folder, which serves a fixed JSON response identical
in form to that of the source API. This is used when developing locally to avoid rapidly exhausting the 100 request per
day limit.

For further details on the sub-projects, see the `README`s in their respective folders.
