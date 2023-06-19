import '@openzeppelin/hardhat-upgrades';
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";


const SEPOLIA_PRIVATE_KEY = "";

const config: HardhatUserConfig = {
  solidity: "0.8.18",
  networks: {
    hardhat: {
      mining: {
        auto: false,
        interval: 5000
      },
      allowUnlimitedContractSize: true,
    },
    ganache: {
      url: "http://localhost:8545", // Ganache container's URL
      chainId: 1337, // Ganache chain ID
    },
    sepolia: {
      url: "https://rpc-sepolia.rockx.com", 
      chainId: 11155111, 
      accounts: [SEPOLIA_PRIVATE_KEY],
    },
    bsc_test: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545",
      chainId: 97,
      accounts: [SEPOLIA_PRIVATE_KEY],
    },
    localhost : {
      url: "http://127.0.0.1:8545/",
      chainId: 31337,
      accounts: ["0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"],
    },
  }
};

export default config;
