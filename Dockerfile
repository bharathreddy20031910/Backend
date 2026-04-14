FROM node:24-alpine3.22

WORKDIR /app

COPY  package*.json ./
RUN npm ci 

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 CMD [ "executable" ]

CMD [ "node","index.js" ]