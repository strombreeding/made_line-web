import {
  ChangeEvent,
  Dispatch,
  HTMLInputTypeAttribute,
  SetStateAction,
} from "react";

import style from "../styles/FormInput.module.css";

export default function FormInput({
  type = "email",
  label,
  value,
  setValue,
}: {
  type?: HTMLInputTypeAttribute;
  label: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}) {
  const changeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  return (
    <div className={style.formGroup}>
      <input
        className={style.input}
        type={type}
        placeholder=" "
        required
        value={value}
        onChange={changeValue}
      />
      <label className={style.label} htmlFor="email">
        {label}
      </label>
    </div>
  );
}
