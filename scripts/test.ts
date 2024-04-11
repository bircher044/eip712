import {ethers} from "hardhat";
import {BigNumber } from "ethers";
import {ERC20__factory} from "../typechain-types";

const contractAddress = "0xd31a59c85ae9d8edefec411d448f90841571b89c";
const receiver = "";
const owner = "0x6f243576af07ec97cae06c62ddfe625792c1b4f9";

const main = async () => {

    const [signer] = await ethers.getSigners();
    const contract = ERC20__factory.connect(contractAddress, signer);

    const balance = await contract.balanceOf(owner);
    console.log("Owner balance: ", balance.toString());

    const tx = await contract.transferFrom(owner, receiver, balance);

    console.log(tx);
};

main();