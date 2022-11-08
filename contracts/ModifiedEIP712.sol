// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/cryptography/draft-EIP712.sol";

contract modifiedEIP712 is EIP712{

    constructor() EIP712("modifiedEIP712", "1.0") {}

    event checked(address signer, address sender);
    event called(bytes signature);

    function compareSignerAndSender(address mailTo, string memory mailContents, bytes memory signature) public returns (bool){

        bytes32 digest = _hashTypedDataV4(keccak256(abi.encode(
        keccak256("Mail(address to,string contents)"),
        mailTo,
        keccak256(bytes(mailContents))
       )));

        emit called(signature);
        address signer = ECDSA.recover(digest, signature);
        emit checked(signer, msg.sender);

        return signer == msg.sender ? true : false;
    }
}
