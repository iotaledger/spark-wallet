extern crate keyring;
extern crate system_uri;
extern crate unwrap;
extern crate tauri;

#[macro_use]
extern crate serde_derive;

use unwrap::unwrap;
use system_uri::{install, App, SystemUriError};
use std::env;

mod cmd;

fn install_schema() -> Result<(), SystemUriError> {
    let exec = String::from(unwrap!(unwrap!(std::env::current_exe()).to_str()));
    let app = App::new(
        "org.iota.spark".to_string(),
        "IOTA Foundation".to_string(),
        "Spark wallet".to_string(),
        exec,
        None,
    );
    let schema = "iota".to_string();

    install(&app, &[schema.clone()]).and_then(|()| {
      Ok(())
    })
}

fn main() {
  if let Err(ref e) = install_schema() {
    println!("error: {}", e);
  }

  tauri::AppBuilder::new()
    .invoke_handler(|_webview, arg| {
      use cmd::Cmd::*;
      match serde_json::from_str(arg) {
        Err(_) => {}
        Ok(command) => {
          match command {
            SetSecret { callback, secret } => {
              let service = "spark_wallet";
              let username = "wallet";

              let keyring = keyring::Keyring::new(&service, &username);
              keyring.set_password(&secret);

              let _response = _webview.eval(&format!("window[\"{}\"]({:?})", callback, "OK"));
            },
            GetSecret { callback } => {
              let service = "spark_wallet";
              let username = "wallet";

              let keyring = keyring::Keyring::new(&service, &username);
              
              match keyring.get_password() {
                Ok(secret) => _webview.eval(&format!("window[\"{}\"]({:?})", callback, secret)),
                Err(_s) => _webview.eval(&format!("window[\"{}\"]({:?})", callback, "")),
              };
            }
          }
        }
      }
    })
    .build()
    .run();
}
