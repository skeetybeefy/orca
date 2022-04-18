FROM node:16.14-alpine as development
WORKDIR /usr/src/app
COPY yarn.lock ./
COPY package.json ./
COPY lerna.json ./
COPY tsconfig.json ./
COPY packages/backend/tsconfig.json ./packages/backend/
COPY packages/backend/tsconfig.build.json ./packages/backend/
COPY packages/frontend/tsconfig.json ./packages/frontend/
COPY packages/types/tsconfig.json ./packages/types/
COPY packages/backend/package.json ./packages/backend/
COPY packages/frontend/package.json ./packages/frontend/
COPY packages/frontend/next.config.js ./packages/frontend/
COPY packages/types/package.json ./packages/types/
RUN yarn install --frozen-lockfile
COPY packages/types/src ./packages/types/src
RUN yarn run lerna run build --scope @orca/types
RUN yarn run lerna bootstrap

FROM development as production.prepare
WORKDIR /usr/src/app
COPY packages/types/src ./packages/types/src
COPY packages/frontend/next.config.js ./packages/frontend/
COPY packages/frontend/src ./packages/frontend/src
COPY packages/backend/src ./packages/backend/src
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}}
RUN yarn run lerna run build


FROM node:16.14-alpine as production.frontend
WORKDIR /usr/src/app
COPY --from=production.prepare /usr/src/app/packages/frontend/.next/standalone ./
COPY --from=production.prepare /usr/src/app/packages/frontend/.next/static ./packages/frontend/.next/static
COPY packages/frontend/public ./packages/frontend/public
CMD node packages/frontend/server.js

FROM production.prepare as production.backend
WORKDIR /usr/src/app/packages/backend