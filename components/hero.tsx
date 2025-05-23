"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Sparkles, Users, TrendingUp } from "lucide-react";

export function Hero() {
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative w-full overflow-hidden">
      <div 
        className="absolute inset-0 bg-gradient-to-br from-background via-background to-purple-900/20"
        style={{
          opacity: Math.min(1, 0.2 + scrollY / 500),
        }}
      />
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, rgba(124, 58, 237, 0.1) 0%, rgba(0, 0, 0, 0) 70%)`,
          backgroundSize: "100% 100%",
          backgroundPosition: "center",
        }}
      />
      
      <div className="container relative pt-24 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex justify-center mb-6"
          >
            <div className="relative inline-flex">
              <Sparkles className="h-12 w-12 text-primary" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-primary"></span>
              </span>
            </div>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl"
          >
            <span className="block">Transform Your Social Presence</span>
            <span className="block text-primary">Into Digital Value</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Mint your social media accounts as NFTs, collaborate with projects, and build your creator credit score in the Web3 ecosystem.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="mt-10 flex flex-col sm:flex-row justify-center gap-4"
          >
            <Button asChild size="lg" className="rounded-full">
              <Link href="/mint">
                Start Minting
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full">
              <Link href="/creators">
                Explore Creators
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
      
      <div className="container pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Sparkles className="h-10 w-10 text-primary" />,
              title: "Mint Your Social Media",
              description: "Transform your social accounts into verified NFTs with reputation metrics"
            },
            {
              icon: <Users className="h-10 w-10 text-primary" />,
              title: "Collaborate & Earn",
              description: "Connect with projects and other creators to build your social credit"
            },
            {
              icon: <TrendingUp className="h-10 w-10 text-primary" />,
              title: "Climb the Leaderboard",
              description: "Gain recognition as your social credit score rises in the ecosystem"
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.2, duration: 0.5 }}
              className="flex flex-col items-center text-center p-6 rounded-xl bg-card/50 border border-border/50 backdrop-blur-sm"
            >
              <div className="mb-4 p-3 rounded-full bg-primary/10">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}