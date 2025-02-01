const { ethers } = require("ethers");

// Set up the provider with your Alchemy API URL
const provider = new ethers.JsonRpcProvider("https://eth-sepolia.g.alchemy.com/v2/I9wCbmDyn7uUm01fC8e8I194wBBOnRP7");

// Your wallet private key (NEVER expose your private key in public code)
const privateKey = "2114d5c8247b24f3f2416968879061edc1b07bc72bd2a80b5224032dcf7dd470"; 
const wallet = new ethers.Wallet(privateKey, provider);

// The transaction details
const tx = {
    to: "0x670298e73c5E6735E1fdBeD858Be1d6A26db00b1",
    value: ethers.parseUnits("0.01", "ether"), // Send 0.01 ETH instead of 1 ETH
    gasLimit: 21000, // Default gas limit
    gasPrice: ethers.parseUnits("5", "gwei"), // Adjusted gas price
};

async function sendTransaction() {
    try {
        // Send transaction
        const txResponse = await wallet.sendTransaction(tx);
        console.log("Transaction sent: ", txResponse);
        
        // Wait for transaction to be mined
        const receipt = await txResponse.wait();
        console.log("Transaction mined: ", receipt);
    } catch (error) {
        console.error("Error sending transaction:", error);
    }
}

sendTransaction();
