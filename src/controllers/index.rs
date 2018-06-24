use rocket_contrib::JsonValue;

#[get("/")]
fn lookup() -> JsonValue {
    json!({
    "code": 200,
    "success": true,
    "data": {
        "message": "Hello!"
    },
    "error": ""
  })
}
