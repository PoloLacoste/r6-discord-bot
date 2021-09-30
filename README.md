<h1 align="center">
R6 Discord bot
</h1>

<p align="center">
    <a href="https://github.com/PoloLacoste/r6-discord-bot/issues/new/choose">Report Bug</a>
    ·
    <a href="https://github.com/PoloLacoste/r6-discord-bot/issues/new/choose">Request Feature</a>
</p>

## 🚧 Requirements

- [NodeJS](https://nodejs.org)
  
Optional :

- [Docker](https://www.docker.com)
- [Redis](https://redis.io/)
- [MongoDB](https://www.mongodb.com)

For windows : 
- [Docker Desktop](https://www.docker.com/products/docker-desktop)

## 🛠️ Installation Steps

Clone the repo
```sh
git clone https://github.com/PoloLacoste/r6-discord-bot.git
```

Create a `.env` file

**Required**
```ini
EMAIL=[Rainbow six siege account email]
PASSWORD=[Rainbow six siege account password]
TOKEN=[Discord bot token]
```
**Optional**
```ini
MONGO_URL=[Url of the mongodb instance]
REDIS_URL=[Url of the redis instance]
CACHING=[true or false]
```

Launch the bot
```sh
npm start
```

## 🔧 Build Steps

### 💻 Legacy

To generate the dist folder & build all the javascript files run :

```sh
npm run build
```

Then you can run the project with :

```sh
node dist/index
```

### 🐳 For docker

Build the container

```docker
docker build -t r6-discord-bot .
```

You can choose between two different docker files

- Dockerfile (default docker file).
- Dockerfile.alpine (this will compile the app in a native executable).

Then you can run the docker container :

```docker
docker run r6-discord-bot -e EMAIL=[YOUR_EMAIL] -e PASSWORD=[YOUR_PASSWORD] -e TOKEN=[DISCORD_BOT_TOKEN]
```

With docker compose :

```docker
docker-compose up
```

## ⌨️ Bot commands

### !setLink

This command will link your discord account id with your Rainbow Six Siege username.

Example :

```
!setLink Godly
```

### !getLink

This command will return the current Rainbow Six Siege username linked to your discord account id.

Example :

```
!getLink
```

### 🆔 !id

This command get your unique Rainbow Six Siege player id.

Example :

```
!id
```

Optional arguments :

- platform : To specify the platform the account is on (default `uplay`, `uplay` (pc), `xbl` (Xbox Live) or `psn` (PlayStation Network))

### ⭐ !level

This command will return your current level & lootbox drop chance percentage.

Example :

```
!level
```

Optional arguments :

- platform : To specify the platform the account is on (default `uplay`, `uplay` (pc), `xbl` (Xbox Live) or `psn` (PlayStation Network))

### ⌚ !playtime

This command will return your general, casual, ranked and discovery playtime.

Example :

```
!playtime
```

Optional arguments :

- platform : To specify the platform the account is on (default `uplay`, `uplay` (pc), `xbl` (Xbox Live) or `psn` (PlayStation Network))

### 🏆 !rank

This command will return analytics of the current season.

Example :

```
!rank
```

Optional arguments :

- season : To specify the season number (default is the last season)
- region : To specify the region (default `emea`, can be `emea` (Europe, Middle East and Africa), `ncsa` (North, Central and South America) or `apac` (Asia Pacific))
- platform : To specify the platform the account is on (default `uplay`, can be `uplay` (PC), `xbl` (Xbox Live) or `psn` (PlayStation Network))

Seasons reference :
```js
6: 'Health', 7: 'Blood Orchid', 8: 'White Noise',
9: 'Chimera', 10: 'Para Bellum', 11: 'Grim Sky',
12: 'Wind Bastion', 13: 'Burnt Horizon', 14: 'Phantom Sight',
15: 'Ember Rise', 16: 'Shifting Tides',  17: 'Void Edge',
18: 'Steel Wave', 19: 'Shadow Legacy', 20: 'Neon Dawn',
21: 'Crimson Heist', 22: 'North Star', 23: 'Crystal Guard'
```

### 📊 !stats

This command will return some general analytics of your account (kills, deaths, wins, losses, ...).

Example :

```
!stats
```

Optional arguments :

- platform : To specify the platform the account is on (default `uplay`, `uplay` (pc), `xbl` (Xbox Live) or `psn` (PlayStation Network))

### 🟢 !status

This command will return the status of all the servers.

Example :

```
!status
```

## 🌟 You are all set! You have a problem ? Please open an issue
