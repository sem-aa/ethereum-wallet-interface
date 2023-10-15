import style from "./TokenItem.module.css";

export const TokenItem = ({ tokenObj, addToken }) => {
  return (
    <li className={style.container}>
      <img
        className={style.logo}
        width={32}
        height={32}
        src={tokenObj.logoURI}
        alt={tokenObj.name}
      />
      <p className={style.text}>{tokenObj.name}</p>
      {tokenObj.balance ? (
        <p className={style.text}>balance - {tokenObj.balance}</p>
      ) : (
        <button className={style.btnAdd} onClick={() => addToken(tokenObj)}>
          add to my list
        </button>
      )}
    </li>
  );
};
