"use client";

import { useState } from "react";
import FormInput from "./FormInput";
import style from "../styles/Login.module.css";
import EmptyArea from "./EmptyArea";
import Link from "next/link";
import { z } from "zod";
import { useSearchParams } from "next/navigation";

export default function Login() {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [keepLogin, setkeepLogin] = useState(false);

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

  if (searchParams.get("join")) {
    return null;
  }

  return (
    <div className={style.wrapper}>
      <span className={style.title}>로그인</span>

      <span className={style.subTitle}>이메일 계정을 입력해주세요</span>

      <form style={{ display: "flex", flexDirection: "column" }}>
        <FormInput label={"이메일"} value={email} setValue={setEmail} />

        <EmptyArea height={20} />

        <FormInput label={"비밀번호"} value={pw} setValue={setPw} />

        <EmptyArea height={20} />

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <input
            type="checkbox"
            onChange={() => {
              setkeepLogin(!keepLogin);
            }}
          />
          <EmptyArea width={10} />
          <span style={{ fontWeight: 500, fontSize: 16, lineHeight: "24px" }}>
            로그인 기억하기
          </span>
        </div>

        <EmptyArea height={20} />

        <button onClick={reqUserLogin} id="commonBtn">
          로그인
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
          이메일 계정이 없으신가요?
        </span>
        <Link
          style={{
            color: "#95030A",
            fontWeight: 600,
            fontSize: 18,
            lineHeight: "27px",
          }}
          href={"/?join=true"}
        >
          회원가입하기
        </Link>
      </div>
    </div>
  );
}
