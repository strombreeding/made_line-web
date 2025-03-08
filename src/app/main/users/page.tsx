'use client';

import { useGlobalStore } from '@/store/globalStore';
import CombinedGraph from '../test/client';
import DonutChart from '../test/donut';

export default function Users() {
  const { selectedTab } = useGlobalStore((state) => state);
  return (
    <div>
      {selectedTab === '회원대시보드' && (
        <>
          <CombinedGraph />
          <DonutChart />
        </>
      )}
    </div>
  );
}
