import Image from "next/image";
import Login from "@/components/Login";
import style from "@/app/page.module.css";
import Join from "../components/Join";

export default function Home() {
  return (
    <main className={style.background}>
      <div className={style.loginWrapper}>
        <Login />
        <Join />
      </div>
      <div
        style={{
          display: "flex",
          width: "59vw",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div></div>
        <Image
          src="/images/login-logo.png"
          alt="Login Logo"
          width={300} // 예시 크기
          height={100} // 예시 크기
          sizes="100vw, 25vw"
          style={{
            width: "25vw",
            height: "auto",
            aspectRatio: 2.98,
            alignSelf: "center",
          }}
        />
      </div>
    </main>
  );
}
