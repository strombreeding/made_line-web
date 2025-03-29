"use client";

import { useGlobalStore } from "../store/globalStore";

export default function ModalContainer({
  children,
  modalName,
}: {
  children: React.ReactNode;
  modalName: string;
}) {
  const { modalVisible, setModalVisible } = useGlobalStore((state) => state);

  if (!modalVisible || modalVisible !== modalName) return null;

  return (
    <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: -300,
          right: -100,
          bottom: 0,
          backgroundColor: "#A2A1A899",
          backdropFilter: "blur(20px)",
          zIndex: 10,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        onClick={() => {
          setModalVisible(null);
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "40%",
          transform: "translate(-50%, -50%)",
          zIndex: 100,
        }}
      >
        {children}
      </div>
    </div>
  );
}
