import { create } from "zustand";

type TitleType = "회원관리" | "손익관리" | "예약관리" | "AI 알림톡";

interface GlobalStore {
  modalVisible: string | null;
  setModalVisible: (visible: string | null) => void;

  title: TitleType;
  currentTabs: string[];
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
  setTitle: (title: "reservation" | "users" | "pnl" | "bell") => void;
  locations: string[];
  selectLocation: string;
  setSelectLocation: (location: string) => void;
}

const tabs: { name: TitleType; tabs: string[] }[] = [
  { name: "회원관리", tabs: ["회원대시보드", "전체회원", "회원상세정보"] },
  { name: "손익관리", tabs: ["손익대시보드", "매출관리", "매입관리"] },
  { name: "예약관리", tabs: ["예약대시보드"] },
  {
    name: "AI 알림톡",
    tabs: ["AI 맞춤형 알림톡", "자동 알림톡", "알림톡 발송 내역"],
  },
];

export const useGlobalStore = create<GlobalStore>((set) => ({
  modalVisible: null,
  setModalVisible: (visible: string | null) => set({ modalVisible: visible }),

  title: "회원관리",
  setTitle: (title) => {
    const changeTitle: TitleType =
      title === "reservation"
        ? "예약관리"
        : title === "users"
        ? "회원관리"
        : title === "pnl"
        ? "손익관리"
        : "AI 알림톡";
    const findTabs = tabs.find((tab) => tab.name === changeTitle) || tabs[0];
    set({ currentTabs: findTabs.tabs });
    set({ title: changeTitle });
    set({ selectedTab: findTabs.tabs[0] });
  },
  selectedTab: tabs[0].tabs[0],
  setSelectedTab: (tab) => set({ selectedTab: tab }),
  currentTabs: tabs[0].tabs,
  locations: [
    "전체지점",
    "남양주 다산점",
    "양주 옥정점",
    "의정부 가능점",
    "파주 운정점",
  ],
  selectLocation: "전체지점",
  setSelectLocation: (location) => set({ selectLocation: location }),
}));
