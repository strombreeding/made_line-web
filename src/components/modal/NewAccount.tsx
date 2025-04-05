import Image from "next/image";
import ModalContainer from "../BackgroundBlur";
import ProfileItem from "../users/userInfo/ProfileItem";
import { useEffect, useState } from "react";
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

  const reqCreateUser = async () => {
    await fetch("/api/users/profile", {
      method: "POST",
      body: JSON.stringify({
        name: editName,
        contact: { phone: editPhone, email: editEmail },
        birthdate: editBirth.replaceAll(".", "-"),
        location: editLocation,
      }),
    });
  };

  useEffect(() => {
    // 전화번호 입력값에서 숫자만 추출
    const digits = editPhone.replace(/\D/g, "");

    // 숫자가 있을 경우에만 포맷팅 진행
    if (digits.length > 0) {
      // 000-0000-0000 형식으로 변환
      let formattedNumber = "";

      if (digits.length <= 3) {
        formattedNumber = digits;
      } else if (digits.length <= 7) {
        formattedNumber = digits.slice(0, 3) + "-" + digits.slice(3);
      } else {
        formattedNumber =
          digits.slice(0, 3) +
          "-" +
          digits.slice(3, 7) +
          "-" +
          digits.slice(7, 11);
      }

      // 입력 값이 이미 포맷팅된 값과 다를 경우에만 업데이트
      if (formattedNumber !== editPhone) {
        setEditPhone(formattedNumber);
      }
    }
  }, [editPhone]);

  useEffect(() => {
    setEditBirth(editBirth.replaceAll("-", "."));
  }, [editBirth]);

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
          title="생년월일"
          value={editBirth}
          editable
          setValue={setEditBirth}
          type="date"
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
            reqCreateUser();
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
