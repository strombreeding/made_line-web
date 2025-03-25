interface IPaymentListProps {
  id: number;
  date: string;
  program: string;
  price: number;
  paymentTool: "무통장입금" | "카드";
  trainer: string;
  status: "정상 결제" | "환불 완료";
}

interface IPaymentProps {
  currentMembershipPrice: number;
  usedPrice: number;
  notUserdPrice: number;
  stackPaymentPrice: number;
  list: IPaymentListProps[];
}

export const paymentMockData: IPaymentProps = {
  currentMembershipPrice: 300000,
  usedPrice: 200000,
  notUserdPrice: 100000,
  stackPaymentPrice: 600000,
  list: [
    {
      id: 2,
      date: "2025-01-03",
      program: "바이브테라피 5회",
      price: -100000,
      paymentTool: "카드",
      trainer: "김혜진",
      status: "환불 완료",
    },
    {
      id: 1,
      date: "2025-01-02",
      program: "바이브핏 20회",
      price: 100000,
      paymentTool: "카드",
      trainer: "김도은",
      status: "정상 결제",
    },
    {
      id: 0,
      date: "2025-01-01",
      program: "포톤테라피 10회",
      price: 200000,
      paymentTool: "무통장입금",
      trainer: "박메라",
      status: "정상 결제",
    },
  ],
};
