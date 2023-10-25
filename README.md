```javascript
yarn // install
yarn db:dev:restart // start postgres in docker and push migrations
yarn start:dev // start api in dev mode
```

# API

## RUN

npm install
npm run start:dev

# DATABASE

npx prisma migrate dev
npx prisma generate

# DOCKER

docker compose up dev-db id
npx prisma studio

npx dotenv -e .env.test -- prisma studio

# CLIENT

## RUN

npm run dev

## BUILD FOR ANDROID

npm run static
npx cap copy
npx cap sync
npx cap open android
