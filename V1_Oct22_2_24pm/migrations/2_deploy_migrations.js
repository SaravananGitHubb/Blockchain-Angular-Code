var Farmer = artifacts.require("./Farmer.sol");
var Processor = artifacts.require("./Processor.sol");

module.exports = function(deployer) {
  deployer.deploy(Farmer).then(function(){
        return deployer.deploy(Processor, Farmer.address)
});
};