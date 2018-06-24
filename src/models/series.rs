use bson;
use bson::oid::ObjectId;
use mongodb::db::ThreadedDatabase;
use mongodb::ThreadedClient;
use std;
use std::io;

use lib;

#[derive(Debug)]
pub struct Series {
    pub title: String,
    pub episodes: i32,
}

impl Series {
    pub fn to_bson(&self) -> bson::ordered::OrderedDocument {
        doc! {
          "title": self.title.to_owned(),
          "episodes": self.episodes,
        }
    }

    pub fn create(&self) -> Result<std::option::Option<bson::ordered::OrderedDocument>, io::Error> {
        let client = lib::db::establish_connection();
        let collection = client.db("senren_dev").collection("series");
        collection
            .insert_one(self.to_bson().clone(), None)
            .ok()
            .expect("Failed to insert document.");

        let response_document = collection
            .find_one(Some(self.to_bson().clone()), None)
            .ok()
            .expect("Failed to execute find.");

        Ok(response_document)
    }
}

pub fn find_one(series_id: String) -> Result<std::option::Option<bson::ordered::OrderedDocument>, io::Error> {
    let client = lib::db::establish_connection();
    let collection = client.db("senren_dev").collection("series");

    let id = ObjectId::with_string(&series_id).unwrap();

    let response_document = collection
        .find_one(Some(doc! { "_id" => id }), None)
        .ok()
        .expect("Failed to execute find.");

    Ok(response_document)
}
