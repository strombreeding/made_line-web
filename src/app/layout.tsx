import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

export const metadata: Metadata = {
  title: "MadeLine-매니지먼트",
  description: "MadeLine 매니지먼트 툴",
};

const pretendard = localFont({
  src: "../../public/fonts/PretendardVariable.woff2", // public 경로 기준으로 작성해야 함!
  display: "swap",
  variable: "--font-pretendard",
});

// const inter = Noto_Sans({
//   subsets: ["latin"],
// });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={pretendard.variable}>
      <body>{children}</body>
    </html>
  );
}
