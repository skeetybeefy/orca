# development
FROM node:16.14-alpine as development
WORKDIR /usr/src/app
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --frozen-lockfile --development
COPY tsconfig.json ./
COPY tsconfig.build.json ./

# preproduction
FROM node:16.14-alpine as preproduction
WORKDIR /usr/src/app
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --frozen-lockfile --development
COPY . .
RUN yarn build

# production
FROM node:16.14-alpine as production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/app
RUN mkdir /usr/src/app/uploaded
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --frozen-lockfile --production
COPY --from=preproduction /usr/src/app/dist ./dist