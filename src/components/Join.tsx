"use client";

import { useState } from "react";
import FormInput from "./FormInput";
import style from "../styles/Login.module.css";
import EmptyArea from "./EmptyArea";
import Link from "next/link";
import { z } from "zod";
import { useSearchParams } from "next/navigation";

export default function Join() {
  const searchParams = useSearchParams();

  const [name, setName] = useState("");
  const [dateString, setBirth] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [keepLogin, setkeepLogin] = useState(false);

  const validateName = () => {
    // 1. 공백, 한글, 영어, 숫자를 허용하는 정규식
    const validCharacters = /^[가-힣a-zA-Z0-9\s]+$/;

    // 2. 한글 자음만 있는 경우를 체크하는 정규식
    const koreanConsonantsOnly = /^[ㄱ-ㅎ\s]+$/;

    // 3. 문자열이 비어있지 않은지 확인
    if (name.trim().length === 0) {
      throw new Error("이름을 입력해주세요.");
    }

    // 4. 유효한 문자만 포함되어 있는지 확인
    if (!validCharacters.test(name)) {
      throw new Error("유효한 문자만 입력해주세요.");
    }

    // 5. 한글 자음만 있는 경우 거부
    if (koreanConsonantsOnly.test(name)) {
      throw new Error("한글 자음은 포함될 수 없습니다.");
    }

    // 6. 숫자만으로 이루어진 경우 거부
    if (/^\d+$/.test(name.trim())) {
      throw new Error("이름은 숫자로만 이루어질 수 없습니다.");
    }

    // 모든 조건을 통과하면 true 반환
  };

  const validateDateFormat = () => {
    // YYYY-MM-DD 형식을 체크하는 정규식
    const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;

    if (!dateFormatRegex.test(dateString)) {
      throw new Error("날짜 양식이 맞지 않습니다.");
    }

    // 날짜가 유효한지 확인
    const [year, month, day] = dateString.split("-").map(Number);
    const date = new Date(year, month - 1, day);

    if (date.getFullYear() !== year) {
      throw new Error("유효하지 않은 연도 입니다.");
    }
    if (date.getMonth() !== month - 1) {
      throw new Error("유효하지 않은 월 입니다.");
    }
    if (date.getDate() !== day) {
      throw new Error("유효하지 않은 일자 입니다.");
    }
  };

  const emailValidation = () => {
    try {
      const EmailSchema = z.string().email("이메일 형식이 올바르지 않습니다.");
      EmailSchema.parse(email);
    } catch (err) {
      if (JSON.stringify(err).includes("이메일 형식")) {
        throw new Error("이메일 형식이 올바르지 않습니다.");
      }
      alert(err);
    }
  };

  const pwValidation = () => {
    // 문 + 특 + 숫 포함
    const regex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]).*$/;
    const isValid = regex.test(pw);
    if (!isValid) {
      throw new Error("비밀번호에 문자, 숫자, 특수문자를 포함해주세요.");
    }

    // 8자 이상 확인
    if (pw.length < 8) {
      throw new Error("비밀번호는 8자 이상 입력해주세요.");
    }
  };

  const reqUserLogin = async () => {
    try {
      validateName();
      validateDateFormat();
      emailValidation();
      pwValidation();
      return alert("로그인 성공!");
    } catch (err) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert(err);
      }
    }
  };

  if (!searchParams.get("join")) {
    return null;
  }

  return (
    <div className={style.wrapper}>
      <span className={style.title}>회원가입</span>

      <span className={style.subTitle}>메이드라인에 오신 것을 환영합니다</span>

      <form style={{ display: "flex", flexDirection: "column" }}>
        <FormInput type="text" label={"이름"} value={name} setValue={setName} />

        <EmptyArea height={20} />

        <FormInput
          type="date"
          label={"생년월일"}
          value={dateString}
          setValue={setBirth}
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
