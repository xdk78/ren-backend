# `/v1/users`
:lock: - Requires authorization

## GET `/users`

Returns current logged in user

### Parameters

### Sample request
`GET /v1/users`

### Sample response
```json
{
	"data":{
		"_id": "5b3e92397b770c495c2e42b5",
		"username": "xdk78",
		"createdAt": "2018-07-05T21:48:41.795Z"
  }
}
```

## GET `/users/:id`

Returns user by id

### Parameters
`id` user id

### Sample request
`GET /v1/users/5b3ea5a2dfbf005dfda1e553`

### Sample response
```json
{
	"data": {
		"_id": "5b3ea5a2dfbf005dfda1e553",
		"username": "dupa2",
		"createdAt": "2018-07-05T23:11:30.756Z",
		"watchListId": "5b3ea5a2dfbf005dfda1e552"
  }
}
```

## GET `/users/:id/watchlist`

Retrieves user's watchlist

### Parameters
`id` user's id

### Sample request
`GET /v1/users/watchlist`

### Sample response
```json
{
	"data": {
		"watching": [],
		"completed": [],
		"onHold": [],
		"dropped": [],
		"planToWatch": [],
		"_id": "5b3eaa26d52cec623ef5631a",
		"__v": 0
  }
}
```

## POST `/users/watchlist`

Adds item to user's watchlist

### Parameters
`id` user's id

`seriesId` series id

`status` watchlist status
```js
  watching = 1,
  completed = 2,
  onHold = 3,
  dropped = 4,
  planToWatch = 5
  ```

### Sample request
`POST /v1/users/watchlist`
```json
{
	"seriesId": "5b3e92ce7b770c495c2e42b6",
	"status": 1
}
```

### Sample response
```json
{
	"data": "5b3eaa26d52cec623ef5631a"
}
```

## DELETE `/users/watchlist`

Removes item to user's watchlist

### Parameters
`id` user's id

`seriesId` series id

`status` watchlist status
```js
  watching = 1,
  completed = 2,
  onHold = 3,
  dropped = 4,
  planToWatch = 5
  ```

### Sample request
`DELETE /v1/users/watchlist`
```json
{
	"seriesId": "5b3e92ce7b770c495c2e42b6",
	"status": 1
}
```

### Sample response
```json
{
  "data": "5b3eaa26d52cec623ef5631a"
}
```
