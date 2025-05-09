# CelestX 

CelestX  is an LLM-based AI Agent built on the Stellar chain, designed to revolutionize Web3 transactions by replacing complex wallet addresses with familiar Twitter usernames. It offers all the basic functionalities of a modern crypto wallet - such as sending funds, checking balances, and more - while leveraging the secure and efficient Stellar blockchain.

## Features

- **Stellar Chain Integration**  
  Fully harness the native power of the Stellar chain for secure, fast, and decentralized transactions.

- **AI-Powered Web3 Transactions**  
  Use an LLM-based AI Agent (powered by Groq) to send and receive crypto transactions, bypassing traditional wallet addresses by leveraging Twitter usernames.

- **Multiple Interfaces**
  - **Browser Extension**: Send transactions directly from Twitter.
  - **Website**: Log in with Twitter to map your wallet to your Twitter account and manage transactions.

## Tech Stack

- **AI & LLM**: Groq
- **Blockchain**: Stellar Chain
- **Web3 Integration**: Wallet mapping and transaction handling
- **Frontend**: Browser extension & web application

## Installation

### Browser Extension

1. **Clone the repository:**

```
 git clone git@github.com:0xmkar/CelestX.git
 cd CelestX 
```

2. **Load the extension in your browser:**

   - Open your browser and navigate to `chrome://extensions/` (for Chrome) or the equivalent for your browser.
   - Enable **Developer Mode**.
   - Click **Load Unpacked** and select the `extension` folder.

### Website

1. **Navigate to the website directory:**

   ```
   cd website
   ```

2. **Install dependencies:**

   ```
   npm install
   ```

3. **Run the development server:**

   ```
   npm run dev
   ```

## Usage

- **For the Browser Extension:**  
  Install the extension and connect your wallet. Use the Twitter-integrated interface to send and receive funds effortlessly.

- **For the Website:**  
  Log in using your Twitter account to map your wallet, manage transactions.

## License

This project is licensed under the MIT License.
