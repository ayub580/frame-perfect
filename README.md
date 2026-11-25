# Frame Perfect

A multi-page gaming site: new game releases, speedrun games, and links to YouTube speedruns,
world-record videos and speedrun.com leaderboards. Plain HTML, CSS and JavaScript. No build step.

## Files
- public/index.html  page shell
- public/style.css   all styling (light and dark)
- public/app.js      game data, pages, routing, cookie consent
- nginx.conf.template  nginx config; proxies the two live-data APIs and hides the API key
- Dockerfile, docker-compose.yml  run it in nginx

## Live data (auto-updating games and runs)
- **New releases**: RAWG API. Get a free key at https://rawg.io/apidocs, copy `.env.example` to `.env`, and paste the key in.
  The site shows RAWG's most-wanted games from 2 weeks ago to 90 days ahead, merged with your hand-written list.
  RAWG's terms require a visible link back to RAWG (the footer has one).
- **Speedruns and world records**: speedrun.com API v1, no key needed. Home and Speedrun pages list the latest verified runs;
  game pages show current world records when the game name matches speedrun.com exactly.
- **Cover art**: games with no `img` get a cover from RAWG automatically (exact name match only), so you don't have to download images.
  Games RAWG can't match keep the generated placeholder art. Adding `img:` to a game in GAMES still overrides everything.
- nginx caches both (5 and 30 minutes) and the page refreshes the release list every 30 minutes.
- If an API is down or the key is missing, the site quietly falls back to the built-in GAMES list.

## Run with Docker

### Prerequisites
- [Docker](https://www.docker.com/) and Docker Compose must be installed on your machine.

### Steps

1. **Open a terminal** and `cd` into the project folder:
   ```bash
   cd path/to/frame-perfect
   ```

2. **Build and start** the container:
   ```bash
   docker compose up --build
   ```
   Wait until you see a log line like `start worker process` — that means nginx is ready.

3. **Open your browser** and go to:
   ```
   http://localhost:8080
   ```

4. **To stop** the container, press `Ctrl + C` in the terminal, or run:
   ```bash
   docker compose down
   ```

### Without Docker Compose

```bash
docker build -t frame-perfect .
docker run --rm -p 8080:80 -e RAWG_API_KEY=your_key frame-perfect
```
Then open http://localhost:8080.

### Troubleshooting

| Problem | Fix |
|---|---|
| **"Cannot reach localhost:8080"** | Make sure Docker is running and the container started without errors. Check `docker ps` — the container should show `0.0.0.0:8080->80/tcp` under PORTS. |
| **Port 8080 already in use** | Another app is using that port. Either stop it, or change the port in `docker-compose.yml` (e.g. `"9090:80"`) and open `http://localhost:9090` instead. |
| **Container exits immediately** | Run `docker compose logs` to see the error. Usually a missing file (check that `nginx.conf` and the `public/` folder exist). |
| **Changes not showing** | Rebuild with `docker compose up --build` — the image caches old files. |

## Run without Docker
Open `public/index.html` in a browser.

## Edit content
Open public/app.js and edit the GAMES list. To use real cover art, add img:"images/name.jpg" to a game
and put the file in public/images/ (only use images you have the right to use).

## Pages
#home, #new, #categories, #cat-indie, #cat-triple-a, #cat-retro, #runs, #game-<name> (for example #game-super-mario-64)
