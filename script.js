const provider = new ethers.JsonRpcProvider('https://eth-sepolia.g.alchemy.com/v2/I9wCbmDyn7uUm01fC8e8I194wBBOnRP7');

// 🔹 Function to Get Wallet Address
async function getAccount() {
    if (window.ethereum) {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_accounts' });
            if (accounts.length > 0) {
                return accounts[0]; // Use first MetaMask account
            }
        } catch (err) {
            console.error('Error getting accounts:', err);
        }
    }

    // Ask user to enter their wallet address if MetaMask is not available or not connected
    let manualAddress = prompt("Enter your wallet address:");
    return manualAddress && ethers.isAddress(manualAddress) ? manualAddress : null;
}

// 🔹 Function to Fetch ERC-20 Token Balances
async function fetchTokens() {
    const userAddress = await getAccount();
    if (!userAddress) {
        alert("Invalid wallet address. Please try again.");
        return;
    }

    const apiKey = "I9wCbmDyn7uUm01fC8e8I194wBBOnRP7";
    const url = `https://eth-sepolia.g.alchemy.com/v2/${apiKey}`;

    const payload = {
        jsonrpc: "2.0",
        method: "alchemy_getTokenBalances",
        params: [userAddress, ["*"]], // Fetch all ERC-20 tokens
        id: 1
    };

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        const data = await response.json();
        document.getElementById("tokenList").innerHTML = "";

        if (data.result && data.result.tokenBalances.length > 0) {
            for (let token of data.result.tokenBalances) {
                let balance = BigInt(token.tokenBalance); // Convert balance to BigInt
                let listItem = document.createElement("li");
                listItem.innerText = `${token.contractAddress}: ${balance} tokens (raw value)`;
                document.getElementById("tokenList").appendChild(listItem);
            }
        } else {
            document.getElementById("tokenList").innerText = "No tokens found.";
        }
    } catch (error) {
        console.error("Error fetching tokens:", error);
    }
}

// 🔹 Add event listener to button
document.addEventListener("DOMContentLoaded", () => {
    const fetchButton = document.getElementById('fetchTokens');
    if (fetchButton) {
        fetchButton.addEventListener('click', fetchTokens);
    }
});
