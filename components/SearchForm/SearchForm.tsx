import styles from "./SearchForm.module.scss";
import Image from "next/image";
import React, { useState } from "react";

const SearchForm: React.FC<{ onSubmit: (string) => void }> = (props) => {
  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    props.onSubmit(text);
  };

  const onTextChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setText(event.target.value);
  };

  const [text, setText] = useState("");

  return (
    <form className={styles["address-wrap"]} onSubmit={onSubmitHandler}>
      <input
        type="text"
        className={styles["input-text-address"]}
        placeholder="Search for any IP address or domain"
        value={text}
        onChange={onTextChange}
      ></input>
      <button
        type="submit"
        aria-label="submit"
        className={styles["btn-address"]}
      >
        <Image
          src="/icon-arrow.svg"
          alt="icon-arrow"
          width={11}
          height={14}
        ></Image>
      </button>
    </form>
  );
};

export default SearchForm;
