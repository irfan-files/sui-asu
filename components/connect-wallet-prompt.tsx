"use client";

import { motion } from "framer-motion";
import { Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWallet } from "@/hooks/use-wallet";

interface ConnectWalletPromptProps {
  message: string;
}

export function ConnectWalletPrompt({ message }: ConnectWalletPromptProps) {
  const { connect, connecting } = useWallet();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center rounded-lg bg-card/50 backdrop-blur-sm border border-border/50 p-8 mt-4"
    >
      <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
        <Wallet className="h-8 w-8 text-primary" />
      </div>
      
      <h3 className="text-xl font-semibold mb-2">Wallet Connection Required</h3>
      <p className="text-muted-foreground text-center max-w-md mb-6">
        {message}
      </p>
      
      <Button 
        onClick={connect} 
        disabled={connecting}
        className="min-w-[200px]"
      >
        {connecting ? (
          <>
            <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent"></span>
            Connecting...
          </>
        ) : (
          <>Connect Wallet</>
        )}
      </Button>
    </motion.div>
  );
}