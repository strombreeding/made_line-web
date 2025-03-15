import Image from "next/image";
import styles from "@/styles/userDashboardItem.module.css";
import { specialOrders, useUserStore } from "../../../store/userStore";
import { useGlobalStore } from "../../../store/globalStore";
export default function Items({
  number,
  title,
}: {
  number: number;
  title: string;
}) {
  const setSpecialOrder = useUserStore((state) => state.setSpecialOredr);
  const setSelectedTab = useGlobalStore((state) => state.setSelectedTab);

  return (
    <div className={styles.itemWrapper}>
      <div className={styles.itemHeader}>
        <span className={styles.itemTitle}>{title}</span>

        <div className={styles.itemContentWrap}>
          <span className={styles.itemNumberText}>
            {number < 1000 ? number : `${(number / 1000).toFixed(1)}k`}명
          </span>
          <div
            className={styles.findBtn}
            onClick={() => {
              const findIdx = specialOrders.findIndex((item) => item === title);
              console.log(specialOrders, title, specialOrders.indexOf(title));
              setSpecialOrder(findIdx);
              setSelectedTab("전체회원");
            }}
          >
            <Image
              src="/images/search.svg"
              alt="search"
              width={11}
              height={11}
            />
            <span className={styles.findBtnText}>조회</span>
          </div>
        </div>
      </div>
    </div>
  );
}
