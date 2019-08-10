/*
 * NB: since truffle-hdwallet-provider 0.0.5 you must wrap HDWallet providers in a 
 * function when declaring them. Failure to do so will cause commands to hang. ex:
 * ```
 * mainnet: {
 *     provider: function() { 
 *       return new HDWalletProvider(mnemonic, 'https://mainnet.infura.io/<infura-key>') 
 *     },
 *     network_id: '1',
 *     gas: 4500000,
 *     gasPrice: 10000000000,
 *   },
 */

var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = "outdoor father modify clever trophy abandon vital feel portion grit evolve twist"; // 12 word mnemonic

module.exports = {

  networks: {
     development: {
     host: "localhost",
     port: 8545,
     network_id: "*", // Match any network id
     from: "0x0bd5EebDC3E53973dDF236D43906C776a5fE3784"
   },
 
aws: {
            provider: () =>
                    new HDWalletProvider(mnemonic, "http://publicelb-test-1077256889.us-east-1.elb.amazonaws.com:8545"),
                          network_id: "*",
                              }
}
};
