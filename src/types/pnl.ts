export interface ChartItem {
  name: string;
  value: number;
  color: string;
}

interface Item {
  number: number;
  percent: number;
  title: string;
  subTitle: string;
}

interface TableItem {
  type: string;
  profit: number;
  sales: number;
  purchase: number;
  refund: number;
}

export interface PnlDashboardData {
  programSales: ChartItem[];
  purchase: ChartItem[];
  firstItems: Item[];
  secondItems: Item[];
  tableList: TableItem[];
}

export interface IPnlTableData {
  id: string | number;
  payDate: string;
  type: "회원권" | "상품";
  itemName: string;
  totalPrice: number;
  payType: "카드" | "계좌이체" | "현금";
  userName: string;
  location: string;
  refundState: "환불완료" | "환불신청" | "환불대기";
}

export interface IPnlTableFilterProps {
  payDate: "DESC" | "ASC";
  startDate: string;
  endDate: string;
  locations: "DESC" | "ASC";
  type: "DESC" | "ASC";
  itemName: "DESC" | "ASC";
  userName: "DESC" | "ASC";
  location: "DESC" | "ASC";
  refundState: "DESC" | "ASC";
  totalPrice: "DESC" | "ASC";
  payType: "DESC" | "ASC";
}

export interface IPurchaseTableData {
  id: string | number;
  payDate: string;
  type: string;
  itemName: string;
  totalPrice: number;
  payType: string;
  author: string;
  location: string;
}
