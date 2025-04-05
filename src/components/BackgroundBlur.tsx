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
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0 }}>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
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
      >
        <div
          style={{
            position: "absolute",
            top: "10%",
            left: "30%",
            right: "30%",
            bottom: "10%",
            zIndex: 100,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
