pragma solidity ^0.4.11;

contract Registry {
  
  bytes32[] public PinList;
  
  mapping (bytes32 => uint8) public updatesReceived;
  mapping (bytes32 => string) public owner;
  
  function Registry(bytes32[] PinNames) {
    PinList = PinNames;
  }

  function totalUpdatesFor(bytes32 Pin) returns (uint8) {
    if (validPin(Pin) == false) throw;
    return updatesReceived[Pin];
  }

  // This function increments the update count for the specified Pin.
  function updateForPin(bytes32 Pin) {
    if (validPin(Pin) == false) throw;
    updatesReceived[Pin] += 1;
  }

  function updateOwner(bytes32 Pin, string ownerData) {
    if (validPin(Pin) == false) throw;
    owner[Pin] = ownerData;
  }

  function getOwnerData(bytes32 Pin) returns (string) {
    if (validPin(Pin) == false) throw;
    return owner[Pin];
  }

  function validPin(bytes32 Pin) returns (bool) {
    for(uint i = 0; i < PinList.length; i++) {
      if (PinList[i] == Pin) {
        return true;
      }
    }
    return false;
  }
  
}