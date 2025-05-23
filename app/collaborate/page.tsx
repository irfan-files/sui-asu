"use client";

import { PageHeader } from '@/components/page-header';
import { CollaborationHub } from '@/components/collaboration-hub';
import { CollaborationHistory } from '@/components/collaboration-history';
import { ConnectWalletPrompt } from '@/components/connect-wallet-prompt';
import { useWallet } from '@/hooks/use-wallet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function CollaboratePage() {
  const { connected } = useWallet();
  
  return (
    <div className="container py-8">
      <PageHeader
        heading="Creator Collaborations"
        subheading="Discover, initiate, and manage collaborations with other creators and projects"
      />
      
      {connected ? (
        <Tabs defaultValue="available" className="mt-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="available">Available Collaborations</TabsTrigger>
            <TabsTrigger value="history">Collaboration History</TabsTrigger>
          </TabsList>
          <TabsContent value="available" className="mt-6">
            <CollaborationHub />
          </TabsContent>
          <TabsContent value="history" className="mt-6">
            <CollaborationHistory />
          </TabsContent>
        </Tabs>
      ) : (
        <ConnectWalletPrompt message="Connect your wallet to access collaboration features" />
      )}
    </div>
  );
}