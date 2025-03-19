interface ChartItem {
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
