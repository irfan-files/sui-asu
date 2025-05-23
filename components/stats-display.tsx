"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  Award, 
  Zap,
  FileCheck
} from "lucide-react";

// Mock data - would come from API in real implementation
const statsData = {
  totalCreators: 12482,
  totalNfts: 35691,
  totalCollaborations: 8754,
  creditScoreAvg: 7.8
};

export function StatsDisplay() {
  const [animatedStats, setAnimatedStats] = useState({
    totalCreators: 0,
    totalNfts: 0,
    totalCollaborations: 0,
    creditScoreAvg: 0
  });

  useEffect(() => {
    let animationFrameId: number;
    const startTime = Date.now();
    const duration = 2000; // 2 seconds animation
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      setAnimatedStats({
        totalCreators: Math.floor(progress * statsData.totalCreators),
        totalNfts: Math.floor(progress * statsData.totalNfts),
        totalCollaborations: Math.floor(progress * statsData.totalCollaborations),
        creditScoreAvg: parseFloat((progress * statsData.creditScoreAvg).toFixed(1))
      });
      
      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };
    
    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const stats = [
    {
      icon: <Users className="h-6 w-6" />,
      value: animatedStats.totalCreators.toLocaleString(),
      label: "Registered Creators",
      color: "text-blue-400"
    },
    {
      icon: <FileCheck className="h-6 w-6" />,
      value: animatedStats.totalNfts.toLocaleString(),
      label: "Minted NFTs",
      color: "text-purple-400"
    },
    {
      icon: <Zap className="h-6 w-6" />,
      value: animatedStats.totalCollaborations.toLocaleString(),
      label: "Collaborations",
      color: "text-amber-400"
    },
    {
      icon: <Award className="h-6 w-6" />,
      value: animatedStats.creditScoreAvg.toLocaleString(),
      label: "Avg Credit Score",
      color: "text-emerald-400"
    }
  ];

  return (
    <section className="py-12">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="flex flex-col items-center justify-center p-6 rounded-xl bg-card/30 border border-border/50 backdrop-blur-sm relative overflow-hidden"
            >
              <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br from-primary/20 to-transparent blur-3xl pointer-events-none" />
              
              <div className={`mb-2 ${stat.color}`}>
                {stat.icon}
              </div>
              
              <div className="text-3xl font-bold mt-2">
                {stat.value}
              </div>
              
              <div className="text-sm text-muted-foreground mt-1">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}