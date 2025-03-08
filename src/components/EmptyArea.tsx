import { memo } from "react";

export default memo(function EmptyArea({
  width = 0.1,
  height = 0.1,
}: {
  width?: number;
  height?: number;
}) {
  return <div style={{ width, height }} />;
});
