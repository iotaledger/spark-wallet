extern crate iota_lib_rs;
extern crate rand;

use iota_lib_rs::iota_api;
use iota_lib_rs::iota_api::options::GetNewAddressOptions;
use iota_lib_rs::iota_constants;

use rand::{thread_rng, Rng};

mod cmd;

extern crate tauri;

#[macro_use]
extern crate serde_derive;

fn main() {
  tauri::AppBuilder::new()
    .invoke_handler(|_webview, arg| {
      use cmd::Cmd::*;
      match serde_json::from_str(arg) {
        Err(_) => {}
        Ok(command) => {
          match command {
            GenerateAddress { callback, seed, index } => {

              let api = iota_api::API::new("https://node01.iotatoken.nl");

              let options = GetNewAddressOptions {
                  security: Some(2),
                  index: Some(index),
                  total: Some(1),
              };
              
              let address = api.get_new_address(&seed, false, true, options).unwrap();

              let _response = _webview.eval(&format!("window[\"{}\"]({:?})", callback, address));
            },
            GenerateSeed { callback } => {
              
              let mut rng = thread_rng();
              let mut seed = String::new();
              
              for _i in 0..iota_constants::SEED_LENGTH_MAX {
                let x = rng.gen_range(0, iota_constants::TRYTE_ALPHABET.len());
                seed.push(iota_constants::TRYTE_ALPHABET[x]);
              }

              let _response = _webview.eval(&format!("window[\"{}\"]({:?})", callback, seed));
            }
          }
        }
      }
    })
    .build()
    .run();
}
