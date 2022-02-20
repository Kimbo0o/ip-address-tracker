import styles from "./SearchForm.module.scss";
import Image from "next/image";

const SearchForm: React.FC = () => {
  const onIPBtnClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
  };

  return (
    <form className={styles["address-wrap"]}>
      <input
        type="text"
        className={styles["input-text-address"]}
        placeholder="Search for any IP address or domain"
      ></input>
      <button
        type="submit"
        className={styles["btn-address"]}
        onClick={onIPBtnClick}
      >
        <Image src="/icon-arrow.svg" width={11} height={14}></Image>
      </button>
    </form>
  );
};

export default SearchForm;
