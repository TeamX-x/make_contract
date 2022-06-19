#!/bin/bash
set -e

#RUSTFLAGS='-C link-arg=-s' cargo build --target wasm32-unknown-unknown --release
RUSTFLAGS='-C link-arg=-s' /root/.cargo/bin/cargo build --target wasm32-unknown-unknown --release
mkdir -p out
cp target/wasm32-unknown-unknown/release/*.wasm out/loan-v2.wasm