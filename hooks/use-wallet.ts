"use client";

import { useContext } from "react";
import { WalletContext } from "@/components/wallet-provider";

export function useWallet() {
  const context = useContext(WalletContext);
  
  if (!context) {
    throw new Error("useWallet must be used within a WalletContextProvider");
  }
  
  return context;
}