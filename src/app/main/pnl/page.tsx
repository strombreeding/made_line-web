"use client";

import { useEffect, useState } from "react";
import { useGlobalStore } from "../../../store/globalStore";

import styles from "../../../styles/pnlDashboard.module.css";

import DonutChart from "../test/donut";
import EmptyArea from "../../../components/EmptyArea";
import CombinedGraph from "../test/client";
import { PnlDashboardData } from "../../../types/pnl";
import Items from "../../../components/pnl/dashboard/Items";
import PnlDashboardTable from "../../../components/pnl/dashboard/PnlDashboardTable";
import PnlTable from "../../../components/pnl/list/PnlTable";
import PnlFilter from "../../../components/pnl/dashboard/PnlFilter";
import Purchase from "../../../components/pnl/purchase/Purchase";

export default function PnL() {
  const { selectedTab } = useGlobalStore((state) => state);
  const [pnlDashboard, setPnlDashboard] = useState<PnlDashboardData>(
    {} as PnlDashboardData
  );

  const [ready, setReady] = useState(false);

  useEffect(() => {
    return () => {
      console.log("언마운트");
    };
  }, []);

  return (
    <div>
      {selectedTab === "손익대시보드" && (
        <div
          className={styles.mainWrapper}
          style={{ backgroundColor: "transparent" }}
        >
          <PnlFilter setReady={setReady} setDashboard={setPnlDashboard} />
          {ready && (
            <>
              <div style={{ display: "flex", flexDirection: "row", gap: 15 }}>
                <CombinedGraph />
                <DonutChart
                  title="해당기간"
                  itemList={pnlDashboard.programSales} // 추후 데이터는 바껴야함
                  subtitle={"프로그램별 매출"}
                  itemName={"원"}
                  isDonut={false}
                  subTitleSize={24}
                />
                <DonutChart
                  title="해당기간"
                  itemList={pnlDashboard.purchase} // 추후 데이터는 바껴야함
                  subtitle={"항목별 지출"}
                  itemName={"원"}
                  isDonut={false}
                  subTitleSize={24}
                />
              </div>

              {/*  */}
              <EmptyArea height={14} />

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 12,
                }}
              >
                {/* 6개 */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 27,
                    flex: 1,
                  }}
                >
                  <div className={styles.contentWrapper}>
                    {pnlDashboard.firstItems.map((item) => (
                      <Items
                        key={item.title}
                        number={item.number}
                        title={item.title}
                        percent={item.percent}
                        subTitle={item.subTitle}
                      />
                    ))}
                  </div>

                  {/* 두번쨰 */}
                  <div className={styles.contentWrapper}>
                    {pnlDashboard.secondItems.map((item) => (
                      <Items
                        key={item.title}
                        number={item.number}
                        title={item.title}
                        percent={item.percent}
                        subTitle={item.subTitle}
                      />
                    ))}
                  </div>
                </div>
                {/* 테이블 */}
              </div>
            </>
          )}

          <EmptyArea height={14} />
          <PnlDashboardTable />
        </div>
      )}
      {selectedTab === "매출관리" && <PnlTable />}
      {selectedTab === "매입관리" && <Purchase />}
    </div>
  );
}
