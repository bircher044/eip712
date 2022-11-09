// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

import "@openzeppelin/contracts/utils/cryptography/draft-EIP712.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract StakingWithEIP712 is EIP712, Ownable{
    mapping(address => bool) hasVotingRigth;
    uint8 public votersToApprove;
    address[] voters;

    constructor() EIP712("Staking", "1.0") {
        hasVotingRigth[msg.sender] = true;
        voters.push(msg.sender);
        votersToApprove = 1;
    }

    function addVoter(address voter) public onlyOwner{
        require(hasVotingRigth[voter] == false, "Already has a voting right");
        hasVotingRigth[voter] = true;
        voters.push(voter);
    }

    function setRequiredVotersNumber(uint8 newVotersNumberToApprove) public onlyOwner{
        require(newVotersNumberToApprove <= voters.length, "Cannot be more than current total voters number");
        votersToApprove = newVotersNumberToApprove;
    }

    function _unstake() internal {
        uint256 part = address(this).balance / voters.length;

        for(uint i=0; i<voters.length; i++){
            payable(voters[i]).transfer(part);
        }
    }
    
    function verificate(bytes[] memory signature, uint8 signaturesAmount) public{
        require(signaturesAmount >= votersToApprove, "Need more signatures");
        require(address(this).balance > 0, "Nothing to unstake");

        address[127] memory signers;
        for(uint i=0; i<signaturesAmount; i++){

            bytes32 digest = _hashTypedDataV4(keccak256(abi.encode(
            keccak256("vote()")
            )));

            address signer = ECDSA.recover(digest, signature[i]);
            require(hasVotingRigth[signer], "User(s) has`t voting right");
            for(uint j=0; j<i; j++){
                require(signers[j] != signer, "Duplicated signers");
            }
            signers[i] = signer;
        }
        _unstake();
    }
    
    receive() external payable {}

}