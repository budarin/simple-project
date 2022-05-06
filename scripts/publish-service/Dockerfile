FROM node:alpine

RUN apk update && \
    apk --no-cache  add --update nodejs && \
    rm -rf /var/cache/apk/*

LABEL maintainer="Budarin Vadim"

ARG VERSION="1.0.0"

ENV VERSION $VERSION
ENV NODE_ENV production

ENV PORT 3000

ENV LOG_LEVEL info
ENV KILL_TIMEOUT 30000

ENV API_HOST api
ENV API_PORT 5000

ENV REDIS_HOST redis
ENV REDIS_PORT 6379

ENV PG_MIN_POOL_INSTANCES 10
ENV PG_MAX_POOL_INSTANCES 20
ENV PG_HOST postgresql
ENV PG_PORT 5432
ENV PG_DATABASE raketa
ENV PG_USER postgres
ENV PG_PASSWORD postgres

ENV PWA_SCOPE /

LABEL ru.raketa.service.name="service"
LABEL ru.raketa.service.version=$VERSION
LABEL ru.raketa.service.description="A service"

EXPOSE 3000

HEALTHCHECK \
    --start-period=1s \
    --interval=15s \
    --timeout=3s \
    --retries=3 \
    CMD wget --quiet --tries=1 --spider http://localhost:${PORT}/health/liveness || exit 1

WORKDIR /usr/src/app

RUN mkdir /var/www \
    && mkdir /var/upload

RUN \
    chown -R node:node . /usr/src/app \
    && chown -R node:node /var/www/ \
    && chmod a+rx -R /var/www/ \
    && chmod u+w -R /var/www/ \
    && chown -R node:node /var/upload/ \
    && chmod a+rx -R /var/upload/ \
    && chmod u+w -R /var/upload/
# последние 3 строки и вольюм должны быть перенесены в сервис upload


COPY ./dist/server.js ./server.js
COPY ./dist/server.js.map ./server.js.map
COPY ./dist/metrics.js ./metrics.js
COPY ./dist/metrics.js.map ./metrics.js.map

# CMD [ "node", "--max-semi-space-size=64", "--max-old-space-size=64",  "./server.js" ]
CMD [ "node", "--max-semi-space-size=16", "--enable-source-maps", "./server.js" ]


USER node
