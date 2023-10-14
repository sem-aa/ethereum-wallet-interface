import { useEffect, useState } from "react";
import { useSDK } from "@metamask/sdk-react";
import { convertToHexadecimal, networksList } from "../../utils/ethersFn";

export const Metamask = ({ account, setAccount }) => {
    const [networks, setNetworks] = useState([])
  const { sdk, provider, chainId } = useSDK();

  useEffect(() => {
      connect();
      setNetworks(networksList.filter((net) => convertToHexadecimal(net.chainId) !== chainId))
  }, [chainId]);

  const connect = async () => {
    try {
      const accounts = await sdk?.connect();
      setAccount(accounts?.[0]);
    } catch (err) {
      console.warn(`failed to connect..`, err);
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

  return (
    <>
      <button type="button" onClick={connect}>{account ? account : 'connect Metamask'}</button>
    
      <div>
        {networks?.map((net) => (
          <div key={net.chainId} onClick={() => changeNetwork(net.chainId)}>
            <img height={32} width={32} src={net.logoURI} alt={net.name} />
            <p>{net.name}</p>
          </div>
        ))}
      </div>
    </>
  );
};
