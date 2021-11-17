# RiceCake

This project contains the main features of the ricecake application.

**RiceCake Contracts**

* Token (Testnet): 0x77023221830C2A02Eae7742F15CE491e3f30037d

# Docs

* [WhitePaper](https://ricecake-swap.gitbook.io/wiki/)
* [BSC Scan (Testnet)](https://testnet.bscscan.com/address/0x77023221830C2A02Eae7742F15CE491e3f30037d)

# How to use

Clone the repository

```shell
git clone git@github.com:RiceCakeSwap/RiceCake.git
```

Run yarn at the root of the workspace

```shell
cd ricecake
yarn
```

Testing contracts

```shell
npx hardhat node
npx hardhat test
```

Deploying to a testnet network

```shell
cp .env.example
npx hardhat run scripts/deploy.js --network testnet
```

# Contact Us

* Email: ricecake.swap@gmail.com
