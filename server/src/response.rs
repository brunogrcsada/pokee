pub type PokeResult<T> = std::result::Result<T, PokeError>;

use actix_web::{error::ResponseError, http::StatusCode, HttpResponse};
use serde::{Deserialize, Serialize};

use crate::query::Response;

// Type definition for the JSON object that is returned to the client
#[derive(Deserialize, Serialize, Debug, PartialEq)]
pub struct FinalResponse {
    pub name: String,        // Pokemon's name
    pub description: String, // Pokemon's description
    pub is_legendary: bool,  // Legendary status for the Pokemon
    pub image: String,       // Image URL from PokeAPI
}

// Error messages for different scenarios
#[derive(thiserror::Error, Debug, PartialEq)]
pub enum PokeError {
    #[error("PokéAPI Internal Server Error!")]
    APIError,
    #[error("Oops! Pokemon wasn't found...")]
    NotFound,
    #[error("Seems like you really enjoy this API... Too many requests!")]
    RequestLimit,
    #[error("English Pokemon description was not found!")]
    NoDescription,
}

// Matching status codes with the PokeError descriptors
impl PokeError {
    pub fn descriptor(&self) -> String {
        match self {
            PokeError::NotFound => "NOT_FOUND".to_string(),
            PokeError::APIError => "POKEAPI_ERROR".to_string(),
            PokeError::NoDescription => "NO_DESCRIPTION".to_string(),
            PokeError::RequestLimit => "MAX_REQUESTS".to_string(),
        }
    }
}

// Server error message (a json object with an error key)
#[derive(Deserialize, Serialize, PartialEq, Debug)]
pub struct StatusBuilder {
    pub error: Error,
}

// Full definition for sending the error to the client
#[derive(Deserialize, Serialize, PartialEq, Debug)]
pub struct Error {
    pub code: String,
    pub message: String,
}

/* Custom ResponseError implementation for PokeError ->
This brings the custom messages and status codes together,
with constant HTTP status codes */

impl ResponseError for PokeError {
    fn status_code(&self) -> StatusCode {
        match *self {
            PokeError::NotFound => StatusCode::NOT_FOUND,
            PokeError::NoDescription => StatusCode::NOT_FOUND,
            PokeError::RequestLimit => StatusCode::TOO_MANY_REQUESTS,
            PokeError::APIError => StatusCode::INTERNAL_SERVER_ERROR,
        }
    }

    fn error_response(&self) -> HttpResponse {
        let message = self.to_string();
        let code = self.descriptor().to_string();

        HttpResponse::build(self.status_code()).json(StatusBuilder {
            error: Error { code, message },
        })
    }
}

// Send data back to the client
pub async fn send(name: &str, data: PokeResult<Response>) -> HttpResponse {
    match data {
        Ok(data) => HttpResponse::Ok().json(FinalResponse {
            name: name.to_string(),
            description: data.description,
            is_legendary: data.legendary,
            image: data.image,
        }),

        Err(error) => error.error_response(),
    }
}
