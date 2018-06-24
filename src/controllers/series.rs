use bson;
use rocket_contrib::{Json, JsonValue};

use models;

type ID = String;

#[post("/series", format = "application/json", data = "<series>")]
pub fn create(series: Json<models::api::series::Series>) -> JsonValue {
    let model = models::series::Series {
        title: series.title.to_owned(),
        episodes: series.episodes,
    };

    let document = model.create().unwrap();
    let result = bson::from_bson::<models::api::series::PostResponse>(bson::Bson::Document(document.unwrap()));

    match result {
        Ok(series) => json!({
        "code": 201,
        "success": true,
        "data": series,
        "error": ""
      }),
        Err(_e) => json!({
        "code": 412,
        "success": false,
        "data": {},
        "error": "An error has occured"
      }),
    }
}

#[get("/series/<id>", format = "application/json")]
pub fn get(id: ID) -> JsonValue {
    let document = models::series::find_one(id.to_owned()).unwrap();
    let result = bson::from_bson::<models::api::series::GetResponse>(bson::Bson::Document(document.unwrap()));

    match result {
        Ok(series) => json!({
        "code": 200,
        "success": true,
        "data": series,
        "error": ""
      }),
        Err(_e) => json!({
        "code": 400,
        "success": false,
        "data": {},
        "error": "An error has occured"
      }),
    }
}
