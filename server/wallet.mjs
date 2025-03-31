import StellarWallet from "./StellarWallet.mjs";

const stellarWallet = new StellarWallet("https://horizon-testnet.stellar.org");

export async function importWalletAndSendXLM(secretKey, recipientAddress, amount) {
  try {
    const walletInfo = await stellarWallet.createWallet(secretKey);
    const balance = await stellarWallet.getBalance(walletInfo.publicKey);

    if (parseFloat(balance) < parseFloat(amount)) {
      throw new Error("Insufficient balance to send XLM");
    }

    const txHash = await sendXLM(recipientAddress, amount);
    return { status: 'success', details: { secretKey, recipientAddress, amount, txHash } };
  } catch (error) {
    console.error("Error:", error.message);
    return { status: 'failure', details: { secretKey, recipientAddress, amount, error: error.message } };
  }
}

export async function sendXLM(recipientAddress, amount) {
  try {
    console.log(`Sending ${amount} XLM to ${recipientAddress}...`);

    // Send the transaction
    const receipt = await stellarWallet.sendTransaction(recipientAddress, amount, {
      memo: "Payment transfer"
    });

    console.log("📄 Transaction sent successfully! 📄 ");
    console.log(`Transaction hash: ${receipt.id}`);

    return receipt.id;
  } catch (error) {
    console.error("Error sending XLM:", error.message);
    throw error; // Re-throw to be caught by the calling function
  }
}

export async function getBalanceWallet(secretKey) {
  try {
    const walletInfo = await stellarWallet.createWallet(secretKey);
    const balance = await stellarWallet.getBalance(walletInfo.publicKey);

    return { status: 'success', details: { address: walletInfo.publicKey, balance } };
  } catch (error) {
    console.error("Error:", error.message);
    return { status: 'failure', details: { error: error.message } };
  }
}

// Additional utility function to create a new wallet
export async function createNewWallet() {
  try {
    const walletInfo = await stellarWallet.createWallet();
    console.log("New wallet created successfully!");
    console.log(`Public Key: ${walletInfo.publicKey}`);
    console.log(`Secret Key: ${walletInfo.secretKey}`);
    
    // Fund the wallet on testnet
    console.log("Funding wallet on testnet...");
    const fundingResult = await stellarWallet.fundWallet();
    
    return { 
      status: 'success', 
      details: { 
        publicKey: walletInfo.publicKey, 
        secretKey: walletInfo.secretKey,
        funded: true 
      } 
    };
  } catch (error) {
    console.error("Error creating wallet:", error.message);
    return { status: 'failure', details: { error: error.message } };
  }
}