import * as StellarSdk from '@stellar/stellar-sdk';

class StellarWallet {
    constructor(horizonUrl = "https://horizon-testnet.stellar.org") {
        if (!horizonUrl) {
            throw new Error('Stellar Network Horizon URL is required');
        }
        // Connect to Stellar Testnet
        this.server = new StellarSdk.Horizon.Server(horizonUrl);
        this.wallet = null;
        
        // Stellar testnet specific configurations
        this.NETWORK_PASSPHRASE = StellarSdk.Networks.TESTNET;
        this.BASE_FEE = StellarSdk.BASE_FEE;
    }

    /**
     * Create a new wallet or import existing one from secret key
     * @param {string} secretKey - Optional secret key to import existing wallet
     * @returns {Object} Wallet address and public key
     */
    async createWallet(secretKey = null) {
        try {
            if (secretKey) {   
                this.wallet = StellarSdk.Keypair.fromSecret(secretKey);
            } else {
                this.wallet = StellarSdk.Keypair.random();
            }

            return {
                address: this.wallet.publicKey(),
                publicKey: this.wallet.publicKey(),
                secretKey: this.wallet.secret()
            };
        } catch (error) {
            throw new Error(`Failed to create Stellar wallet: ${error.message}`);
        }
    }

    /**
     * Fund a new wallet using Friendbot (testnet only)
     * @returns {Object} Funding transaction response
     */
    async fundWallet() {
        try {
            if (!this.wallet) {
                throw new Error('Wallet not initialized');
            }

            const response = await fetch(
                `https://friendbot.stellar.org?addr=${encodeURIComponent(this.wallet.publicKey())}`
            );
            const responseJson = await response.json();
            return responseJson;
        } catch (error) {
            throw new Error(`Failed to fund wallet: ${error.message}`);
        }
    }

    /**
     * Get balance of native token (Lumens)
     * @param {string} address - Wallet address to check balance
     * @returns {string} Balance in Lumens
     */
    async getBalance(address) {
        try {
            if (!address) {
                throw new Error('Address is required');
            }

            const account = await this.server.loadAccount(address);
            const balance = account.balances.find(b => b.asset_type === 'native');
            
            return balance ? balance.balance : '0';
        } catch (error) {
            if (error instanceof StellarSdk.NotFoundError) {
                return '0'; // Account not found/activated on the network
            }
            throw new Error(`Failed to get Lumens balance: ${error.message}`);
        }
    }

    /**
     * Send Lumens on Stellar network
     * @param {string} toAddress - Recipient address
     * @param {string} amount - Amount in Lumens
     * @param {Object} options - Transaction options
     * @returns {Object} Transaction receipt
     */
    async sendTransaction(toAddress, amount, options = {}) {
        try {
            if (!this.wallet) {
                throw new Error('Wallet not initialized');
            }

            if (!toAddress || !amount) {
                throw new Error('Recipient address and amount are required');
            }

            // Check if destination account exists
            try {
                await this.server.loadAccount(toAddress);
            } catch (error) {
                if (error instanceof StellarSdk.NotFoundError) {
                    throw new Error('The destination account does not exist!');
                }
                throw error;
            }

            // Load the source account
            const sourceAccount = await this.server.loadAccount(this.wallet.publicKey());
            
            // Prepare transaction
            const transaction = new StellarSdk.TransactionBuilder(sourceAccount, {
                fee: options.fee || this.BASE_FEE,
                networkPassphrase: this.NETWORK_PASSPHRASE,
            })
                .addOperation(
                    StellarSdk.Operation.payment({
                        destination: toAddress,
                        asset: StellarSdk.Asset.native(),
                        amount: amount.toString(),
                    }),
                )
                .addMemo(options.memo ? StellarSdk.Memo.text(options.memo) : StellarSdk.Memo.none())
                .setTimeout(options.timeout || 180)
                .build();
            
            // Sign and submit transaction
            transaction.sign(this.wallet);
            const result = await this.server.submitTransaction(transaction);
            
            return result;
        } catch (error) {
            throw new Error(`Failed to send Lumens: ${error.message}`);
        }
    }

    /**
     * Validate if address is valid Stellar address
     * @param {string} address - Address to validate
     * @returns {boolean} Whether address is valid
     */
    isValidStellarAddress(address) {
        try {
            StellarSdk.Keypair.fromPublicKey(address);
            return true;
        } catch (error) {
            return false;
        }
    }

    /**
     * Get transaction status on Stellar network
     * @param {string} txHash - Transaction hash
     * @returns {Object} Transaction details
     */
    async getTransactionStatus(txHash) {
        try {
            return await this.server.transactions().transaction(txHash).call();
        } catch (error) {
            throw new Error(`Failed to get transaction status on Stellar network: ${error.message}`);
        }
    }
}

export default StellarWallet;