import {ethers} from "hardhat";
import {ModifiedEIP712__factory} from "../typechain-types";
import * as dotenv from 'dotenv';

const contractAddress = '0xCB0D2Cf62467A6326908930DaD0d9B74fD38F0C0';
const transactionAmount = ethers.utils.parseUnits("1", 20);

const main = async () => {

    const signer = new ethers.Wallet((String(process.env.PRIVATE_KEY)), ethers.provider);
    const alice = new ethers.Wallet((String(process.env.ALICE_PRIVATE_KEY)), ethers.provider);

    const domain = {
        name: 'modifiedEIP712',
        version: '1.0',
        chainId: 5,
        verifyingContract: contractAddress
    };

    const types = {
        pay: [
            { name: 'from', type: 'address' },
            { name: 'to', type: 'address' },
            { name: 'amount', type: 'uint256'}
        ],
    };

    const value = {
        from: await signer.getAddress(),
        to: await alice.getAddress(),
        amount: transactionAmount
    };

    const contract = ModifiedEIP712__factory.connect(contractAddress, signer);
    let signature = await signer._signTypedData(domain, types, value);
    console.log(signature);
    let answer = await contract.verification(signature, await signer.getAddress(), await alice.getAddress(), transactionAmount);
    console.log(await signer.getAddress());
    console.log(answer);

};

main();