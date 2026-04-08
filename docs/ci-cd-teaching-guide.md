# Simple CI/CD guide

Use these files to explain the pipeline in a simple order:

1. `ci.yml`
2. `Dockerfile`
3. `docker-deploy.yml`
4. `rollback.yml`
5. `docker-local-vs-github-actions.md`

## What each file does

### `ci.yml`

- Installs packages
- Runs build
- Runs tests

### `Dockerfile`

- Builds the Node.js app as a Docker image
- Exposes port `3000`
- Starts the server with `node index.js`

### `docker-deploy.yml`

- Runs tests first
- Builds the Docker image
- Pushes the image to GitHub Container Registry
- Sends a webhook to trigger deployment
- Converts the repository name to lowercase for GHCR

### `rollback.yml`

- Takes an old image tag
- Sends that tag to the deploy system
- Restores the previous version

## Secrets needed in GitHub

- `DEPLOY_WEBHOOK_URL`
- `DEPLOY_WEBHOOK_TOKEN`

GitHub already gives `GITHUB_TOKEN`, so students do not need to create that one.

## Simple teaching flow

1. Push code to `main`.
2. Show `ci.yml` passing.
3. Show Docker image build and push.
4. Show deployment webhook trigger.
5. Enter an old tag in `rollback.yml`.
6. Explain that rollback means redeploying an older image.

## Main lesson

- CI checks the code.
- Docker packages the app.
- Registry stores versions.
- Deploy uses a saved image.
- Rollback uses an older saved image.