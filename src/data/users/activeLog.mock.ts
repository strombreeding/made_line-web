interface IActiveLogProps {
  id: number;
  userId: string;
  date: string;
  type: string; // 유형
  notes: string;
  createdAt: string;
}

export const activeLogMockData: IActiveLogProps[] = [
  {
    id: 5,
    userId: "user2",
    date: "2023-01-05 08:00",
    type: "예약 완료",
    notes: "노트입니다 노트입니다 노트입니다 노트입니다.",
    createdAt: "2023-01-02T00:00:00.000Z",
  },
  {
    id: 4,
    userId: "user2",
    date: "2023-01-04 08:00",
    type: "결제 완료",
    notes: "노트입니다 노트입니다 노트입니다 노트입니다.",
    createdAt: "2023-01-02T00:00:00.000Z",
  },
  {
    id: 3,
    userId: "user2",
    date: "2023-01-03 08:00",
    type: "예약 취소",
    notes: "노트입니다 노트입니다 노트입니다 노트입니다.",
    createdAt: "2023-01-02T00:00:00.000Z",
  },
  {
    id: 2,
    userId: "user2",
    date: "2023-01-02 08:00",
    type: "예약 완료",
    notes: "노트입니다 노트입니다 노트입니다 노트입니다.",
    createdAt: "2023-01-02T00:00:00.000Z",
  },
  {
    id: 1,
    userId: "user1",
    date: "2023-01-01 08:00",
    type: "예약 완료",
    notes: "노트입니다 노트입니다 노트입니다 노트입니다.",
    createdAt: "2023-01-01T00:00:00.000Z",
  },
];
