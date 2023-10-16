import { TokenItem } from "components/tokenItem/TokenItem";

export const TokensList = ({ tokens, addToken }) => {
  return (
    <ul>
      {tokens.map((tokenObj) => (
        <TokenItem
          key={tokenObj.symbol}
          tokenObj={tokenObj}
          addToken={addToken}
        />
      ))}
    </ul>
  );
};