# Next.js Application with Docker

This is a Next.js application containerized with Docker for both development and production environments.

## Prerequisites

- Docker
- Docker Compose

## Getting Started

1. Clone the repository
2. Copy the environment file:
   ```bash
   cp .env.example .env
   ```

## Development

To run the application in development mode:

```bash
docker-compose up web-dev
```

The application will be available at http://localhost:3000 with hot-reload enabled.

## Production

To run the application in production mode:

```bash
docker-compose up web-prod
```

The application will be available at http://localhost:3000.

## Building for Production

To build the production Docker image:

```bash
docker build -t nextjs-app .
```

To run the production image:

```bash
docker run -p 3000:3000 nextjs-app
```

## Docker Commands

- Build the images:

  ```bash
  docker-compose build
  ```

- Start the services:

  ```bash
  docker-compose up
  ```

- Stop the services:

  ```bash
  docker-compose down
  ```

- View logs:
  ```bash
  docker-compose logs -f
  ```

## Project Structure

```
.
├── Dockerfile          # Production Dockerfile
├── Dockerfile.dev      # Development Dockerfile
├── docker-compose.yml  # Docker Compose configuration
├── .dockerignore      # Docker ignore file
├── .env.example       # Example environment variables
└── ...                # Application files
```

## Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
NODE_ENV=development
PORT=3000
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

## Notes

- The development environment uses volume mounting for hot-reload
- The production environment uses multi-stage builds for optimization
- Node.js 20 Alpine is used as the base image for smaller size
- The application runs as a non-root user in production
