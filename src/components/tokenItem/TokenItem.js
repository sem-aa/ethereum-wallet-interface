import style from "./TokenItem.module.css";

export const TokenItem = ({ tokenObj }) => {
  return (
    <div className={style.container}>
      <img width={32} height={32} src={tokenObj.logoURI} alt={tokenObj.name} />
      <p>{tokenObj.name}</p>
      <p>balance - {tokenObj.balance}</p>
    </div>
  );
};
