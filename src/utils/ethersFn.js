import { ethers } from "ethers";
import { erc20ABI } from "@metamask/sdk-react-ui";
import listTokensEth from "../listTokensEth.json";

const arrSymbolTokens = ["ETH", "USDT", "USDC", "CRV"];

const provider = new ethers.providers.Web3Provider(window.ethereum);
provider.send("eth_requestAccounts", []);

const findEthBalance = async () => {
  try {
    const signer = provider.getSigner();
    const balance = await signer.getBalance();
    return ethers.utils.formatEther(balance, 18);
  } catch (error) {
    console.log("error from findEthBalance", error);
  }
};

const createContractAndReturnBalance = async (address, account) => {
  try {
    const contract = new ethers.Contract(address, erc20ABI, provider);
    const balance = await contract.balanceOf(account);
    return ethers.utils.formatEther(balance, 18);
  } catch (error) {
    console.log("error from createContracrAndReturnBalance", error);
  }
};

export const addBalanceToArrTokens = async (account) => {
  const arrTokensBalance = [];
  for await (const name of arrSymbolTokens) {
    const tokenObj = listTokensEth.find(({ symbol }) => symbol === name);

    tokenObj.balance =
      tokenObj.symbol !== "ETH"
        ? await createContractAndReturnBalance(tokenObj.address, account)
        : await findEthBalance();

    arrTokensBalance.push(tokenObj);
  }
  return arrTokensBalance;
};
