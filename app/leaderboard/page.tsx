import { PageHeader } from '@/components/page-header';
import { LeaderboardTable } from '@/components/leaderboard-table';
import { LeaderboardFilters } from '@/components/leaderboard-filters';

export default function LeaderboardPage() {
  return (
    <div className="container py-8">
      <PageHeader
        heading="Creator Leaderboard"
        subheading="Top creators ranked by social credit score and engagement metrics"
      />
      <LeaderboardFilters />
      <LeaderboardTable />
    </div>
  );
}