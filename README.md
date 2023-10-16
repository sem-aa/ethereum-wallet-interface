# Ethereum Wallet Interface

## Description

The Ethereum Wallet Interface is a React application that displays the balances of various tokens such as ETH, USDT, USDC, and CRV. It also allows users to search for and add any token to their token list. Additionally, the wallet provides the capability to switch between different Ethereum networks, including ETH, Arbitrum, and Polygon.

## Requirements

To run this project locally, you need to have the following dependencies installed:

- Node.js
- npm (or yarn)
- Metamask browser extension

## Installation

To run the project locally, follow these steps:

1. Install all project dependencies by running the following command:

   ```bash
   npm install
   ```

2. Start the project by running the following command:

   ```bash
   npm start
   ```

   Or open the live page link: https://sem-aa.github.io/ethereum-wallet-interface/

## Usage

1. Open the application in a browser where the Metamask browser extension is installed. The application will automatically detect Metamask and prompt you to enter your password to grant access to your account.

2. After connecting your Metamask account by clicking the "Connect to Metamask" button, the application will display the total network balance and the balances of tokens like ETH, USDT, USDC, and CRV.

3. In the search bar, you can find any token by name or symbol. If the desired token is not in your list, the application will suggest finding it in the network's list of all tokens, calculate its balance, and add it to your list of displayed tokens.

4. The application also provides the option to switch between Ethereum networks (ETH, Arbitrum, Polygon). When choosing your desired network from the dropdown list, the Metamask extension will open, prompting you to switch networks. After the switch, the application will reload, and the balances on the selected network will be recalculated.

## Authors

- sem-aa
