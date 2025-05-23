import { Hero } from '@/components/hero';
import { FeaturesSection } from '@/components/features-section';
import { StatsDisplay } from '@/components/stats-display';
import { RecentNfts } from '@/components/recent-nfts';
import { TopCreators } from '@/components/top-creators';

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      <Hero />
      <FeaturesSection />
      <StatsDisplay />
      <div className="container py-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <RecentNfts />
        <TopCreators />
      </div>
    </main>
  );
}