FROM node:14-alpine as builder

WORKDIR /usr/src/app

COPY ./package.json ./

RUN npm install

COPY . .

RUN npm run build

RUN npm i -g nexe

RUN nexe dist/index.js

FROM alpine:3.13 as production

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/r6-discord-bot .

CMD ["./app"]