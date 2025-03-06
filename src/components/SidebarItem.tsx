import Image from "next/image";
import style from "../styles/SidebarItem.module.css";
import { Dispatch, SetStateAction } from "react";
import { SidebarItemType } from "../types";
import { useRouter } from "next/navigation";
export default function SidebarItem({
  checked,
  setChecked,
  text,
  imgName,
}: {
  checked: SidebarItemType;
  setChecked: Dispatch<SetStateAction<SidebarItemType>>;
  text: string;
  imgName: SidebarItemType;
}) {
  const route = useRouter();
  const clickHandler = () => {
    setChecked(imgName);
    route.push(`/main/${imgName}`);
  };

  return (
    <div
      onClick={clickHandler}
      className={style.wrapper}
      style={{ backgroundColor: checked === imgName ? "#F5F5F5" : "" }}
    >
      <Image
        src={`/images/${imgName}-${
          checked === imgName ? "check" : "uncheck"
        }.svg`}
        alt=""
        width={24}
        height={24}
      />
      <span
        style={{
          fontWeight: 700,
          fontSize: 16,
          paddingLeft: 8,
          color: checked === imgName ? "#900B09" : "#1E1E1E",
        }}
      >
        {text}
      </span>
    </div>
  );
}
