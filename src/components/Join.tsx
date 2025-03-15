"use client";

import { useState } from "react";
import FormInput from "./FormInput";
import style from "../styles/Login.module.css";
import EmptyArea from "./EmptyArea";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import useLoginHook from "../hooks/useLogin";
import { useRouter } from "next/navigation";

export default function Join() {
  const searchParams = useSearchParams();
  const route = useRouter();
  const [name, setName] = useState("");
  const [dateString, setBirth] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [location, setLocation] = useState("default");
  const {
    validateName,
    validateDateFormat,
    emailValidation,
    pwValidation,
    locationValidation,
  } = useLoginHook();

  const validationCheck = () => {
    try {
      validateName(name);
      validateDateFormat(dateString);
      emailValidation(email);
      pwValidation(pw);
      locationValidation(location);
      return;
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message);
      } else {
        throw new Error("알 수 없는 오류가 발생했습니다.");
      }
    }
  };

  const reqUserLogin = async () => {
    try {
      validationCheck();

      const res = await fetch("/api/join", {
        method: "POST",
        body: JSON.stringify({ name, birth: dateString, email, pw, location }),
      });

      alert(
        "회원가입 요청이 완료되었습니다.\n최고관리자가 수락하면 로그인할 수 있습니다"
      );
      route.back();
      return;
    } catch (err) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert(err);
      }
    }
  };

  console.log(searchParams.get("join"));
  if (!searchParams.get("join") || searchParams.get("join") === "false") {
    return null;
  }

  return (
    <div className={style.wrapper}>
      <span className={style.title}>회원가입</span>

      <span className={style.subTitle}>메이드라인에 오신 것을 환영합니다</span>

      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <FormInput type="text" label={"이름"} value={name} setValue={setName} />

        <EmptyArea height={20} />

        <FormInput
          type="date"
          label={"생년월일"}
          value={dateString}
          setValue={setBirth}
          isDateInput
        />

        <EmptyArea height={20} />

        <FormInput label={"이메일"} value={email} setValue={setEmail} />

        <EmptyArea height={20} />

        <FormInput
          type="password"
          label={"비밀번호"}
          value={pw}
          setValue={setPw}
        />

        <EmptyArea height={20} />

        <select
          data-has-value={location !== "default"}
          onChange={(e) => {
            setLocation(e.currentTarget.value);
          }}
        >
          <option value="default">지점 선택</option>
          <option value="남양주 다산점">남양주 다산점</option>
          <option value="양주 옥정점">양주 옥정점</option>
          <option value="의정부 가능점">의정부 가능점</option>
          <option value="파주 운정점">파주 운정점</option>
          <option value="전체 지점 총괄">전체 지점 총괄</option>
        </select>

        <EmptyArea height={20} />

        <button onClick={reqUserLogin} id="commonBtn">
          회원가입
        </button>
      </form>

      <EmptyArea height={32} />

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            fontWeight: 400,
            fontSize: 18,
            lineHeight: "27px",
            marginRight: 5,
          }}
        >
          이미 회원가입을 하셨나요?
        </span>
        <Link
          style={{
            color: "#95030A",
            fontWeight: 600,
            fontSize: 18,
            lineHeight: "27px",
          }}
          href={"/"}
        >
          로그인하기
        </Link>
      </div>
    </div>
  );
}
