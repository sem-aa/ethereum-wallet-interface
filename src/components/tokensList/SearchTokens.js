import style from "./TokenList.module.css";

export const Search = ({ handleSearch, searchText }) => {
  return (
    <label className={style.labelSearch}>
      <input
        className={style.inputSearch}
        type="text"
        placeholder="Search by symbol or name"
        value={searchText}
        onChange={(e) => handleSearch(e.target.value)}
      />
    </label>
  );
};
