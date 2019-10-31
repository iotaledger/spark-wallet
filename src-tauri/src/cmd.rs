#[derive(Deserialize)]
#[serde(tag = "cmd", rename_all = "camelCase")]
pub enum Cmd {
  SetSecret { callback: String, secret: String },
  GetSecret { callback: String }
}
