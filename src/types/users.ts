export interface ChartItem {
  name: string;
  value: number;
  color: string;
}

interface NumberItem {
  number: number;
  title: string;
}

export interface RateChart {
  title: string;
  value: number;
}

interface LocationItem {
  location: string;
  value: number;
}

interface LocationRateChart {
  compareName: string;
  locationList: LocationItem[];
}

export interface IUserDashboardData {
  totalMemberCharts: ChartItem[];
  totalUsedMemberCharts: ChartItem[];
  firstItems: NumberItem[];
  secondItems: NumberItem[];
  leaveRateCharts: RateChart[];
  locationRateCharts: LocationRateChart[];
}

export interface IUserListFilterProps {
  name: "DESC" | "ASC";
  locations: "DESC" | "ASC";
  expirationDate: "DESC" | "ASC";
  lastReRegisteredAt: "DESC" | "ASC";
  membershipType: string[]; // ["등록회원", "종료회원", "체험회원", ...]
  memberships: string[]; // ["포톤테라피", "바이브핏", ...]
  membershipLevel: string[]; // ["신규", "재등록", "VIP", ...]
}

export interface IEditProfileProps {
  name: string;
  contact: {
    phone?: string;
    email: string;
  };
  birthdate: string;
  gender?: string;
  location: string;
  membership?: {
    type?: "등록회원" | "종료회원" | "체험회원"; // enum: "등록회원"|"종료회원"|"체험회원"
    level?: "신규" | "재등록" | "VIP"; // enum: "신규"|"재등록"|"VIP"
    registeredAt?: string;
    lastReRegisteredAt?: string;
    expirationDate?: string;
  };
  stats?: {
    currentWeight?: number;
    goalWeight?: number;
    height?: number;
    exerciseGoal?: string;
    averageExerciseTime?: string;
    sleepQuality?: string;
    particulars?: string;
    menstrualCycle?: {
      // 여성만 가능함
      averageCycleWeeks?: number;
      currentFlowStandard?: string;
      premenstrualSymptoms?: string;
      activityRestrictionDuringPeriod?: boolean;
    };
  };
  job?: string;
  attendance?: {
    monthlyCount?: number;
    totalCount?: number;
    lastAttended: string;
  };
}

export interface IResUserProps {
  id: string;
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
    role: string;
  };
  membership: {
    memberships: string[];
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
    lastAttended: string;
  };
}
