use crate::response::{PokeError, PokeResult};
use serde::Deserialize;

// Type definitions for data queried from PokeAPI
#[derive(Deserialize, Debug, PartialEq)]
pub struct Response {
    pub description: String,
    pub legendary: bool,
    pub image: String,
}

#[derive(Deserialize, Debug)]
struct Entry {
    flavor_text: String,
    language: Language,
}

#[derive(Deserialize, Debug)]
struct Language {
    name: String,
}

#[derive(Deserialize)]
struct Descriptions {
    flavor_text_entries: Vec<Entry>,
    is_legendary: bool,
    id: i16,
}

/* Custom 'description' function implementation for Descriptions struct:
Filters through PokeAPI descriptions and returns the first english
description. The result is cleaned due to hard coded new line values
on PokeAPI! */

impl Descriptions {
    fn description(&self) -> PokeResult<Response> {
        let description = &self
            .flavor_text_entries
            .iter()
            .find(|line| line.language.name == "en")
            .ok_or(PokeError::NoDescription)?;

        let formatted: Vec<String> = description
            .flavor_text
            .lines()
            .map(|line| line.trim().replace("\u{c}", " "))
            .collect();

        Ok(Response {
            description: formatted.join(" "),
            legendary: self.is_legendary,
            image: format!("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/{}.svg", self.id)
        })
    }
}

// Get data from PokeAPI, and catch/resolve errors
pub async fn query(url: &str) -> PokeResult<Response> {
    let result = reqwest::get(url).await.map_err(|_| PokeError::APIError)?;

    match result.status().as_u16() {
        429 => Err(PokeError::RequestLimit),
        404 => Err(PokeError::NotFound),
        200 => {
            let pokemon: Descriptions = result.json().await.map_err(|_| PokeError::APIError)?;
            pokemon.description()
        }
        _ => Err(PokeError::APIError),
    }
}
