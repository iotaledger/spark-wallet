<img src="https://raw.githubusercontent.com/iotaledger/spark-wallet/master/assets/spark-wallet.jpg" alt="Spark wallet" width="380" height="264"/>

# Spark wallet

<p>
  <a href="https://github.com/iotaledger/spark-wallet/actions?query=workflow%3ATests"><img src="https://github.com/iotaledger/spark-wallet/workflows/Tests/badge.svg" alt="Build status"></a>
</p>

Spark is a low-security wallet intended for short-term use and to send small amounts of [IOTA](https://www.iota.org) tokens.

## 🔥 Development Setup

To run Spark wallet on your computer, follow these steps:

#### 1. Install Node.JS

First you need to install [Node.JS](https://nodejs.org) if you haven’t done that already.

#### 2. Install Yarn

Install [Yarn](https://yarnpkg.com/) Node.js dependency manager:

```
curl -o- -L https://yarnpkg.com/install.sh | bash
```

#### 3. Download Spark wallet

Download Spark wallet as a [ZIP file](https://github.com/iotaledger/spark-wallet/archive/master.zip) or clone it by running:

```
git clone https://github.com/iotaledger/spark-wallet.git
```

#### 4. Install dependencies

Spark wallet requires some additional dependencies for building the application. To install them, run:

```
yarn
```

## 🔥 Run Spark web application

To launch Spark web wallet locally on your computer, run:

```
yarn dev
```

and open `http://localhost:3000` in your favourite browser.

## 🔥 Build desktop appliciation

To build Spark wallet as a desktop application, follow these steps:

#### 1. Install Rust

First you need to install [Rust](https://www.rust-lang.org/) if you haven’t done that already:

```
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```
on Windows you can use the [rustup installer](https://rustup.rs).

#### 2. Install Tauri

Install the [tauri-bundler](https://crates.io/crates/tauri-bundler) Cargo subcommand:

```
cargo install tauri-bundler --force
```

#### 2.1. Linux only - Install WebKit

Install required WebKit for GTK+ package:

```
sudo apt-get install libwebkit2gtk-4.0-dev
```

#### 3. Build the application

To start the build process run:

```
yarn build:desktop
```

#### 4. Launch the application

The built desktop application is located at `src-tauri/target/release/bundle/`
