# All-in-one image for Railway: Blog API + Nginx (frontend)
# Fixes: nginx "host not found in upstream api" on single-service deploys

FROM node:22-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY index.html ./
COPY tsconfig.json tsconfig.app.json tsconfig.node.json ./
COPY vite.config.ts ./
COPY public ./public
COPY src ./src

ARG VITE_BASE_PATH=/
ARG VITE_BLOG_API_URL=
ENV VITE_BASE_PATH=$VITE_BASE_PATH
ENV VITE_BLOG_API_URL=$VITE_BLOG_API_URL

RUN npm run build

FROM node:22-alpine AS runtime
WORKDIR /app

RUN apk add --no-cache nginx gettext wget \
  && mkdir -p /run/nginx /var/log/nginx /usr/share/nginx/html /etc/nginx/templates /app/data

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY server ./server
COPY data ./data-seed
COPY docker/nginx.conf.template /etc/nginx/templates/default.conf.template
COPY docker/railway-entrypoint.sh /railway-entrypoint.sh
COPY --from=build /app/dist /usr/share/nginx/html

RUN sed -i 's/\r$//' /railway-entrypoint.sh && chmod +x /railway-entrypoint.sh

ENV NODE_ENV=production
ENV BLOG_API_PORT=3005
ENV API_UPSTREAM=127.0.0.1:3005
ENV PORT=80

EXPOSE 80
ENTRYPOINT ["/railway-entrypoint.sh"]
