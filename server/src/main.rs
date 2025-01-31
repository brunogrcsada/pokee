#![forbid(unsafe_code)]

mod query;
mod response;

#[cfg(test)]
mod tests;

use actix_cors::Cors;
use actix_web::{get, http, web, App, HttpResponse, HttpServer};

// {query} is replaced by the Pokemon name the user requests
#[get("/pokemon/{query}")]
async fn index(poke: web::Path<String>) -> HttpResponse {
    // Store dynamic path (name of Pokemon), as a string
    let query = &poke.to_string();

    // API endpoint URL. Format replaces braces with the second parameter.
    let formatted = format!("https://pokeapi.co/api/v2/pokemon-species/{}", poke);
    let data = query::query(&formatted).await;

    // Send back response to client
    response::send(query, data).await
}

// Start web server with CORS configuration, on HOST 0.0.0.0 and PORT 2020
#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    let url = "0.0.0.0:2020";
    println!("Actix Web started on {}", url);

    HttpServer::new(move || {
        let cors = Cors::default()
            // Specify which addresses the server can be accessed from
            .allowed_origin("http://localhost:3001")
            .allowed_origin("http://localhost:2020")
            .allowed_origin("http://localhost:4221")
            .allowed_origin("https://pokee-production.up.railway.app")
            .allowed_methods(vec!["GET"])
            .allowed_headers(vec![http::header::CONTENT_TYPE, http::header::ACCEPT]);
        App::new().wrap(cors).service(index)
    })
    .bind(url)?
    .run()
    .await
}
