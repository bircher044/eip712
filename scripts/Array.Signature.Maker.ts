import {ethers} from "hardhat";
import {StakingWithEIP712__factory} from "../typechain-types";
import * as dotenv from 'dotenv';

const contractAddress = '0xC696A11C1Aaf0B073c30B5b90fe831d856965c92';
const transactionAmount = ethers.utils.parseUnits("1", 20);

const main = async () => {

    const owner = new ethers.Wallet((String(process.env.PRIVATE_KEY)), ethers.provider);
    const alice = new ethers.Wallet((String(process.env.ALICE_PRIVATE_KEY)), ethers.provider);
    const mark = new ethers.Wallet((String(process.env.MARK_PRIVATE_KEY)), ethers.provider);
    const danil = new ethers.Wallet((String(process.env.DANIL_PRIVATE_KEY)), ethers.provider);

    const domain = {
        name: 'Staking',
        version: '1.0',
        chainId: 5,
        verifyingContract: contractAddress
    };

    const types = {
        vote: [],
    };

    const value = {
    };

    const contract = StakingWithEIP712__factory.connect(contractAddress, owner);

    let ownerSignature = await owner._signTypedData(domain, types, value);
    let markSignature = await mark._signTypedData(domain, types, value);
    let aliceSignature = await alice._signTypedData(domain, types, value);
    let danilSignature = await danil._signTypedData(domain, types, value);

    let signatures = [ownerSignature, markSignature, aliceSignature];

    //let answer = await contract.setRequiredVotersNumber(3);
    //let answer = await contract.addVoter(await alice.getAddress());
    let answer = await (await contract.verificate(signatures, 3)).wait();
    console.log(answer);

};

main();