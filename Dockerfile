FROM node:16.14-alpine as warmup
WORKDIR /usr/src/app
COPY yarn.lock ./
COPY package.json ./
COPY packages/backend/package.json ./packages/backend/
COPY packages/frontend/package.json ./packages/frontend/
COPY packages/types/package.json ./packages/types/
RUN yarn install --frozen-lockfile

FROM node:16.14-alpine as development
WORKDIR /usr/src/app
COPY tsconfig.json ./
COPY lerna.json ./
COPY .eslintrc.json ./
COPY packages/backend/tsconfig.json ./packages/backend/
COPY packages/backend/tsconfig.build.json ./packages/backend/
COPY packages/frontend/tsconfig.json ./packages/frontend/
COPY packages/types/tsconfig.json ./packages/types/
COPY --from=warmup /usr/src/app ./
RUN yarn run lerna bootstrap