"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Medal, TrendingUp, ArrowRight } from "lucide-react";

// Mock data - would come from API in real implementation
const creatorsData = [
  {
    id: "creator-001",
    name: "Alex Morgan",
    avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    score: 9.8,
    change: "+0.3",
    category: "Digital Art",
    collaborations: 28
  },
  {
    id: "creator-002",
    name: "Mike Chen",
    avatar: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    score: 9.6,
    change: "+0.5",
    category: "Technology",
    collaborations: 42
  },
  {
    id: "creator-003",
    name: "Sarah Johnson",
    avatar: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    score: 9.4,
    change: "+0.2",
    category: "Health & Fitness",
    collaborations: 35
  }
];

export function TopCreators() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Top Creators</h3>
        <Button variant="link" asChild>
          <Link href="/leaderboard">View Leaderboard</Link>
        </Button>
      </div>
      
      <div className="space-y-4">
        {creatorsData.map((creator, index) => (
          <motion.div
            key={creator.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <Link href={`/creators/${creator.id}`}>
              <Card className="bg-card/50 backdrop-blur-sm hover:bg-card/70 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full overflow-hidden">
                        <Image
                          src={creator.avatar}
                          alt={creator.name}
                          width={48}
                          height={48}
                          className="object-cover"
                        />
                      </div>
                      {index === 0 && (
                        <div className="absolute -top-1 -right-1 bg-amber-500 rounded-full p-1">
                          <Medal className="h-3 w-3 text-white" />
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center">
                        <h4 className="font-medium">{creator.name}</h4>
                        <Badge variant="outline" className="ml-2 text-xs">
                          {creator.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {creator.collaborations} collaborations
                      </p>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-lg font-bold">{creator.score}</div>
                      <div className="flex items-center text-xs text-green-500">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        {creator.change}
                      </div>
                    </div>
                    
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
      
      <Button variant="outline" className="w-full" asChild>
        <Link href="/leaderboard">
          View Complete Leaderboard
        </Link>
      </Button>
    </div>
  );
}