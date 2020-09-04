pragma solidity ^0.5.8;

// Imports
import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20Mintable.sol";

// Main token smart contract
contract NETToken is ERC20Mintable {
  string public constant name = "Nordic Energy Token";
  string public constant symbol = "NET";
  uint8 public constant decimals = 18;
}