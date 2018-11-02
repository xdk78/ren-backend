# `/v1/auth`

:lock: - Requires authorization

## POST `/auth/register`

Registers a new user

### Parameters

`email` user's email

`password` user's password

`username` user's username

### Sample request

`POST /v1/auth/register`

```json
{
  "email": "jkm@example.com",
  "password": "dd476",
  "username": "krul"
}
```

### Sample response

```json
{
  "data": {},
}
```

## POST `/auth/login`

Returns current logged in user

### Parameters

`username` user's name
`password` user's password

### Sample request

`POST /v1/auth/login`

```json
{
	"username": "xdk78",
	"password": "alufers12"
}
```

### Sample response

```json
{
  "data": {
    "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViNTkxMmU2OTdlZDU4MWQwNDllNTFmMSIsImlhdCI6MTUzMzIwOTA3NSwiZXhwIjozMDY2NDIxNzUwfQ.qyTlpLLh0iNq0GNiWovzGO5MU9CT0IJEKAhs0MJlISQ"
    }
}
```

## GET `/auth/logout`

Logs out current user

### Parameters

### Sample request

`GET /auth/logout`

### Sample response

```json
{
  "data": {}
}
```

### GET `/auth/verify`

### Headers

### Sample response

```json
{
  "data": {}
}
```
