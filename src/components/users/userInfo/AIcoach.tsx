import { useState } from "react";
import ProfileItem from "./ProfileItem";
import EmptyArea from "../../EmptyArea";

const typeOfCoachList = [
  "운동 조언",
  "영양 조언",
  "상담 스타일",
  "목표 달성 전략",
  "심리 및 동기부여 코칭",
];

export default function AIcoach() {
  const [typeOfCoach, setTypeOfCoach] = useState("운동 조언");
  const [aiCoach, setAiCoach] = useState("");
  const [input, setInput] = useState("");

  const req = async () => {
    const res = await fetch("/api/ai/coach", {
      method: "POST",
      body: JSON.stringify({ typeOfCoach, input }),
    });
    const data = await res.json();
    setAiCoach(data.msg);
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "row", gap: 20, width: "100%" }}
    >
      {/* 왼쪽 */}
      <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontWeight: 400, fontSize: 14, color: "#21272A" }}>
            AI 코칭 유형 선택
          </span>
          <ProfileItem
            editable={true}
            title=""
            value={typeOfCoach}
            subListValue={typeOfCoachList}
            setValue={setTypeOfCoach}
          />
          <EmptyArea height={18} />
          <span style={{ fontWeight: 400, fontSize: 14, color: "#21272A" }}>
            새로운 정보 입력
          </span>
          <EmptyArea height={8} />

          <textarea
            style={{
              width: "100%",
              height: 150,
              border: "1px solid #D9D9D9",
              borderRadius: 10,
              padding: 10,
              outline: "none",
              resize: "none",
              fontSize: 16,
              fontWeight: 400,
              color: "#697077",
            }}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
          ></textarea>
          <span style={{ padding: "5px 0px", alignSelf: "center" }}>+</span>
          <div
            style={{
              border: "1px solid var(--Border-Default-Default, #D9D9D9)",
              borderRadius: 10,
              padding: 13,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#F5F5F5",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <span style={{ fontSize: 16, fontWeight: 400, color: "#697077" }}>
              회원의 모든 기록
            </span>
          </div>
          <EmptyArea height={12} />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              backgroundColor: "#900B09",
              padding: 20,
              borderRadius: 10,
              cursor: "pointer",
            }}
            onClick={req}
          >
            <span style={{ fontSize: 24, fontWeight: 700, color: "#FFFFFF" }}>
              AI 운동조언 생성하기
            </span>
          </div>
        </div>
      </div>
      {/* 오른쪽 */}
      <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontWeight: 400, fontSize: 14, color: "#21272A" }}>
            생성 결과
          </span>
          <EmptyArea height={8} />
          <div
            style={{
              minHeight: 315,
              display: "flex",
              padding: 20,
              borderRadius: 10,
              backgroundColor: "#F5F5F5",
            }}
          >
            <span style={{ fontSize: 16, fontWeight: 400, color: "#697077" }}>
              {aiCoach}
            </span>
          </div>
          <EmptyArea height={12} />
          <div
            style={{
              backgroundColor: "white",
              padding: 20,
              borderRadius: 10,
              border: "1px solid #913B21",
              cursor: "pointer",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <span style={{ fontSize: 24, fontWeight: 700, color: "#913B21" }}>
              복사
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
