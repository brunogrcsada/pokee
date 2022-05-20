pub type PokeResult<T> = std::result::Result<T, PokeError>;

use actix_web::{error::ResponseError, http::StatusCode, HttpResponse};
use serde::{Deserialize, Serialize};

use crate::query::Response;

#[derive(Deserialize, Serialize, Debug, PartialEq)]
pub struct FinalResponse {
    pub name: String,
    pub description: String,
    pub is_legendary: bool,
    pub image: String,
}

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

#[derive(Deserialize, Serialize, PartialEq, Debug)]
pub struct StatusBuilder {
    pub error: Error,
}

#[derive(Deserialize, Serialize, PartialEq, Debug)]
pub struct Error {
    pub code: String,
    pub message: String,
}

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

        // HttpResponse::Ok().json(StatusBuilder {
        //     error: Error { code, message },
        // })

        // Prevent unecessary console error:

        HttpResponse::build(self.status_code()).json(StatusBuilder {
            error: Error { code, message },
        })
    }
}

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
