import style from "./Button.module.css";

export const Button = ({ name, onClick }) => {
  return (
    <button className={style.button} onClick={onClick}>
      {name}
    </button>
  );
};
