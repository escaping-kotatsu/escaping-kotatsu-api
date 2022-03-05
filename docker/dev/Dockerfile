FROM node:14.17.0-alpine

WORKDIR /app

RUN apk update
RUN apk add yarn

ADD package.json ./

COPY . .

RUN yarn install
RUN yarn run build
