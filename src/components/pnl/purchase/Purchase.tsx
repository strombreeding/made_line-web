"use client";

import Image from "next/image";
import styles from "../../../styles/purchase.module.css";
import { useGlobalStore } from "../../../store/globalStore";
import { useEffect, useState } from "react";
import NewAccount from "../../modal/NewAccount";
import { usePnlStore } from "../../../store/pnlStore";
import PnlTableFilter from "./PurchaseFilter";
import { IPurchaseTableData } from "../../../types/pnl";
export default function PnlTable() {
  const { purchaseTableList, setPurchaseTableList, setPageInfo, pageInfo } =
    usePnlStore((state) => state);
  const [ready, setReady] = useState(false);
  const { selectLocation, setModalVisible } = useGlobalStore((state) => state);

  // 필터 추가시 req 할때 함께 보낼것
  // const location = useGlobalStore((state) => state.selectLocation);
  // const { filters, specialOrder } = useUserStore((state) => state);

  // 새로고침 막기 변수
  const preventClose = (e: BeforeUnloadEvent) => {
    e.preventDefault();
    e.returnValue = ""; // chrome에서는 설정이 필요해서 넣은 코드
  };

  const req = async (locationFilter = false) => {
    const res = await fetch("/api/pnl/purchase");
    const data = await res.json();

    if (locationFilter) {
      if (selectLocation === "전체지점") {
        setPurchaseTableList(data);
      } else {
        const newList = data.filter(
          (user: IPurchaseTableData) => user.location === selectLocation
        );
        setPurchaseTableList(newList);
      }
    } else {
      setPurchaseTableList(data);
    }
    setReady(true);
  };

  // 브라우저에 렌더링 시 한 번만 실행하는 코드
  useEffect(() => {
    (() => {
      window.addEventListener("beforeunload", preventClose);
    })();

    return () => {
      window.removeEventListener("beforeunload", preventClose);
    };
  }, []);

  useEffect(() => {
    req(true);
  }, [selectLocation]);

  const preventGoBack = () => {
    history.pushState(null, "", window.location.href);
    alert("종료하기를 눌러주세요 :D");
  };

  // 브라우저에 렌더링 시 한 번만 실행하는 코드
  useEffect(() => {
    (() => {
      history.pushState(null, "", window.location.href);
      window.addEventListener("popstate", preventGoBack);
    })();

    return () => {
      window.removeEventListener("popstate", preventGoBack);
    };
  }, []);

  useEffect(() => {
    req();
  }, []);

  if (!ready) {
    return null;
  }

  return (
    <div style={{ width: "100%" }}>
      {/* 헤더 영역 */}
      <div
        style={{
          display: "flex",
          flex: 1,
          marginTop: 24,
          marginBottom: 24,
          justifyContent: "flex-end",
          gap: 10,
        }}
      >
        <PnlTableFilter
          setDashboard={setPurchaseTableList}
          setReady={setReady}
        />
      </div>

      <div className={styles.tableWrapper}>
        {/* 헤더 */}
        <div className={styles.tableHeader}>
          <div className={styles.tableHeaderColumn160}>
            <span>결제일자</span>
            <Image src="/images/arrow-down.svg" alt="" width={16} height={16} />
          </div>
          <div className={styles.tableHeaderColumn160}>
            <span>구분</span>
            <Image src="/images/arrow-down.svg" alt="" width={16} height={16} />
          </div>
          <div className={styles.tableHeaderColumn160}>
            <span>품명</span>
            <Image src="/images/arrow-down.svg" alt="" width={16} height={16} />
          </div>
          <div className={styles.tableHeaderColumn160}>
            <span>결제액</span>
            <Image src="/images/arrow-down.svg" alt="" width={16} height={16} />
          </div>
          <div className={styles.tableHeaderColumn160}>
            <span>결제수단</span>
            <Image src="/images/arrow-down.svg" alt="" width={16} height={16} />
          </div>
          <div className={styles.tableHeaderColumn160}>
            <span>담당자</span>
            <Image src="/images/arrow-down.svg" alt="" width={16} height={16} />
          </div>
          <div className={styles.tableHeaderColumn160}>
            <span>지점</span>
            <Image src="/images/arrow-down.svg" alt="" width={16} height={16} />
          </div>
        </div>
        {purchaseTableList.length === 0 && (
          <div
            className={styles.tableBodyWrapper}
            style={{
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: 40,
                width: "100%",
              }}
            >
              <span
                style={{
                  display: "flex",
                  justifyContent: "center",
                  fontSize: 14,
                  fontWeight: 400,
                  color: "#121619",
                }}
              >
                다른 이름으로 검색해보시겠어요?
              </span>
              <span
                style={{
                  display: "flex",
                  justifyContent: "center",
                  fontSize: 14,
                  fontWeight: 400,
                  color: "#121619",
                }}
              >
                일치하는 정보가 없습니다.
              </span>
            </div>
          </div>
        )}
        {/* 데이터 */}
        {purchaseTableList.map((item, i) => {
          return (
            <div
              className={styles.tableBodyWrapper}
              key={i}
              style={{
                borderBottomLeftRadius:
                  purchaseTableList.length - 1 === i ? 20 : 0,
                borderBottomRightRadius:
                  purchaseTableList.length - 1 === i ? 20 : 0,
              }}
            >
              <div className={styles.tableBodyColumn160}>
                <span className={styles.tableBodyColumnText2}>
                  {item.payDate}
                </span>
              </div>

              <div className={styles.tableBodyColumn160}>
                <span>{item.type}</span>
              </div>
              <div className={styles.tableBodyColumn160}>
                <span className={styles.tableBodyColumnText2}>
                  {item.itemName}
                </span>
              </div>
              <div className={styles.tableBodyColumn160}>
                <span className={styles.tableBodyColumnText2}>
                  {item.totalPrice}
                </span>
              </div>
              <div className={styles.tableBodyColumn160}>
                <span className={styles.tableBodyColumnText2}>
                  {item.payType}
                </span>
              </div>
              <div className={styles.tableBodyColumn160}>
                <span className={styles.tableBodyColumnText2}>
                  {item.author}
                </span>
              </div>
              <div className={styles.tableBodyColumn160}>
                <span className={styles.tableBodyColumnText2}>
                  {item.location}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      {/* 페이지네이션 */}
      <div
        style={{
          paddingTop: 24,
          paddingBottom: 24,
          alignSelf: "center",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 4,
            marginRight: 8,
            cursor: "pointer",
          }}
          onClick={async () => {
            await req();

            setPageInfo({
              ...pageInfo,
              currentPage: 1,
            });
          }}
        >
          <Image
            src={"/images/chevron-left.svg"}
            alt=""
            width={24}
            height={24}
          />
          <span style={{ fontSize: 16, fontWeight: 500, color: "#697077" }}>
            처음
          </span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {pageInfo.totalPage.map((index) => {
            return (
              <div
                key={index}
                style={{
                  padding: "12px 16px",
                  borderRadius: 30,
                  backgroundColor:
                    index === pageInfo.currentPage ? "#E3E3E3" : "transparent",
                  cursor: "pointer",
                }}
                onClick={async () => {
                  // 현재 페이지 + 필터기반 페이지 요청 후 set하기

                  await req();
                  setPageInfo({ ...pageInfo, currentPage: index });
                }}
              >
                <span
                  style={{ fontSize: 16, fontWeight: 500, lineHeight: "100%" }}
                >
                  {index}
                </span>
              </div>
            );
          })}
        </div>
        <div
          onClick={async () => {
            await req();
            setPageInfo({
              ...pageInfo,
              currentPage: pageInfo.totalPage.length,
            });
          }}
          style={{
            cursor: "pointer",
            display: "flex",
            flexDirection: "row",
            gap: 4,
            marginLeft: 8,
          }}
        >
          <span style={{ fontSize: 16, fontWeight: 500, color: "#697077" }}>
            끝
          </span>
          <Image
            src={"/images/chevron-right.svg"}
            alt=""
            width={24}
            height={24}
          />
        </div>
      </div>

      {/* 버튼들 */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 16,
          justifyContent: "flex-end",
        }}
      >
        <div
          style={{
            borderRadius: 10,
            padding: "16px 12px",
            backgroundColor: "#900B09",
            alignItems: "center",
            display: "flex",
            flexDirection: "row",
            gap: 8,
            cursor: "pointer",
          }}
          onClick={() => {
            setModalVisible("newUser");
          }}
        >
          <Image src="/images/edit.svg" alt="" width={20} height={20} />
          <span
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: "white",
              minWidth: 50,
              textAlign: "center",
            }}
          >
            수정
          </span>
        </div>
      </div>

      <NewAccount />
    </div>
  );
}
