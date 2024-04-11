import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from 'dotenv';

dotenv.config();

export default {
  solidity: "0.8.17",
  networks: {
    hardhat: {
      chainId: 1337
    },
    goerli: {
      url: `https://goerli.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
      accounts: [process.env.PRIVATE_KEY],
      chainId: 5
    },
    localhost: {
      chainId: 1337
    },
    mainnet: {
      url: `https://eth.meowrpc.com`,
      accounts: [process.env.PRIVATE_KEY],
      chainId: 1
    }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY
  }
};