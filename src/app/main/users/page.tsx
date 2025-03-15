"use client";

import { useGlobalStore } from "@/store/globalStore";
import DonutChart from "../test/donut";
import EmptyArea from "../../../components/EmptyArea";
import Items from "./Items";
import styles from "@/styles/userDashboard.module.css";
import Table from "../../../components/Table";
import StickChart from "./StickChart";
import { mockUsers } from "../../../data/users/user.mock";
import { userDashboardData } from "../../../data/users/userDashboard.mock";
import { IUserDashboardData } from "../../../types/users";
import { useEffect, useState } from "react";

export default function Users() {
  const { selectedTab } = useGlobalStore((state) => state);
  const [userDashboard, setUserDashboard] = useState<IUserDashboardData>(
    {} as IUserDashboardData
  );
  const [ready, setReady] = useState(false);

  const req = async () => {
    const res = userDashboardData;
    console.log(res);
    setUserDashboard(res);
    setReady(true);
  };

  useEffect(() => {
    if (!ready) req();
  }, [ready]);

  if (!ready) {
    return null;
  }

  console.log(userDashboard);

  return (
    <div>
      {selectedTab === "회원대시보드" && (
        <div className={styles.mainWrapper}>
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
              <div className={styles.leaveRateWrapper}>
                <div>
                  <span>이탈율</span>
                  <span>10%</span>
                </div>
              </div>
            </div>
          </>
        </div>
      )}
      {selectedTab === "전체회원" && <Table data={mockUsers} />}
    </div>
  );
}
