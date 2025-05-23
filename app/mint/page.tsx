"use client";

import { useState } from 'react';
import { PageHeader } from '@/components/page-header';
import { MintForm } from '@/components/mint-form';
import { ConnectWalletPrompt } from '@/components/connect-wallet-prompt';
import { useWallet } from '@/hooks/use-wallet';

export default function MintPage() {
  const { connected } = useWallet();
  
  return (
    <div className="container py-8">
      <PageHeader
        heading="Mint Your Creator NFT"
        subheading="Transform your social media presence into an authenticated digital asset"
      />
      
      {connected ? (
        <div className="mt-8 max-w-3xl mx-auto">
          <MintForm />
        </div>
      ) : (
        <ConnectWalletPrompt message="Connect your wallet to mint your Creator NFT" />
      )}
    </div>
  );
}