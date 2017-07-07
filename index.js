web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
abi = JSON.parse('[{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"owner","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"Pin","type":"bytes32"}],"name":"validPin","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"Pin","type":"bytes32"},{"name":"ownerData","type":"string"}],"name":"updateOwner","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"Pin","type":"bytes32"}],"name":"getOwnerData","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"updatesReceived","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"Pin","type":"bytes32"}],"name":"totalUpdatesFor","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"Pin","type":"bytes32"}],"name":"updateForPin","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"PinList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"inputs":[{"name":"PinNames","type":"bytes32[]"}],"payable":false,"type":"constructor"}]')
RegistryContract = web3.eth.contract(abi);
contractInstance = RegistryContract.at('0xe4fbd39ddb29a7c00a5461c152f6281f62f2dccd');
pins = {"14053270451001": "pin-1", "14053270451002": "pin-2", "14053270451003": "pin-3"}
owns = {"14053270451001": "own-1", "14053270451002": "own-2", "14053270451003": "own-3"}

function updateForPin(pin) {
  pinName = $("#pin").val();
  contractInstance.updateForPin(pinName, {from: web3.eth.accounts[0]}, function() {
    let div_id = pins[pinName];
    $("#" + div_id).html(contractInstance.totalUpdatesFor.call(pinName).toString());
  });
}

function updateForOwn(own) {
  pinInput = $("#pin").val();
  ownInput = $("#own").val();
	
  updateForPin(pinInput);
  contractInstance.updateOwner(pinInput, ownInput, {from: web3.eth.accounts[0]}, function() {
    let ownerElementId = owns[pinInput];
    $("#" + ownerElementId).html(contractInstance.getOwnerData.call(pinInput).toString());
  });
}

$(document).ready(function() {
  pinNames = Object.keys(pins);
  for (var i = 0; i < pinNames.length; i++) {
    let name = pinNames[i];
    let val = contractInstance.totalUpdatesFor.call(name).toString()
    $("#" + pins[name]).html(val);
    let own = contractInstance.getOwnerData.call(name).toString()
    $("#" + owns[name]).html(own);
  }
});
