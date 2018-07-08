# `/v1/users`
:lock: - Requires authorization

## POST `/auth/login`

Returns current logged in user

### Parameters
`username` user's name
`password` user's password

### Sample request
`POST /v1/auth/login`
```
{
	"username": "xdk78",
	"password": "alufers12"
}
```

### Sample response
```json
{
	"data": {
		"message": "Login success",
		"_id": "5b3e92397b770c495c2e42b5"
	},
	"error": ""
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
	"data": {
		"message": "Logged out"
	},
	"error": ""
}
```