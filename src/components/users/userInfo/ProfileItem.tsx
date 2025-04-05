import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

export default function ProfileItem({
  title,
  value,
  editable = false,
  subListValue = null,
  setValue = () => {},
  type = null,
}: {
  title: string;
  value: string;
  editable?: boolean;
  type?: "date" | null;
  subListValue?: null | Array<string | number>;
  setValue?: Dispatch<SetStateAction<string>>;
}) {
  let forMapList: null | Array<string | number> = null;
  if (subListValue != null && editable) {
    const index = subListValue.findIndex((item) => {
      if (item === value) {
        return true;
      }
    });
    const newList = [...subListValue];
    newList.splice(index, 1);
    newList.unshift(value);

    forMapList = newList;
  }

  return (
    <div style={{ display: "flex", flex: 1, flexDirection: "column", gap: 8 }}>
      <span>{title}</span>
      <div
        style={{
          padding: "13px 16px",
          borderRadius: 10,
          border: "1px solid var(--Border-Default-Default, #D9D9D9)",
        }}
      >
        {forMapList != null ? (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <select
              style={{ width: "100%", border: "none", padding: 0 }}
              onChange={(e) => {
                setValue(e.target.value);
              }}
              value={value}
            >
              {forMapList.map((item, i) => {
                return (
                  <option
                    key={i}
                    style={{
                      fontSize: 16,
                      fontWeight: 400,
                      color: "#697077",
                    }}
                    value={item}
                  >
                    {item}
                  </option>
                );
              })}
            </select>

            <Image
              src={"/images/chevron-down.svg"}
              alt=""
              width={24}
              height={24}
            />
          </div>
        ) : (
          <div style={{ position: "relative" }}>
            {type === "date" && (
              <input
                readOnly
                // readOnly={!editable}
                type={"text"}
                onChange={(e) => setValue(e.currentTarget.value)}
                style={{
                  position: "absolute",
                  width: "70%",
                  fontSize: 16,
                  fontWeight: 400,
                  color: "#697077",
                  border: "none",
                  outline: "none",
                }}
                value={value}
              />
            )}
            <input
              readOnly={!editable}
              type={type === "date" ? "date" : "text"}
              onChange={(e) => setValue(e.currentTarget.value)}
              style={{
                width: "100%",
                fontSize: 16,
                fontWeight: 400,
                color: "#697077",
                border: "none",
                outline: "none",
              }}
              value={value}
            />
          </div>
        )}
      </div>
    </div>
  );
}
