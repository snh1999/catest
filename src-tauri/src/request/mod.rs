use serde_json::Value;
use tauri::api::http::{HttpRequestBuilder, ResponseType, ClientBuilder};

#[tauri::command]
pub async fn send_request(link: &str) -> Result<Value, String> {
   let client = ClientBuilder::new()
     .max_redirections(3)
     .build()
     .unwrap();
   let request = HttpRequestBuilder::new("GET", link).unwrap()
     .response_type(ResponseType::Text);
   if let Ok(response) = client.send(request).await {
      if let Ok(data) = response.read().await{
        return Ok(data.data);     
      };
   }
   
   Err("Something went wrong".to_string())
 }