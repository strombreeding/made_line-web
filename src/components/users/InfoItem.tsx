export default function InfoItem({
  title,
  content,
  optionalNode = null,
}: {
  title: string;
  content: string;
  optionalNode?: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        border: "1px solid #DDE1E6",
        borderRadius: 10,
        padding: 16,
        flexDirection: "column",
        gap: 5,
      }}
    >
      <span style={{ fontSize: 16, fontWeight: 400, color: "#697077" }}>
        {title}
      </span>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ fontSize: 24, fontWeight: 700, color: "#21272A" }}>
          {content}
        </span>
        {optionalNode}
      </div>
    </div>
  );
}
