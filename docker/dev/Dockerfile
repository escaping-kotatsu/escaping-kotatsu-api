FROM node:16.4.2-alpine

WORKDIR /app

RUN apk update
RUN apk add yarn

ADD package.json ./

COPY . .

RUN yarn run pkg
