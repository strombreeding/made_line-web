interface IAlarmTalkProps {
  id: number;
  userId: string;
  date: string;
  type: "성공" | "실패";
  notes: string;
  createdAt: string;
}

export const alarmTalkMockData: IAlarmTalkProps[] = [
  {
    id: 5,
    userId: "user2",
    date: "2023-01-05 08:00",
    type: "성공",
    notes: `
메이드라인 가능점 예약 알림
김메라 고객님 1월 27일(월요일) 오전 10시 30분 (내일) 예약되어 있습니다.`,
    createdAt: "2023-01-02T00:00:00.000Z",
  },
  {
    id: 4,
    userId: "user2",
    date: "2023-01-04 08:00",
    type: "실패",
    notes: `
메이드라인 가능점 예약 알림
김메라 고객님 1월 27일(월요일) 오전 10시 30분 (내일) 예약되어 있습니다.`,
    createdAt: "2023-01-02T00:00:00.000Z",
  },
  {
    id: 3,
    userId: "user2",
    date: "2023-01-03 08:00",
    type: "실패",
    notes: `
메이드라인 가능점 예약 알림
김메라 고객님 1월 27일(월요일) 오전 10시 30분 (내일) 예약되어 있습니다.`,
    createdAt: "2023-01-02T00:00:00.000Z",
  },
  {
    id: 2,
    userId: "user2",
    date: "2023-01-03 08:00",
    type: "실패",
    notes: `
메이드라인 가능점 예약 알림
김메라 고객님 1월 27일(월요일) 오전 10시 30분 (내일) 예약되어 있습니다.`,
    createdAt: "2023-01-02T00:00:00.000Z",
  },
];
