# development
FROM node:16.14-alpine as development
WORKDIR /usr/src/app
COPY package.json ./
RUN yarn install --development
COPY tsconfig.json ./
COPY tsconfig.build.json ./

# preproduction
FROM node:16.14-alpine as preproduction
WORKDIR /usr/src/app
COPY package.json ./
RUN yarn global add rimraf @nestjs/cli
RUN yarn install
COPY . .
RUN yarn build

# production
FROM node:16.14-alpine as production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/app
RUN mkdir /usr/src/app/uploaded
COPY package.json ./
RUN yarn install --production
COPY --from=preproduction /usr/src/app/dist ./dist