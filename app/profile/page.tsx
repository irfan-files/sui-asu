"use client";

import { PageHeader } from '@/components/page-header';
import { ProfileDisplay } from '@/components/profile-display';
import { CreatorNfts } from '@/components/creator-nfts';
import { CreatorStats } from '@/components/creator-stats';
import { ConnectWalletPrompt } from '@/components/connect-wallet-prompt';
import { useWallet } from '@/hooks/use-wallet';

export default function ProfilePage() {
  const { connected } = useWallet();
  
  return (
    <div className="container py-8">
      <PageHeader
        heading="Creator Profile"
        subheading="Manage your creator profile, NFTs, and collaboration history"
      />
      
      {connected ? (
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <ProfileDisplay />
          </div>
          <div className="lg:col-span-2 space-y-8">
            <CreatorStats />
            <CreatorNfts />
          </div>
        </div>
      ) : (
        <ConnectWalletPrompt message="Connect your wallet to view your profile" />
      )}
    </div>
  );
}