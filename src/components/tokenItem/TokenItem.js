import style from "./TokenItem.module.css";

export const TokenItem = ({ tokenObj, addToken }) => {
  return (
    <div className={style.container}>
      <img width={32} height={32} src={tokenObj.logoURI} alt={tokenObj.name} />
      <p>{tokenObj.name}</p>
      {tokenObj.balance ? (
        <p>balance - {tokenObj.balance}</p>
      ) : (
        <button onClick={() => addToken(tokenObj)}>add to my list</button>
      )}
    </div>
  );
};
