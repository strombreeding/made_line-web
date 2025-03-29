import { pnlDashboardData } from "../../../data/pnl/pnlDashboardData";

export default function PnlDashboardTable() {
  const total = pnlDashboardData.tableList.reduce(
    (acc, curr) => {
      return {
        profit: acc.profit + curr.profit,
        sales: acc.sales + curr.sales,
        purchase: acc.purchase + curr.purchase,
        refund: acc.refund + curr.refund,
      };
    },
    { profit: 0, sales: 0, purchase: 0, refund: 0 }
  );
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* 테이블 */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          border: "1px solid #DDE1E6",
          borderRadius: 12,
          borderBottomWidth: 0,
        }}
      >
        {/* 헤더 */}
        <div
          style={{
            padding: "16px 48px",
            display: "flex",
            flexDirection: "row",
            borderBottom: "1px solid #DDE1E6",
            backgroundColor: "#F2F4F8",
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
          }}
        >
          <span
            style={{
              fontSize: 14,
              fontWeight: 500,
              color: "black",
              minWidth: "40%",
              maxWidth: "40%",
            }}
          >
            구분
          </span>
          <span
            style={{
              fontSize: 14,
              fontWeight: 500,
              color: "black",
              minWidth: "15%",
              maxWidth: "15%",
            }}
          >
            영업이익
          </span>
          <span
            style={{
              fontSize: 14,
              fontWeight: 500,
              color: "black",
              minWidth: "15%",
              maxWidth: "15%",
            }}
          >
            총 매출
          </span>
          <span
            style={{
              fontSize: 14,
              fontWeight: 500,
              color: "black",
              minWidth: "15%",
              maxWidth: "15%",
            }}
          >
            총 매입
          </span>
          <span
            style={{
              fontSize: 14,
              fontWeight: 500,
              color: "black",
              minWidth: "15%",
              maxWidth: "15%",
            }}
          >
            환불금액
          </span>
        </div>

        {/* 로우 */}
        {pnlDashboardData.tableList.map((item) => (
          <div
            key={item.type}
            style={{
              padding: "16px 48px",
              display: "flex",
              flexDirection: "row",
              borderBottom: "1px solid #DDE1E6",
              backgroundColor: "white",
            }}
          >
            <span
              style={{
                fontSize: 14,
                fontWeight: 500,
                color: "black",
                minWidth: "40%",
                maxWidth: "40%",
              }}
            >
              {item.type}
            </span>
            <span
              style={{
                fontSize: 14,
                fontWeight: 500,
                color: "black",
                minWidth: "15%",
                maxWidth: "15%",
              }}
            >
              {item.profit.toLocaleString()}원
            </span>
            <span
              style={{
                fontSize: 14,
                fontWeight: 500,
                color: "black",
                minWidth: "15%",
                maxWidth: "15%",
              }}
            >
              {item.sales.toLocaleString()}원
            </span>
            <span
              style={{
                fontSize: 14,
                fontWeight: 500,
                color: "black",
                minWidth: "15%",
                maxWidth: "15%",
              }}
            >
              {item.purchase.toLocaleString()}원
            </span>
            <span
              style={{
                fontSize: 14,
                fontWeight: 500,
                color: "black",
                minWidth: "15%",
                maxWidth: "15%",
              }}
            >
              {item.refund.toLocaleString()}원
            </span>
          </div>
        ))}
        <div
          style={{
            padding: "16px 48px",
            display: "flex",
            flexDirection: "row",
            borderBottom: "1px solid #DDE1E6",
            borderBottomLeftRadius: 12,
            borderBottomRightRadius: 12,
            backgroundColor: "##F5F5F5",
          }}
        >
          <span
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: "black",
              minWidth: "40%",
              maxWidth: "40%",
            }}
          >
            총 합계
          </span>
          <span
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: "black",
              minWidth: "15%",
              maxWidth: "15%",
            }}
          >
            {total.profit.toLocaleString()}원
          </span>
          <span
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: "black",
              minWidth: "15%",
              maxWidth: "15%",
            }}
          >
            {total.sales.toLocaleString()}원
          </span>
          <span
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: "black",
              minWidth: "15%",
              maxWidth: "15%",
            }}
          >
            {total.purchase.toLocaleString()}원
          </span>
          <span
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: "black",
              minWidth: "15%",
              maxWidth: "15%",
            }}
          >
            {total.refund.toLocaleString()}원
          </span>
        </div>
      </div>
    </div>
  );
}
