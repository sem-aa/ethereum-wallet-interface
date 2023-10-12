import { useEffect, useState } from "react";
import { addBalanceToArrTokens } from "../../utils/ethersFn";
import { TokenItem } from "../tokenItem/TokenItem";

export const TokenList = ({ account }) => {
  const [listTokens, setListTokens] = useState([]);

  useEffect(() => {
    if (account) {
      addBalanceToArrTokens(account).then((data) => setListTokens(data));
    }
  }, [account]);

  return (
    <>
      {listTokens.length
        ? listTokens.map((tokenObj) => (
            <TokenItem key={tokenObj.symbol} tokenObj={tokenObj} />
          ))
        : null}
    </>
  );
};
