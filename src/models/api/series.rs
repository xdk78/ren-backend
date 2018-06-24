use bson;

#[derive(Serialize, Deserialize,)]
pub struct Series {
    pub title: String,
    pub episodes: i32,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct GetResponse {
    pub _id: bson::oid::ObjectId,
    pub title: String,
    pub episodes: i32,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct PostResponse {
    pub _id: bson::oid::ObjectId,
    pub title: String,
    pub episodes: i32,
}
