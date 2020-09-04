pragma solidity ^0.5.8;

// Imports
import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20Mintable.sol";

// Main token smart contract
contract PWRCToken is ERC20Mintable {
  string public constant name = "PowerChain";
  string public constant symbol = "PWRC";
  uint8 public constant decimals = 18;
}