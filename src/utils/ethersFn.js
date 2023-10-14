import { ethers } from "ethers";
import { erc20ABI } from "@metamask/sdk-react-ui";
import etherList from "../listTokens/ether.json";
import polygonList from "../listTokens/polygon.json";
import arbitumList from "../listTokens/arbitum.json";

const arrSymbolTokens = ["ETH", "USDT", "USDC", "CRV"];

const provider = new ethers.providers.Web3Provider(window.ethereum, "any");

let chainId;

provider.on("network", (newNetwork, oldNetwork) => {
  if (oldNetwork) {
    window.location.reload();
  }
  chainId = newNetwork.chainId;
});

provider.send("eth_requestAccounts", []);

const findCurrentNetBalance = async () => {
  try {
    const signer = provider.getSigner();
    const balance = await signer.getBalance();

    return ethers.utils.formatEther(balance, 18);
  } catch (error) {
    console.log("error from findEthBalance", error);
  }
};

export const createContractAndReturnBalance = async (address, account) => {
  try {
    const contract = new ethers.Contract(address, erc20ABI, provider);
    const balance = await contract.balanceOf(account);
    return ethers.utils.formatEther(balance, 18);
  } catch (error) {
    console.log("error from createContracrAndReturnBalance", error);
  }
};

export const findCurrentListTokens = () => {
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
};

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
