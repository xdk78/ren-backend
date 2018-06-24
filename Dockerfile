FROM rustlang/rust:nightly

RUN cargo install cargo-watch

WORKDIR /usr/src/app

EXPOSE 8080

VOLUME ["/usr/local/cargo"]