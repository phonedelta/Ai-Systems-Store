# Frontend (Vite build) + Nginx
FROM node:22-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY index.html ./
COPY tsconfig.json tsconfig.app.json tsconfig.node.json ./
COPY vite.config.ts ./
COPY public ./public
COPY src ./src

# Docker host uses root path "/", not GitHub Pages base
ARG VITE_BASE_PATH=/
ARG VITE_BLOG_API_URL=
ENV VITE_BASE_PATH=$VITE_BASE_PATH
ENV VITE_BLOG_API_URL=$VITE_BLOG_API_URL

RUN npm run build

FROM nginx:1.27-alpine AS web
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
