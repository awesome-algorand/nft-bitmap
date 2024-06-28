# nft-bitmap[WIP]

[![Test Coverage](https://api.codeclimate.com/v1/badges/ba1cb52fe658adb3ea07/test_coverage)](https://codeclimate.com/github/awesome-algorand/nft-bitmap/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/ba1cb52fe658adb3ea07/maintainability)](https://codeclimate.com/github/awesome-algorand/nft-bitmap/maintainability)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](code_of_conduct.md)

![goldblum-quote.jpeg](docs%2Fpublic%2Fgoldblum-quote.jpeg)

Stores a bitmap in GlobalStorage.
The bitmap is stored as bytes/string (same thing).
The bitmap is indexed by a key, which is represented as uint64.
Since it uses GlobalStorage, it's limited to 64 keys/rows(same thing)

## What's Included

- [React Component/Hook Library](./packages/nft-bitmap-react/README.md)
- [Algokit SDK/Client and TealScript SmartContract](./packages/nft-bitmap-kit/README.md)
- [Demo Application](./packages/nft-bitmap-ui/README.md)

## Getting Started

### Start Algokit
```bash
algokit localnet start
```

### Install Dependencies
```bash
npm install
```

### Run UI
```bash 
npm run dev
```
