import styles from "../../../styles/userDashboardItem.module.css";
export default function Items({
  number,
  title,
  percent,
  subTitle,
}: {
  number: number;
  title: string;
  percent: number;
  subTitle: string;
}) {
  return (
    <div className={styles.itemWrapper} style={{ backgroundColor: "white" }}>
      <div className={styles.itemHeader} style={{ gap: 10 }}>
        <span className={styles.itemTitle}>{title}</span>

        <div className={styles.itemContentWrap}>
          <span className={styles.itemNumberText}>
            {number.toLocaleString()}원
          </span>
          <div className={styles.findBtn} style={{ cursor: "text" }}>
            <span className={styles.findBtnText}>+{percent}%</span>
          </div>
        </div>

        <span style={{ fontSize: 16, fontWeight: 400, color: "#697077" }}>
          {subTitle}
        </span>
      </div>
    </div>
  );
}
