FROM node:14-alpine as builder

WORKDIR /usr/src/app

COPY ./package.json ./

RUN npm install

COPY . .

RUN npm run build

RUN npm install -g pkg

RUN pkg --target alpine --output app/r6-discord-bot dist/index.js

FROM alpine:3.13 as production

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/app .

RUN apk add --no-cache build-base
ENTRYPOINT ["/usr/src/app/r6-discord-bot"]