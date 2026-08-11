# Docker hosting

## Quick start

1. Install [Docker Desktop](https://www.docker.com/products/docker-desktop/)
2. Ensure `.env` exists (see `.env.docker.example`)
3. From the project root:

```bash
docker compose up --build -d
```

4. Open:
- Site: http://localhost:8080
- Blog: http://localhost:8080/blog
- API: http://localhost:3005/api/blog
- Health: http://localhost:3005/api/health

## n8n

POST to:

`http://localhost:3005/api/blog`

Header:

`Authorization: Bearer <BLOG_API_SECRET from .env>`

## Useful commands

```bash
docker compose logs -f
docker compose down
docker compose up --build -d
```

Blog posts are stored in the Docker volume `blog_data`.
