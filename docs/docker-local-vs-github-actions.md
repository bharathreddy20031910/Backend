# Docker Desktop vs GitHub Actions

This note helps students understand where Docker runs.

## If you push code to GitHub

- GitHub Actions builds the Docker image on GitHub's server
- The image is pushed to GitHub Container Registry (GHCR)
- Nothing is created automatically in your local Docker Desktop

So after `git push`, you will not see:

- a new local image in Docker Desktop
- a new local container in Docker Desktop

## If you want to see it in Docker Desktop

You must pull the image to your own computer and run it.

```powershell
docker pull ghcr.io/bharathreddy20031910/backend:latest
docker run -d -p 3000:3000 --name backend-app ghcr.io/bharathreddy20031910/backend:latest
```

After that:

- the image appears in Docker Desktop under Images
- the container appears in Docker Desktop under Containers

## Simple difference

- GitHub Actions: builds Docker image in the cloud
- GHCR: stores the Docker image
- Docker Desktop: shows images and containers on your own laptop

## Teaching example

1. Push code to GitHub.
2. Show that the workflow builds the image remotely.
3. Open GHCR and show the pushed image.
4. Run `docker pull` on the local machine.
5. Open Docker Desktop and show the image.
6. Run `docker run` and show the container.