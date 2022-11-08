// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

import "@openzeppelin/contracts/utils/cryptography/draft-EIP712.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract modifiedEIP712 is EIP712, ERC20{

    constructor() EIP712("modifiedEIP712", "1.0") ERC20("Token", "TOK") {
        _mint(msg.sender, type(uint256).max);
    }

    event checked(address signer, address sender);
    event called(bytes signature);

    function getChainId() external view returns (uint256) {
        return block.chainid;
    }

    function pay(address from, address to, uint256 amount) internal {
        _transfer(from, to, amount);
    }

    function verification(bytes memory signature, address from, address to, uint256 amount ) public {

        bytes32 digest = _hashTypedDataV4(keccak256(abi.encode(
        keccak256("pay(address from,address to,uint256 amount)"),
        from,
        to,
        amount
       )));
        address signerFromSignature = ECDSA.recover(digest, signature);
        pay(signerFromSignature, to, amount);
    }
}
