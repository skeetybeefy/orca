# development
FROM node:16.14-alpine as development
WORKDIR /usr/src/app
COPY package.json ./
COPY yarn.lock ./
COPY tsconfig.json ./
RUN yarn install --frozen-lockfile --development

# preproduction
FROM node:16.14-alpine as preproduction
WORKDIR /usr/src/app
COPY package.json ./
COPY yarn.lock ./
COPY tsconfig.json ./
RUN yarn install --frozen-lockfile --development
COPY . .
RUN yarn build

# production
FROM node:16.14-alpine as production
WORKDIR /usr/src/app
ENV NODE_ENV production
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --frozen-lockfile --production
COPY --from=preproduction /usr/src/app/public ./public
COPY --from=preproduction /usr/src/app/.next ./.next