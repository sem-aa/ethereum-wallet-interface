import { ethers } from "ethers";
import erc20ABI from "blockchaine/erc20ABI.json";
import etherList from "blockchaine/listTokens/ether.json";
import polygonList from "blockchaine/listTokens/polygon.json";
import arbitumList from "blockchaine/listTokens/arbitum.json";

const arrSymbolTokens = ["ETH", "USDT", "USDC", "CRV"];
export const networksList = [
  {
    symbol: "ETH",
    name: "Ethereum",
    chainId: 1,
    logoURI:
      "https://tokens.1inch.io/0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee.png",
  },
  {
    symbol: "MATIC",
    name: "Polygon",
    chainId: 137,
    logoURI:
      "https://tokens.1inch.io/0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0.png",
  },

  {
    symbol: "ARB",
    name: "Arbitrum",
    chainId: 42161,
    logoURI:
      "https://tokens.1inch.io/0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee.png",
  },
];

let provider;
let chainId;

if (typeof window.ethereum !== "undefined") {
  provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  provider.send("eth_requestAccounts", []);
  provider.on("network", (newNetwork, oldNetwork) => {
    if (oldNetwork) {
      window.location.reload();
    }

    chainId = newNetwork.chainId;
  });
} else {
  window.alert("Install Metamask");
}

const findCurrentNetBalance = async () => {
  try {
    const signer = provider.getSigner();
    const balance = await signer.getBalance();

    return Number(ethers.utils.formatEther(balance, 18)).toFixed(2);
  } catch (error) {
    console.log("error from findEthBalance", error);
  }
};

export const createContractAndReturnBalance = async (address, account) => {
  try {
    const contract = new ethers.Contract(address, erc20ABI, provider);
    const balance = await contract.balanceOf(account);
    return Number(ethers.utils.formatEther(balance, 18)).toFixed(2);
  } catch (error) {
    console.log("error from createContracrAndReturnBalance", error);
  }
};

export const findCurrentListTokens = () => {
  if (chainId) {
    switch (chainId) {
      case etherList[0].chainId:
        return etherList;
      case polygonList[0].chainId:
        return polygonList;
      case arbitumList[0].chainId:
        return arbitumList;
      default:
        throw new Error(`Список токенов для chainId ${chainId} не найден.`);
    }
  }
};

export const convertToHexadecimal = (number) => "0x" + number.toString(16);

export const addBalanceToArrTokens = async (account) => {
  const arrTokensBalance = [];
  const currentListTokens = findCurrentListTokens();
  const currentToken = currentListTokens.find(
    (token) => token.address === "0x0000000000000000000000000000000000000000"
  );
  try {
    for await (const name of new Set([
      currentToken.symbol,
      ...arrSymbolTokens,
    ])) {
      let tokenObj;

      tokenObj = currentListTokens.find(({ symbol }) => symbol === name);

      if (tokenObj) {
        tokenObj.balance =
          tokenObj?.symbol !== currentToken.symbol
            ? await createContractAndReturnBalance(tokenObj.address, account)
            : await findCurrentNetBalance();

        arrTokensBalance.push(tokenObj);
      }
    }
  } catch (error) {
    console.log("error from addBalanceToArrTokens", error);
  }

  return arrTokensBalance;
};
