// require("@nomicfoundation/hardhat-toolbox");

// /** @type import('hardhat/config').HardhatUserConfig */
// module.exports = {
//   solidity: "0.8.18",
//   defaultNetwork: "goerli",
//   networks:{
//     goerli:{
//       url: 'NODE-URL',
//       accounts:[privateKey]
//     }
//   }
// };
require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */

const privateKey = "<Your-account-private-key>"
module.exports = {
  solidity: "0.8.18",
  defaultNetwork: "goerli",
  networks:{
    goerli:{
      url: '<Goerli-node-endpoint>',
      accounts:[privateKey]
    }
  }
};