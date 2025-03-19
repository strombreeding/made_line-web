"use client";

import { useGlobalStore } from "@/store/globalStore";
import DonutChart from "../test/donut";
import EmptyArea from "../../../components/EmptyArea";
import Items from "./Items";
import styles from "@/styles/userDashboard.module.css";
import Table from "../../../components/Table";
import StickChart from "./StickChart";
import { mockUsers } from "../../../data/users/user.mock";
import { IUserDashboardData } from "../../../types/users";
import { Fragment, useEffect, useState } from "react";
import UserFilter from "./Filter";
import LeaveRate from "./LeaveRate";

export default function Users() {
  const { selectedTab } = useGlobalStore((state) => state);
  const [userDashboard, setUserDashboard] = useState<IUserDashboardData>(
    {} as IUserDashboardData
  );
  const [ready, setReady] = useState(false);

  useEffect(() => {
    return () => {
      console.log("언마운트");
    };
  }, []);

  return (
    <div>
      {selectedTab === "회원대시보드" && (
        <div className={styles.mainWrapper}>
          <UserFilter setReady={setReady} setDashboard={setUserDashboard} />
          {ready && (
            <>
              {/* <CombinedGraph /> */}
              <div style={{ display: "flex", flexDirection: "row", gap: 15 }}>
                <DonutChart
                  title="총 회원"
                  itemList={userDashboard.totalMemberCharts}
                />
                <DonutChart
                  title="총 이용회원"
                  itemList={userDashboard.totalUsedMemberCharts}
                  isDonut={false}
                />
                <StickChart
                  title={"지점별 순위"}
                  data={userDashboard.locationRateCharts}
                  maxHeight={211}
                />
              </div>

              {/*  */}
              <EmptyArea height={14} />

              <div style={{ display: "flex", flexDirection: "row", gap: 12 }}>
                {/* 6개 */}
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 27 }}
                >
                  <div className={styles.contentWrapper}>
                    {userDashboard.firstItems.map((item) => (
                      <Items key={item.title} {...item} />
                    ))}
                  </div>

                  {/* 두번쨰 */}
                  <div className={styles.contentWrapper}>
                    {userDashboard.secondItems.map((item) => (
                      <Items key={item.title} {...item} />
                    ))}
                  </div>
                </div>
                {/* 이탈율 */}
                <LeaveRate leaveRateCharts={userDashboard.leaveRateCharts} />
              </div>
            </>
          )}
        </div>
      )}
      {selectedTab === "전체회원" && <Table data={mockUsers} />}
    </div>
  );
}
