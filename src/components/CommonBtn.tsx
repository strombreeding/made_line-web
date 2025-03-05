import { CSSProperties } from "react";

export default function CommonBtn({
  style = {},
  innerText,
}: {
  style?: CSSProperties;
  innerText: string;
}) {
  return <button style={{ ...style }}>{innerText}</button>;
}
