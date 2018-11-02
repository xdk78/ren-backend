# `/v1/series`
:lock: - Requires authorization

## GET `/series`

Returns all series

### Parameters

### Sample request
`GET /v1/series`

### Sample response
```json
{
	"data": [
		{
			"_id": "5b3e92ce7b770c495c2e42b6",
			"title": "Game of Thrones",
			"description": "7 kingdoms...",
			"seasons": [],
			"category": {
				"_id": "5b3e92ce7b770c495c2e42bd",
				"name": "tv"
			},
			"rating": 9.5,
			"genres": [
        {
					"_id": "5b3e92ce7b770c495c2e42be",
					"name": "fantasy"
				}
			],
			"__v": 0
		}
  ]
}
```

## GET `/series/:id`

Returns series by id

### Parameters

`id` series id

### Sample request
`GET /v1/series/5b3e92ce7b770c495c2e42b6`

### Sample response
```json
{
	"data": [
		{
			"_id": "5b3e92ce7b770c495c2e42b6",
			"title": "Game of Thrones",
			"description": "7 kingdoms...",
			"seasons": [],
			"category": {
				"_id": "5b3e92ce7b770c495c2e42bd",
				"name": "tv"
			},
			"rating": 9.5,
			"genres": [
        {
					"_id": "5b3e92ce7b770c495c2e42be",
					"name": "fantasy"
				}
			],
			"__v": 0
		}
  ]
}
```

## POST `/series`

Adds new series

### Parameters

`title` series title

`description` series description

`seasons` list of series seasons

`category` series category

`generes` list of series generes

`rating` series rating

### Sample request
`POST /v1/series`
```json
{
    "title": "Game of Thrones",
    "description": "7 kingdoms...",
    "seasons": [
        {
            "number": 1,
            "episodes": [
                {
                    "title": "Winter Is Coming",
                    "number": 1
                },
                {
                    "title": "The Kingsroad",
                    "number": 2
                }
            ]
        },
        {
            "number": 2,
            "episodes": [
                {
                    "title": "Winter Is Coming",
                    "number": 1
                },
                {
                    "title": "The Kingsroad",
                    "number": 2
                }
            ]
        }
    ],
    "category": {
        "name": "tv"
    },
    "rating": 9.5,
    "genres": [
        {
            "name": "action"
        },
        {
            "name": "adventure"
        },
        {
            "name": "fantasy"
        }
    ]
}
```

### Sample response
```json
{
  "data": {}
}
```
