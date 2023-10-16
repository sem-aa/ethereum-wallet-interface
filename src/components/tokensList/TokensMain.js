import { useEffect, useState } from "react";
import { addBalanceToArrTokens, findCurrentListTokens } from "utils/ethersFn";
import { createContractAndReturnBalance } from "utils/ethersFn";
import { Button } from "components/button/Button";

import style from "./TokenList.module.css";
import { Search } from "./SearchTokens";
import { TokensList } from "./TokenList";

export const TokensMain = ({ account }) => {
  const [listTokens, setListTokens] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredTokens, setFilteredTokens] = useState([]);
  const [filteredAllTokens, setFilteredAllTokens] = useState([]);

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

  const searchTokenBd = (query) => {
    const allTokens = findCurrentListTokens();
    const filtered = allTokens.filter(
      (token) =>
        token.symbol.toLowerCase().includes(query.toLowerCase()) ||
        token.name.toLowerCase().includes(query.toLowerCase())
    );
    if (!filtered.length) {
      window.alert("Not found token");
      setSearchText("");
      setFilteredTokens(listTokens);
    }
    setFilteredAllTokens(filtered);
  };

  const findBalanceToken = async (obj) => {
    obj.balance = await createContractAndReturnBalance(obj.address, account);
    setSearchText("");
    setFilteredAllTokens([]);
    setListTokens([...listTokens, obj]);
    setFilteredTokens([...listTokens, obj]);
  };

  return (
    <>
      <Search handleSearch={handleSearch} searchText={searchText} />
      {filteredTokens.length ? (
        <TokensList tokens={filteredTokens} />
      ) : (
        <>
          <p className={style.text}>
            Token not found, continue searching in the database?
          </p>
          <Button
            name={"Search in All Tokens"}
            onClick={() => searchTokenBd(searchText)}
          />
          {!!filteredAllTokens.length && (
            <TokensList
              tokens={filteredAllTokens}
              addToken={findBalanceToken}
            />
          )}
        </>
      )}
    </>
  );
};
