FROM node:16.14-alpine as development
WORKDIR /usr/src/app
COPY ../../tsconfig.json ./
COPY package.json ./packages/backend
COPY ../../yarn.lock ./packages/backend
COPY tsconfig.json ./packages/backend
COPY tsconfig.build.json ./packages/backend
WORKDIR /usr/src/app/packages/backend
RUN yarn install --frozen-lockfile