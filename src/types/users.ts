interface ChartItem {
  name: string;
  value: number;
  color: string;
}

interface NumberItem {
  number: number;
  title: string;
}

interface RateChart {
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
