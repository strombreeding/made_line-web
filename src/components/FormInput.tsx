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
  isDateInput = false,
}: {
  type?: HTMLInputTypeAttribute;
  label: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  isDateInput?: boolean;
}) {
  const changeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  return (
    <div className={style.formGroup}>
      <input
        data-has-value={value !== "" && isDateInput}
        className={`${isDateInput ? style.dateInput : style.input}`}
        type={type}
        placeholder=" "
        required
        value={value}
        onChange={changeValue}
      />
      <label
        className={`${isDateInput ? style.dateLabel : style.label}`}
        htmlFor="email"
      >
        {label}
      </label>
    </div>
  );
}
