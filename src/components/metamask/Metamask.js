import { useCallback, useEffect, useState } from "react";
import { useSDK } from "@metamask/sdk-react";
import { convertToHexadecimal, networksList } from "utils/ethersFn";
import style from "./Metamask.module.css";

export const Metamask = ({ account, setAccount }) => {
  const [networks, setNetworks] = useState([]);
  const { sdk, provider, chainId } = useSDK();

  const connectMetamask = useCallback(async () => {
    try {
      const accounts = await sdk?.connect();
      setAccount(accounts?.[0]);
    } catch (err) {
      console.log(`failed to connect..`, err);
    }
  }, [sdk, setAccount]);

  useEffect(() => {
  
  console.log("eth", window.ethereum);


    connectMetamask();
    if (chainId) {
      const currentNet = networksList.find(
        (net) => convertToHexadecimal(net.chainId) === chainId
      );
      const arr = [
        currentNet,
        ...networksList.filter(
          (net) => convertToHexadecimal(net.chainId) !== chainId
        ),
      ];
      setNetworks(arr);
    }
  }, [chainId, connectMetamask]);

  const changeNetwork = async (chainId) => {
    try {
      await provider?.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: convertToHexadecimal(chainId) }],
      });
    } catch (error) {
      console.log("error from changeNetwork", error);
    }
  };

  return (
    <div className={style.container}>
      <button
        className={style.metamaskBtn}
        type="button"
        onClick={connectMetamask}
      >
        {account ? account : "connect Metamask"}
      </button>
      {account && (
        <>
          <div className={style.selectContainer}>
            <p className={style.text}>Choose Network</p>
            <select
              className={style.selectNetwork}
              aria-label="selectNetwork"
              name="networks"
              onChange={(e) => changeNetwork(Number(e.target.value))}
              defaultValue=""
            >
              {networks?.map((net) => (
                <option
                  className={style.text}
                  key={net.chainId}
                  value={net.chainId}
                >
                  {net.name}
                </option>
              ))}
            </select>
          </div>
        </>
      )}
    </div>
  );
};
