# HOWTO

## Debug commands

Install pnpm globally

```sh
npm i pnpm -G
```

Install pnpm local deps

```sh
pnpm i
```

```sh
docker network inspect url-shortener-network

docker inspect --format='{{json .State.Health}}' url-shortener-web | jq
docker-compose exec nginx ping url-shortener-api
docker-compose exec nginx nslookup url-shortener-api

docker logs url-shortener-web

docker exec -it url-shortener-nginx sh
curl -fk https://localhost:${WEB_PORT}
```

## Jump into DB

```sh
docker exec -it url-shortener-db mongosh url-shortener
```
