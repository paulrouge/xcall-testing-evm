# EVM xCall Testing
This is a test project to test the xCall functionality of the EVM. It is using Hardhat as a development environment.

important:
Due to limited time, the project is not yet finished. The XCallTestContract.sol contract is not handling the last condition of the `messageHandler` is not sending an successful xCall message, yet.

# How to use
Use the commands below to use Hardhat. To deploy contracts, check the `scripts/deploy.ts` file. And check below on how to use Hardhat to actually deploy the contracts.

To call contracts check the `scripts/call.ts` file. And check below on how to use Hardhat to actually call the contracts.

## Sample Hardhat Project

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.ts
```

Some example commands:

```shell
npx hardhat run --network ganache scripts/deploy.ts
npx hardhat run --network bsc_test scripts/deploy.ts
npx hardhat run --network localhost scripts/deploy.ts
npx hardhat run --network localhost scripts/call.ts
```