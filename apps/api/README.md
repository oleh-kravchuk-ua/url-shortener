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

Some help with bebug od Docker containers

```sh
docker network inspect url-shortener-network

docker inspect --format='{{json .State.Health}}' url-shortener-web | jq
docker-compose exec nginx ping url-shortener-api
docker-compose exec nginx nslookup url-shortener-api

docker logs url-shortener-web

docker exec -it url-shortener-nginx sh
curl -fk https://localhost

```

## Jump into DB

```sh
docker exec -it url-shortener-db mongosh url-shortener
```

## Example of URL records in Mongo DB

  ```mongosh
  use url-shortener

  # db.urls.find();

  db.urls.findOne({ "_id": ObjectId('67afd53c3794c93e622458b6') });
  {
    _id: ObjectId('67afd53c3794c93e622458b6'),
    createdAt: ISODate('2025-02-14T23:43:56.593Z'),
    deleted: false,
    originalUrl: 'https://www.linkedin.com/in/kolegm',
    shortUrl: 'http://localhost:3000/875d5490',
    domain: 'http://localhost:3000',
    slug: '875d5490',
    slugSize: 4,
    visits: 6,
    updatedAt: ISODate('2025-02-15T00:02:26.175Z')
  }
  ```
