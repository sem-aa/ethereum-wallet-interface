import { useEffect, useState } from "react";
import {
  addBalanceToArrTokens,
  findCurrentListTokens,
} from "../../utils/ethersFn";
import { TokenItem } from "../tokenItem/TokenItem";
import { createContractAndReturnBalance } from "../../utils/ethersFn";
import style from "./TokenList.module.css";

export const TokenList = ({ account }) => {
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
      <label className={style.labelSearch}>
        <input
          className={style.inputSearch}
          type="text"
          placeholder="Search by symbol or name"
          value={searchText}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </label>
      {filteredTokens.length ? (
        filteredTokens.map((tokenObj) => (
          <TokenItem key={tokenObj.symbol} tokenObj={tokenObj} />
        ))
      ) : (
        <>
          <p className={style.text}>
            Token not found, continue searching in the database?
          </p>
          <button
            className={style.btnSearch}
            onClick={() => searchTokenBd(searchText)}
          >
            Search in All Tokens
          </button>
          <ul>
            {filteredAllTokens.length
              ? filteredAllTokens.map((tokenObj) => (
                  <TokenItem
                    key={tokenObj.symbol}
                    tokenObj={tokenObj}
                    addToken={findBalanceToken}
                  />
                ))
              : null}
          </ul>
        </>
      )}
    </>
  );
};
