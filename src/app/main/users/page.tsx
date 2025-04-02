"use client";

import { useGlobalStore } from "@/store/globalStore";
import DonutChart from "../test/donut";
import EmptyArea from "../../../components/EmptyArea";
import Items from "../../../components/users/dashboard/Items";
import styles from "@/styles/userDashboard.module.css";
import UserTable from "../../../components/users/userList/UserTable";
import StickChart from "../../../components/users/dashboard/StickChart";
import { IUserDashboardData } from "../../../types/users";
import { useEffect, useState } from "react";
import UserFilter from "../../../components/users/dashboard/UserFilter";
import LeaveRate from "../../../components/users/dashboard/LeaveRate";
import UserInfo from "../../../components/users/userInfo/UserInfo";

export default function Users() {
  const { selectedTab } = useGlobalStore((state) => state);
  const [userDashboard, setUserDashboard] = useState<IUserDashboardData>({
    totalMemberCharts: [],
    totalUsedMemberCharts: [],
    firstItems: [],
    secondItems: [],
    leaveRateCharts: [],
    locationRateCharts: [],
  } as IUserDashboardData);

  const [ready, setReady] = useState(false);

  const totalMembers = userDashboard.totalMemberCharts.reduce(
    (acc, item) => acc + item.value,
    0
  );

  const totalUsedMembers = userDashboard.totalUsedMemberCharts.reduce(
    (acc, item) => acc + item.value,
    0
  );

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
                  subtitle={
                    totalMembers < 1000
                      ? totalMembers + "명"
                      : `${(totalMembers / 1000).toFixed(1)}k 명`
                  }
                  itemName={"명"}
                  isDonut
                />
                <DonutChart
                  title="총 이용회원"
                  itemList={userDashboard.totalUsedMemberCharts}
                  subtitle={
                    totalUsedMembers < 1000
                      ? totalUsedMembers + "명"
                      : `${(totalUsedMembers / 1000).toFixed(1)}k 명`
                  }
                  itemName={"명"}
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
      {selectedTab === "전체회원" && <UserTable />}
      {selectedTab === "회원상세정보" && <UserInfo />}
    </div>
  );
}
