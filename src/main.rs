#![feature(plugin, custom_attribute, decl_macro, attr_literals)]
#![plugin(rocket_codegen)]

#[macro_use(bson, doc)]
extern crate bson;

extern crate crypto;
extern crate mongodb;
extern crate rand;
extern crate regex;
extern crate rocket;
extern crate rustc_serialize;
extern crate serde;
extern crate serde_json;
extern crate time;
extern crate uuid;

#[macro_use]
extern crate rocket_contrib;
#[macro_use]
extern crate serde_derive;

mod controllers;
mod lib;
mod models;

fn main() {
    rocket::ignite()
        .mount(
            "/",
            routes![
                controllers::index::lookup,
                controllers::status::lookup,
                controllers::series::create,
                controllers::series::get,
            ],
        )
        .catch(catchers![controllers::not_found::lookup])
        .launch();
}
