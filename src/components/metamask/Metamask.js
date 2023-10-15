import { useEffect, useState } from "react";
import { useSDK } from "@metamask/sdk-react";
import { convertToHexadecimal, networksList } from "../../utils/ethersFn";
import style from "./Metamask.module.css";

export const Metamask = ({ account, setAccount }) => {
  const [networks, setNetworks] = useState([]);
  const { sdk, provider, chainId } = useSDK();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    connectMetamask();
    setNetworks(
      networksList.filter(
        (net) => convertToHexadecimal(net.chainId) !== chainId
      )
    );
  }, [chainId]);

  const connectMetamask = async () => {
    try {
      const accounts = await sdk?.connect();
      setAccount(accounts?.[0]);
    } catch (err) {
      console.log(`failed to connect..`, err);
    }
  };

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

  const toggleActive = () => {
    setIsActive(!isActive);
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
        <div className={style.networkContainer}>
          <p className={style.label} onClick={toggleActive}>
            Change Network
          </p>
          {networks?.map((net) => (
            <div
              className={
                isActive ? `${style.networkList}.active` : style.networkList
              }
              key={net.chainId}
              onClick={() => changeNetwork(net.chainId)}
            >
              <div className={style.network}>
                <img
                  className={style.networkIcon}
                  height={24}
                  width={24}
                  src={net.logoURI}
                  alt={net.name}
                />
                <p className={style.text}>{net.name}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
