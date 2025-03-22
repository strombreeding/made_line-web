export interface ICounselProps {
  id: number;
  date: string;
  trainer: string;
  status: "체험상담" | "시작상담" | "중간상담" | "종료상담";
  notes: string;
}

export const counselMockData: ICounselProps[] = [
  {
    id: 4,
    date: "2023-01-12",
    trainer: "박메라",
    status: "종료상담",
    notes: "운동끝났고, 재 등록은 안하시기로 함.",
  },
  {
    id: 3,
    date: "2023-01-04",
    trainer: "박메라",
    status: "중간상담",
    notes: "운동 중간점검 상담",
  },
  {
    id: 2,
    date: "2023-01-02",
    trainer: "박메라",
    status: "시작상담",
    notes: "시작하기 위해 상담을 하고 결제함",
  },
  {
    id: 1,
    date: "2023-01-01",
    trainer: "김메라",
    status: "체험상담",
    notes: "체험용으로 상담",
  },
];
