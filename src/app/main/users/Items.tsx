import Image from "next/image";
import styles from "@/styles/userDashboardItem.module.css";
export default function Items({
  number,
  title,
}: {
  number: number;
  title: string;
}) {
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
              alert("그만말해");
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
