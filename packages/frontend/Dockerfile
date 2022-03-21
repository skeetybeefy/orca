# development
FROM node:16.14-alpine as development
WORKDIR /usr/src/app
COPY package.json ./
COPY tsconfig.json ./
RUN yarn install --development

# preproduction
FROM node:16.14-alpine as preproduction
ARG NEXT_PUBLIC_API_URL
WORKDIR /usr/src/app
COPY package.json ./
COPY tsconfig.json ./
RUN yarn global add next react react-dom
RUN yarn install
COPY . .
RUN yarn build

# production
FROM node:16.14-alpine as production
WORKDIR /usr/src/app
ENV NODE_ENV production
COPY package.json ./
RUN yarn install --production
COPY --from=preproduction /usr/src/app/public ./public
COPY --from=preproduction /usr/src/app/.next ./.next