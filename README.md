<img src="https://raw.githubusercontent.com/iotaledger/spark-wallet/master/assets/spark-wallet.jpg" alt="Spark wallet" width="380" height="264"/>

# Spark wallet

<p>
  <a href="https://github.com/iotaledger/spark-wallet/actions?query=workflow%3ATests"><img src="https://github.com/iotaledger/spark-wallet/workflows/Tests/badge.svg" alt="Build status"></a>
  <a href="https://github.com/iotaledger/spark-wallet/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/iotaledger/spark-wallet.svg" alt="license">
  </a>
</p>

Spark is a low-security wallet intended for short-term use and to send small amounts of [IOTA](https://www.iota.org) tokens.

## Setup

To run Spark wallet on your computer, follow these steps:

#### 1. Install Node.JS

First you need to install [Node.JS](https://nodejs.org) if you haven’t done that already.

#### 2. Download Spark wallet

Download Spark wallet as a [ZIP file](https://github.com/iotaledger/spark-wallet/archive/master.zip) or clone it by running:

```
git clone https://github.com/iotaledger/spark-wallet.git
```

#### 2. Install dependencies

Spark wallet requires some additional dependencies for building the application. To install them, run:

```
yarn
```

#### 3. Run Spark wallet

To launch Spark wallet locally, run:

```
yarn dev
```

and open `http://localhost:3000` in your favourite browser.

---

## Build

To build Spark wallet as a desktop application, follow these steps:

#### 1. Install Rust

First you need to install [Rust](https://www.rust-lang.org/) if you haven’t done that already.

```
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

#### 2. Build

To start the build process run:

```
yarn build
```

The built desktop application will be located at `src-tauri/target/release/bundle/`
