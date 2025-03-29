import { create } from "zustand";
import type { IPageInfoProps } from "../types";
import {
  IPnlTableData,
  IPnlTableFilterProps,
  IPurchaseTableData,
} from "../types/pnl";

export const specialOrders = [
  "감량율 평균미달",
  "2주 미방문",
  "장기 미방문",
  "회원권 종료 임박",
  "최근 회원권 종료",
  "VIP 회원",
];

interface PnlStore {
  pnlTableList: IPnlTableData[];
  filters: IPnlTableFilterProps;
  pageInfo: IPageInfoProps;
  purchaseTableList: IPurchaseTableData[];
  setPurchaseTableList: (list: IPurchaseTableData[]) => void;
  setPnlTableList: (list: IPnlTableData[]) => void;
  setFilters: (filter: Partial<IPnlTableFilterProps>) => void;
  setPageInfo: (info: IPageInfoProps) => void;
}

export const usePnlStore = create<PnlStore>((set) => ({
  filters: {
    payDate: "DESC",
    startDate: "",
    endDate: "",
    locations: "DESC",
    type: "DESC",
    itemName: "DESC",
    userName: "DESC",
    location: "DESC",
    refundState: "DESC",
    totalPrice: "DESC",
    payType: "DESC",
  },
  purchaseTableList: [],
  setPurchaseTableList: (list) => set({ purchaseTableList: list }),
  pageInfo: {
    totalPage: new Array(1).fill(0).map((_, i) => i + 1), // 나중에 지우자.
    currentPage: 1,
  },
  pnlTableList: [],
  setPnlTableList: (list) => set({ pnlTableList: list }),
  setFilters: (filter) => set((prev) => ({ ...prev, ...filter })),
  setPageInfo: (info) => set(() => ({ pageInfo: info })),
}));
