"use client";

import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function LeaderboardFilters() {
  const [timeFrame, setTimeFrame] = useState("all-time");
  const [category, setCategory] = useState("all");
  
  return (
    <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
      <Tabs defaultValue="all-time" className="w-full md:w-auto" onValueChange={setTimeFrame} value={timeFrame}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all-time">All Time</TabsTrigger>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
          <TabsTrigger value="weekly">Weekly</TabsTrigger>
        </TabsList>
      </Tabs>
      
      <div className="flex gap-2">
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="digital-art">Digital Art</SelectItem>
            <SelectItem value="technology">Technology</SelectItem>
            <SelectItem value="health-fitness">Health & Fitness</SelectItem>
            <SelectItem value="music">Music</SelectItem>
            <SelectItem value="food-cooking">Food & Cooking</SelectItem>
            <SelectItem value="photography">Photography</SelectItem>
            <SelectItem value="gaming">Gaming</SelectItem>
            <SelectItem value="travel">Travel</SelectItem>
            <SelectItem value="programming">Programming</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}