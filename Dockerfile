# Railway / production all-in-one: Node serves API + built frontend
# Listens on 0.0.0.0:$PORT (required by Railway)

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

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY server ./server
COPY data ./data-seed
COPY docker/railway-entrypoint.sh /railway-entrypoint.sh
COPY --from=build /app/dist ./dist

RUN sed -i 's/\r$//' /railway-entrypoint.sh && chmod +x /railway-entrypoint.sh \
  && mkdir -p /app/data

ENV NODE_ENV=production
ENV SERVE_FRONTEND=true
ENV HOST=0.0.0.0
ENV PORT=8080

EXPOSE 8080
ENTRYPOINT ["/railway-entrypoint.sh"]
