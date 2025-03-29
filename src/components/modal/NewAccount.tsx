import Image from "next/image";
import ModalContainer from "../BackgroundBlur";
import ProfileItem from "../users/userInfo/ProfileItem";
import { useState } from "react";
import { useGlobalStore } from "../../store/globalStore";

const options = [
  "남양주 다산점",
  "양주 옥정점",
  "의정부 가능점",
  "파주 운정점",
];

export default function NewAccount() {
  const [editName, setEditName] = useState("");
  const [editLocation, setEditLocation] = useState(options[0]);
  const [editPhone, setEditPhone] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editBirth, setEditBirth] = useState("");

  const { setModalVisible } = useGlobalStore((state) => state);

  return (
    <ModalContainer modalName="newUser">
      <div
        style={{
          position: "absolute",
          backgroundColor: "white",
          padding: 30,
          borderRadius: 10,
          minWidth: 400,
          display: "flex",
          flexDirection: "column",
          gap: 24,
        }}
      >
        <span style={{ fontSize: 34, fontWeight: 700 }}>신규회원 등록</span>
        <div
          style={{
            borderTop: "1px solid #DDE1E6",
            marginTop: 12,
            marginBottom: 12,
          }}
        />
        <ProfileItem
          editable
          title="이름"
          value={editName}
          setValue={setEditName}
        />
        <ProfileItem
          editable
          title="소속지점"
          value={editLocation}
          subListValue={options}
          setValue={setEditLocation}
        />
        <ProfileItem
          editable
          title="연락처"
          value={editPhone}
          setValue={setEditPhone}
        />
        <ProfileItem
          editable
          title="생년월일"
          value={editBirth}
          setValue={setEditBirth}
        />
        <ProfileItem
          editable
          title="이메일"
          value={editEmail}
          setValue={setEditEmail}
        />

        <div
          style={{
            alignSelf: "flex-end",
            width: 150,
            borderRadius: 10,
            padding: "16px 12px",
            backgroundColor: "#900B09",
            alignItems: "center",
            display: "flex",
            flexDirection: "row",
            gap: 8,
            cursor: "pointer",
          }}
          onClick={() => {
            alert("이곳에 신규 등록 로직");
            setModalVisible("");
          }}
        >
          <Image src="/images/insert.svg" alt="" width={20} height={20} />
          <span
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: "white",
              minWidth: 90,
              textAlign: "center",
            }}
          >
            신규 등록
          </span>
        </div>
      </div>
    </ModalContainer>
  );
}
