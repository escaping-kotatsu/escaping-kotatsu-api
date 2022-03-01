FROM node:14.17.0-alpine

WORKDIR /app

RUN apk update
RUN apk add yarn

ADD package.json ./

RUN yarn install
RUN npx prisma generate --schema=./src/db/prisma/schema.prisma
