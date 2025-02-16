# Examples with cURL calling of API endpoints, manually

## Just a general endpoint calling

```curl
curl http://localhost:3300 \
  -X GET \
  -H "Content-Type: application/json" \
  -w ", STATUS_CODE: %{http_code}\n" \
  -i
```

## Example with posting of a long URL and to generate a short link

```curl
curl https://localhost/api/urls/shorten \
  -X POST \
  -d '{"originalUrl": "https://example.com"}' \
  -H "Content-Type: application/json" \
  -w ", STATUS_CODE: %{http_code}\n" \
  -i \
  -k
```


```curl
curl https://localhost/api/urls/:43e93e9d0919 \
  -X GET \
  -H "Content-Type: application/json" \
  -w ", STATUS_CODE: %{http_code}\n" \
  -i \
  -k
```