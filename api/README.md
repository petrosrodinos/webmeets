# NestJs REST API tutorial for FreeCodeCamp

### Run the API in development mode

```javascript
yarn // install
yarn db:dev:restart // start postgres in docker and push migrations
yarn start:dev // start api in dev mode
```

# DATABASE

npx prisma migrate dev
npx prisma generate

# DOCKER

docker compose up dev-db id
npx prisma studio
