import {ethers} from "hardhat";
import {ModifiedEIP712__factory} from "../typechain-types";
import * as dotenv from 'dotenv';

const contractAddress = '0xAD81Ca517481B5d793a8f4e1fd184bBEfA9BED91';

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
        Mail: [
          { name: "mailTo", type: "address" },
          { name: "mailContents", type: "string" },
        ],
    };

    const value = {
        mailTo: await signer.getAddress(),
        mailContents: "Hello!",
    };

    const contract = ModifiedEIP712__factory.connect(contractAddress, signer);

    let signature = await signer._signTypedData(domain, types, value);
    console.log(signature);
    let answer = await (await contract.compareSignerAndSender(value.mailTo, value.mailContents, signature)).wait();
    console.log(answer);

};

main();