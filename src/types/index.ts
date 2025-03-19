import { IUserListFilterProps } from "./users";

export type SidebarItemType = "users" | "reservation" | "pnl" | "bell";

export interface IUserProps {
  id?: number;
  name: string;
  contact: {
    phone: string;
    email: string;
  };
  birthdate: string;
  gender: string;
  location: string;
  account: {
    id: string;
    role: string | "admin";
  };
  membership: {
    type: string | "등록회원" | "종료회원" | "체험회원";
    level: string | "신규" | "재등록" | "VIP";
    registeredAt: string;
    lastReRegisteredAt: string;
    expirationDate: string;
  };
  stats: {
    currentWeight: number;
    goalWeight: number;
    height: number;
    exerciseGoal: string;
    averageExerciseTime: string;
    sleepQuality: string;
    particulars: string;
    menstrualCycle: {
      averageCycleWeeks: number;
      currentFlowStandard: string;
      premenstrualSymptoms: string;
      activityRestrictionDuringPeriod: boolean;
    };
  };
  job: string;
  attendance: {
    monthlyCount: number;
    totalCount: number;
  };
}

export interface IReqUserDashboardProps {
  location: string; // 전체지점 도 있음
  startRangeDate: string; // 시작 날짜
  endRangeDate: string; // 종료 날짜   예를들어 1주 전 기록은 25.03.13 기준으로 다음과같음 s: 2025-03-07, e: 2025-03-13
}

export interface IReqUserListProps {
  location: string;
  specialOrder: 0;
  pagePerCnt: 10;
  requestPage: number;
  filters: IUserListFilterProps;
}

export interface IUserListProps {
  id: number;
  name: string;
  location: string;
  memberships: string[];
  expiredMembership: string;
  latestAttended: string;
  type: string;
  level: string;
}

export interface IPageInfoProps {
  totalPage: number[];
  currentPage: number;
}
