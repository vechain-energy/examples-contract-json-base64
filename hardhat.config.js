require("@nomiclabs/hardhat-waffle");
require('@vechain.energy/hardhat-thor')
require("hardhat-jest-plugin")
require('hardhat-contract-sizer');

module.exports = {
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 2 ** 32 - 1
      }
    }
  },
  networks: {
    vechain: {
      url: 'https://testnet.veblocks.net',
      privateKey: "0x3d66b0b90797f666f627b30b67c9599f4bfc54ffdba6037512c8a28ddb4b2b61",
      delegateUrl: 'https://sponsor-testnet.vechain.energy/by/90',
      gasPrice: 25000000,
      gas: 25000000
    }
  }
};