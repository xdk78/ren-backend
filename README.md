# senren-backend

## Install
### Install Rust with rustup and setup nightly version https://www.rust-lang.org
```bash
rustup default nightly
# then
rustup update && cargo update
```
### Install MongoDb version [3.2.20](https://www.mongodb.com/download-center?jmp=nav#previous)
## Run
```bash
# db for example C:\Program Files\MongoDB\Server\3.2\bin
mongod
# then run backend in root repo directory
cargo run
```
## Build
```bash
# development
cargo build
# production
cargo build --release
```
Enjoy!
