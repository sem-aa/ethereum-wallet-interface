import { useEffect, useState } from "react";
import { addBalanceToArrTokens } from "../../utils/ethersFn";
import { TokenItem } from "../tokenItem/TokenItem";

export const TokenList = ({ account }) => {
  const [listTokens, setListTokens] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredTokens, setFilteredTokens] = useState([]);

  useEffect(() => {
    if (account) {
      addBalanceToArrTokens(account).then((data) => {
        setListTokens(data);
        setFilteredTokens(data);
      });
    }
  }, [account]);

  const handleSearch = (query) => {
    setSearchText(query);
    const filtered = listTokens.filter(
      (token) =>
        token.symbol.toLowerCase().includes(query.toLowerCase()) ||
        token.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredTokens(filtered);
  };

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Search by symbol or name"
          value={searchText}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      {filteredTokens.length
        ? filteredTokens.map((tokenObj) => (
            <TokenItem key={tokenObj.symbol} tokenObj={tokenObj} />
          ))
        : null}
    </>
  );
};
