pragma solidity ^0.8.4;
// SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract Gravy is ERC20, AccessControl {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    address _minter;
    uint256 public _initialSupply;

    constructor() ERC20("Gravy", "GRAVY") {
        _initialSupply = 10000 * 10**18;

        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);

        _mint(msg.sender, _initialSupply);
    }

    function mint(address _to, uint256 _amount) public onlyRole(MINTER_ROLE) {
        uint256 amount = _amount * 10**18;
        _mint(_to, amount);
    }

    function setAllowance(address _spender, uint256 _addedValue) public {
        uint256 addedValue = _addedValue * 10**18;
        increaseAllowance(_spender, addedValue);
    }

    function setMinter(address _newMinter) public onlyRole(DEFAULT_ADMIN_ROLE) {
        _revokeRole(MINTER_ROLE, _minter);
        _grantRole(MINTER_ROLE, _newMinter);
    }
}
