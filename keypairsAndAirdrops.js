// Import Solana web3 functinalities
const {
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL
} = require("@solana/web3.js");

//import user input functionality
const prompt = require('prompt-sync')();

// Connect to the Devnet
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

// Get user input for the public key
const publicKeyString = prompt('Enter your public key: ');

// Convert the user input to a PublicKey object
const publicKey = new PublicKey(publicKeyString);

// Get the wallet balance from a given private key
const getWalletBalance = async () => {
    try {
        // Get balance of the user provided wallet address
        const walletBalance = await connection.getBalance(new PublicKey(publicKey));
        console.log(`Wallet balance: ${parseInt(walletBalance) / LAMPORTS_PER_SOL} SOL`);
    } catch (err) {
        console.log(err);
    }
};

const airDropSol = async () => {
    try {
        // Request airdrop of 2 SOL to the wallet
        console.log("Airdropping some SOL to the wallet!");
        const fromAirDropSignature = await connection.requestAirdrop(
            publicKey,
            2 * LAMPORTS_PER_SOL
        );
        await connection.confirmTransaction(fromAirDropSignature, 'confirmed');
    } catch (err) {
        console.log(err);
    }
};

// Show the wallet balance before and after airdropping SOL
const mainFunction = async () => {
    await getWalletBalance();
    await airDropSol();
    await getWalletBalance();
}

mainFunction();