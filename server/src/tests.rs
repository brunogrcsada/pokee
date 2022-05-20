use std::path::{Path, PathBuf};

pub fn mock() -> PathBuf {
    std::env::current_dir().unwrap().join(Path::new("mocks"))
}

/* Some useful automation tests written as simple as possible.
Other similar tests could be written for the different error
codes, and even to test out different Pokemon, but I have
written the core tests which are the most relevant for the
task. */

#[cfg(test)]
mod tests {
    use super::*;
    use actix_web::http::StatusCode;

    use wiremock::{
        matchers::{method, path},
        Mock, MockServer, ResponseTemplate,
    };

    use crate::query::{query, Response};
    use crate::response::send;
    use crate::response::{Error, FinalResponse, PokeError, StatusBuilder};

    use actix_web::body::to_bytes;

    use serde_json::Value;
    use std::fs;

    // Directly test that querying an existing Pokemon name returns its description
    #[actix_rt::test]
    async fn description_should_return() {
        // Sample Data -----
        let name = "squirtle";
        let description = "After birth, its back swells and hardens into a shell. Powerfully sprays foam from its mouth.";
        let is_legendary = true;
        let image = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/10.svg";
        // -----------------
        let query = send(
            name,
            Ok(Response {
                description: description.to_string(),
                legendary: is_legendary,
                image: image.to_string(),
            }),
        )
        .await;

        let response = FinalResponse {
            name: name.to_string(),
            description: description.to_string(),
            is_legendary: is_legendary,
            image: image.to_string(),
        };

        // Check for equality
        assert_eq!(query.status(), StatusCode::OK);

        // Parse response to json and compare both values
        let body_data = to_bytes(query.into_body()).await.unwrap();
        let final_response: FinalResponse = serde_json::from_slice(&body_data).unwrap();
        assert_eq!(final_response, response);
    }

    /* Directly test that querying a random Pokemon name which
    does not exist returns 404 (Not Found) from PokeAPI */
    #[actix_rt::test]
    async fn should_return_404() {
        // Sample data - random doesn't exist.
        let name = "random";
        let description = Err(PokeError::NotFound);
        // -------------------

        let query = send(name, description).await;

        // Check for equality
        assert_eq!(query.status(), StatusCode::NOT_FOUND);

        let expected_json = StatusBuilder {
            error: Error {
                code: "NOT_FOUND".to_string(),
                message: "Oops! Pokemon wasn't found...".to_string(),
            },
        };

        // Parse response to json and compare both values
        let body_data = to_bytes(query.into_body()).await.unwrap();
        let final_response: StatusBuilder = serde_json::from_slice(&body_data).unwrap();

        // Check for equality
        assert_eq!(final_response, expected_json);
    }
    // --------------------Mocking:-----------------------

    #[tokio::test]
    async fn mock_description_should_return() {
        // Sample Data:
        let correct = "When agitated, this POKéMON pro\u{ad} tects itself by spraying poisonous sweat from its pores.";
        // Start Mock server and retrieve mock file with Evee's data
        let server = MockServer::start().await;

        let mock_data = fs::read_to_string(mock().join("mock.json")).unwrap();
        let body_val: Value = serde_json::from_str(&mock_data).unwrap();
        let response = ResponseTemplate::new(200).set_body_json(body_val);

        // Create local URL for request
        let request_url = format!("{}{}", &server.uri(), url_format("eevee"));

        // Run mock
        Mock::given(method("GET"))
            .and(path(&url_format("eevee")))
            .respond_with(response)
            .mount(&server)
            .await;

        let data = query(&request_url).await.unwrap();
        assert_eq!(correct.to_string(), data.description);
    }

    /* Test that querying a random Pokemon name which
    does not exist returns 404 (Not Found) from mock file */
    #[tokio::test]
    async fn should_return_mock_404() {
        let server = MockServer::start().await;
        let final_response = Err(PokeError::NotFound);

        let missing = url_format("squiggle");
        let body = ResponseTemplate::new(404);
        let request_url = format!("{}{}", &server.uri(), &missing);

        // Run mock
        Mock::given(method("GET"))
            .and(path(missing))
            .respond_with(body)
            .mount(&server)
            .await;

        let body = query(&request_url).await;
        assert_eq!(final_response, body);
    }

    fn url_format(name: &str) -> String {
        return format!("/api/v2/pokemon-species/{}", name);
    }
}
