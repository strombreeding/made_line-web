interface ICommonTableProps {
  headerData: {
    name: string;
    keyName: string;
    type: "string" | "date" | "badge";
  }[];
  rowData: {
    keyName: string;
    badgeColor?: string;
    value: string;
  }[];
}

const mockList = [
  {
    header: "날짜",
    type: "date",
    value: "2023-01-01",
  },
  {
    header: "날짜",
    type: "date",
    value: "2023-01-01",
  },
  {
    header: "날짜",
    type: "date",
    value: "2023-01-01",
  },
  {
    header: "날짜",
    type: "date",
    value: "2023-01-01",
  },
];

export default function CommonTable({}: ICommonTableProps) {
  return (
    <div>
      {/* 헤더 */}
      <div></div>
      {/* 아이템들 */}
    </div>
  );
}
