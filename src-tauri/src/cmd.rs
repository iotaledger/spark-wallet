#[derive(Deserialize)]
#[serde(tag = "cmd", rename_all = "camelCase")]
pub enum Cmd {
  GenerateAddress { callback: String, seed: String, index: usize},
  GenerateSeed { callback: String },
}
