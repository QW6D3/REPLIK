FROM node:latest as BUILD
ENV API_USER=adminReplik
ENV API_PASSWORD=123456!
WORKDIR /usr/src/app
COPY package*.json /usr/src/app/
COPY .env /usr/src/app/.env
RUN npm ci --omit=dev && \
    echo "API_USER=$API_USER" >> .env && \
    echo "API_PASSWORD=$API_PASSWORD" >> .env

FROM node:lts-alpine@sha256:6e80991f69cc7722c561e5d14d5e72ab47c0d6b6cfb3ae50fb9cf9a7b30fdf97
RUN apk add dumb-init
COPY --chown=node:node --from=build /usr/src/app/node_modules /usr/src/app/node_modules
COPY --chown=node:node --from=build /usr/src/app/.env /usr/src/app/.env
COPY --chown=node:node . /usr/src/app
USER node
ENV NODE_ENV production
CMD ["dumb-init", "node", "server.js"]