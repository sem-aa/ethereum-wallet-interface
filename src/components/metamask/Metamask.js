import { useCallback, useEffect, useState } from "react";
import { useSDK } from "@metamask/sdk-react";
import { convertToHexadecimal, networksList } from "utils/ethersFn";
import style from "./Metamask.module.css";
import { Button } from "components/button/Button";

export const Metamask = ({ account, setAccount }) => {
  const [networks, setNetworks] = useState([]);
  const { sdk, provider, chainId } = useSDK();

  // Metamask connection function
  const connectMetamask = useCallback(async () => {
    try {
      const accounts = await sdk?.connect();
      setAccount(accounts?.[0]);
    } catch (err) {
      console.log(`failed to connect..`, err);
    }
  }, [sdk, setAccount]);

  useEffect(() => {
    connectMetamask();
    if (chainId) {
      // determines the current network and creates an array of possible networks
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
    } else {
      setNetworks(networksList);
    }
  }, [chainId, connectMetamask]);

  // network switching function
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
      <Button
        name={account ? account : "connect Metamask"}
        onClick={connectMetamask}
      />
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
