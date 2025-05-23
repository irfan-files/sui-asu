"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Twitter, Instagram, Youtube, TrendingUp, TrendingDown, Minus, Medal } from "lucide-react";

// Mock data
const leaderboardData = [
  {
    id: "creator-001",
    rank: 1,
    name: "Alex Morgan",
    handle: "@alexmorganart",
    avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    platforms: ["twitter", "instagram"],
    category: "Digital Art",
    score: 9.8,
    change: "+0.3",
    trend: "up",
    collaborations: 28
  },
  {
    id: "creator-002",
    rank: 2,
    name: "Mike Chen",
    handle: "@mikechentech",
    avatar: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    platforms: ["twitter", "youtube"],
    category: "Technology",
    score: 9.6,
    change: "+0.5",
    trend: "up",
    collaborations: 42
  },
  {
    id: "creator-003",
    rank: 3,
    name: "Sarah Johnson",
    handle: "@sarahfitness",
    avatar: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    platforms: ["instagram", "youtube"],
    category: "Health & Fitness",
    score: 9.4,
    change: "+0.2",
    trend: "up",
    collaborations: 35
  },
  {
    id: "creator-004",
    rank: 4,
    name: "David Kim",
    handle: "@davidkimmusic",
    avatar: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    platforms: ["twitter", "instagram", "youtube"],
    category: "Music",
    score: 9.2,
    change: "-0.1",
    trend: "down",
    collaborations: 19
  },
  {
    id: "creator-005",
    rank: 5,
    name: "Elena Lopez",
    handle: "@elenacooks",
    avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    platforms: ["instagram", "youtube"],
    category: "Food & Cooking",
    score: 9.0,
    change: "0.0",
    trend: "none",
    collaborations: 22
  },
  {
    id: "creator-006",
    rank: 6,
    name: "James Wilson",
    handle: "@jameswilsonphoto",
    avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    platforms: ["instagram", "twitter"],
    category: "Photography",
    score: 8.9,
    change: "+0.2",
    trend: "up",
    collaborations: 15
  },
  {
    id: "creator-007",
    rank: 7,
    name: "Priya Patel",
    handle: "@priyatech",
    avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    platforms: ["twitter", "youtube"],
    category: "Technology",
    score: 8.7,
    change: "-0.2",
    trend: "down",
    collaborations: 27
  },
  {
    id: "creator-008",
    rank: 8,
    name: "Robert Garcia",
    handle: "@robertgarcia",
    avatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    platforms: ["twitter", "instagram"],
    category: "Gaming",
    score: 8.6,
    change: "+0.3",
    trend: "up",
    collaborations: 31
  },
  {
    id: "creator-009",
    rank: 9,
    name: "Emma Wright",
    handle: "@emmatravel",
    avatar: "https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    platforms: ["instagram", "youtube"],
    category: "Travel",
    score: 8.5,
    change: "+0.1",
    trend: "up",
    collaborations: 24
  },
  {
    id: "creator-010",
    rank: 10,
    name: "Jason Lee",
    handle: "@jasonleedev",
    avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    platforms: ["twitter"],
    category: "Programming",
    score: 8.4,
    change: "-0.1",
    trend: "down",
    collaborations: 18
  }
];

export function LeaderboardTable() {
  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "twitter":
        return <Twitter className="h-4 w-4" />;
      case "instagram":
        return <Instagram className="h-4 w-4" />;
      case "youtube":
        return <Youtube className="h-4 w-4" />;
      default:
        return null;
    }
  };
  
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      case "none":
        return <Minus className="h-4 w-4 text-muted-foreground" />;
      default:
        return null;
    }
  };
  
  const getMedalColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "text-amber-400";
      case 2:
        return "text-slate-300";
      case 3:
        return "text-amber-700";
      default:
        return "text-muted-foreground";
    }
  };
  
  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead className="w-16">Rank</TableHead>
            <TableHead>Creator</TableHead>
            <TableHead className="hidden md:table-cell">Category</TableHead>
            <TableHead className="hidden md:table-cell">Platforms</TableHead>
            <TableHead className="text-right">Score</TableHead>
            <TableHead className="hidden md:table-cell text-right">Change</TableHead>
            <TableHead className="hidden md:table-cell text-right">Collaborations</TableHead>
            <TableHead className="w-28 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leaderboardData.map((creator) => (
            <TableRow key={creator.id} className="hover:bg-muted/50">
              <TableCell className="font-medium">
                <div className="flex items-center justify-center">
                  {creator.rank <= 3 ? (
                    <Medal className={`h-5 w-5 ${getMedalColor(creator.rank)}`} />
                  ) : (
                    <span>{creator.rank}</span>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full overflow-hidden relative">
                    <Image
                      src={creator.avatar}
                      alt={creator.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-medium">{creator.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {creator.handle}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <Badge variant="outline">{creator.category}</Badge>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <div className="flex space-x-1">
                  {creator.platforms.map((platform, i) => (
                    <div key={i} className="p-1 rounded-full bg-muted">
                      {getPlatformIcon(platform)}
                    </div>
                  ))}
                </div>
              </TableCell>
              <TableCell className="text-right font-bold">{creator.score}</TableCell>
              <TableCell className="hidden md:table-cell text-right">
                <div className="flex items-center justify-end space-x-1">
                  {getTrendIcon(creator.trend)}
                  <span className={
                    creator.trend === "up" ? "text-green-500" : 
                    creator.trend === "down" ? "text-red-500" : 
                    "text-muted-foreground"
                  }>
                    {creator.change}
                  </span>
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell text-right">
                {creator.collaborations}
              </TableCell>
              <TableCell className="text-right">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/creators/${creator.id}`}>View</Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}