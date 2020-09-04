pragma solidity ^0.5.8;

// Imports
import "../node_modules/openzeppelin-solidity/contracts/crowdsale/emission/MintedCrowdsale.sol";
import "../node_modules/openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20Mintable.sol";

contract NETCrowdsale is MintedCrowdsale, Ownable {
  constructor(
    ERC20Mintable _token,
    uint256 _rate,
    address payable _wallet
  )
    public
    Crowdsale(_rate, _wallet, _token)
  {
    
  }
}