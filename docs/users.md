# `/v1/users`
:lock: - Requires authorization

## GET `/users`

Returns all registered users

### Parameters

### Sample request
`GET /v1/users`

### Sample response
```
{
	"data": [
		{
			"_id": "5b3e92397b770c495c2e42b5",
			"username": "xdk78",
			"createdAt": "2018-07-05T21:48:41.795Z"
		},
		{
			"_id": "5b3e9fc9d19347575c991c7a",
			"username": "feelfreelinux",
			"createdAt": "2018-07-05T22:46:33.082Z",
			"watchListId": "5b3e9fc9d19347575c991c79"
		}
	],
	"error": ""
}
```

## GET `/users/:id`

Returns user by id

### Parameters
`id` user id

### Sample request
`GET /v1/users/5b3ea5a2dfbf005dfda1e553`

### Sample response
```
{
	"data": {
		"_id": "5b3ea5a2dfbf005dfda1e553",
		"username": "dupa2",
		"createdAt": "2018-07-05T23:11:30.756Z",
		"watchListId": "5b3ea5a2dfbf005dfda1e552"
	},
	"error": ""
}
```

## POST `/users/register`

Registers a new user

### Parameters
`email` user's email
`password` user's password
`username` user's username

### Sample request
`POST /v1/users/register`
```
{
	"email": "jkm@example.com",
	"password": "dd476",
	"username": "krul"
}
```

### Sample response
```
{
	"data": {
		"message": "Register success"
	},
	"error": ""
}
```

## POST `/users/login`

Logins a user

### Parameters
`password` user's password
`username` user's username

### Sample request
`GET /v1/users/login`
```
{
	"password": "dd476",
	"username": "krul"
}
```

### Sample response
```
{
	"data": {
		"message": "Login success",
		"_id": "5b3eaa26d52cec623ef5631b"
	},
	"error": ""
}
```

## GET `/users/:id/watchlist`

Retrieves user's watchlist

### Parameters
`id` user's id

### Sample request
`GET /v1/users/watchlist`

### Sample response
```
{
	"data": {
		"watching": [],
		"completed": [],
		"onHold": [],
		"dropped": [],
		"planToWatch": [],
		"_id": "5b3eaa26d52cec623ef5631a",
		"__v": 0
	},
	"error": ""
}
```

## POST `/users/:id/watchlist`

Adds item to user's watchlist

### Parameters
`id` user's id
`seriesId` series id

### Sample request
`POST /v1/users/watchlist`
```
{
	"seriesId": "5b3e92ce7b770c495c2e42b6"
}
```

### Sample response
```
{
	"data": "5b3eaa26d52cec623ef5631a",
	"error": ""
}
```

## DELETE `/users/:id/watchlist`

Removes item to user's watchlist

### Parameters
`id` user's id
`seriesId` series id

### Sample request
`DELETE /v1/users/watchlist`
```
{
	"seriesId": "5b3e92ce7b770c495c2e42b6"
}
```

### Sample response
```
{
	"data": "5b3eaa26d52cec623ef5631a",
	"error": ""
}
```