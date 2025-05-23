"use client";

import { createContext, useState, useEffect, ReactNode } from "react";
import { Toast } from "@/components/ui/toast";

interface WalletContextType {
  connected: boolean;
  connecting: boolean;
  address: string | null;
  connect: () => Promise<void>;
  disconnect: () => void;
}

export const WalletContext = createContext<WalletContextType | null>(null);

export function WalletContextProvider({ children }: { children: ReactNode }) {
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  
  // Simulating wallet connection in this demo
  const connect = async () => {
    try {
      setConnecting(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock successful connection
      setConnected(true);
      setAddress("0x7f39Eb4C3A27c492c22AB7e1CeCF7134068f48B3");
      
      Toast({
        title: "Wallet connected",
      });
    } catch (error) {
      Toast({
        variant: "destructive",
        title: "Connection failed",
      });
    } finally {
      setConnecting(false);
    }
  };  
  const disconnect = () => {
    setConnected(false);
    setAddress(null);
    
    Toast({
      title: "Wallet disconnected",
    });
  };  
  return (
    <WalletContext.Provider
      value={{
        connected,
        connecting,
        address,
        connect,
        disconnect
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}