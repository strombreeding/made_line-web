"use client";

import { useGlobalStore } from "../store/globalStore";

export default function BackgroundBlur() {
  const { modalVisible } = useGlobalStore((state) => state);

  if (!modalVisible) return null;

  return (
    <div
      style={{
        position: "absolute",
        width: "100vw",
        height: "100vh",
        backgroundColor: "#A2A1A899",
        backdropFilter: "blur(20px)",
        zIndex: 1000,
        top: 0,
        left: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    />
  );
}
