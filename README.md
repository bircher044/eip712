Here there is a ERC20 Token with EIP712 Cryptography stadard. 
You can make a signature with 3 values (address from, address to, uint256 amount) and send it to the contract
If your signature is valid, the contract will send 'amount' of ERC20 token to address 'to' from the wallet, which signed a signature

this project has a script for making signatures and can call the deployed contract

to run the script use this
npx hardhat run scripts/Signature.Maker.ts --network goerli
