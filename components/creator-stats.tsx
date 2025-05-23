"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResponsiveContainer, AreaChart, Area, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

// Mock data
const weeklyData = [
  { name: "Mon", score: 9.3, collaborations: 2, mentions: 15 },
  { name: "Tue", score: 9.4, collaborations: 0, mentions: 18 },
  { name: "Wed", score: 9.5, collaborations: 1, mentions: 12 },
  { name: "Thu", score: 9.6, collaborations: 0, mentions: 22 },
  { name: "Fri", score: 9.7, collaborations: 1, mentions: 25 },
  { name: "Sat", score: 9.8, collaborations: 0, mentions: 20 },
  { name: "Sun", score: 9.8, collaborations: 0, mentions: 17 }
];

const monthlyData = [
  { name: "Jan", score: 7.2, collaborations: 4, mentions: 45 },
  { name: "Feb", score: 7.8, collaborations: 5, mentions: 58 },
  { name: "Mar", score: 8.1, collaborations: 6, mentions: 75 },
  { name: "Apr", score: 8.5, collaborations: 3, mentions: 84 },
  { name: "May", score: 8.9, collaborations: 7, mentions: 95 },
  { name: "Jun", score: 9.2, collaborations: 8, mentions: 120 },
  { name: "Jul", score: 9.5, collaborations: 10, mentions: 145 },
  { name: "Aug", score: 9.8, collaborations: 12, mentions: 160 }
];

const categoryScores = [
  { name: "Engagement", score: 9.7 },
  { name: "Quality", score: 9.5 },
  { name: "Consistency", score: 9.8 },
  { name: "Collaboration", score: 9.9 },
  { name: "Innovation", score: 9.6 }
];

export function CreatorStats() {
  const [timeRange, setTimeRange] = useState("weekly");
  
  const data = timeRange === "weekly" ? weeklyData : monthlyData;
  
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded-md shadow-md p-3 text-xs">
          <p className="font-semibold">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={`item-${index}`} style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
  
    return null;
  };
  
  return (
    <Card className="bg-card/50 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Creator Analytics</CardTitle>
            <CardDescription>Track your social credit score and engagement metrics</CardDescription>
          </div>
          
          <Tabs defaultValue="weekly" onValueChange={setTimeRange} value={timeRange}>
            <TabsList>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Social Credit Score</h4>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis domain={[0, 10]} stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <Tooltip content={<CustomTooltip />} />
                  <Area 
                    type="monotone" 
                    dataKey="score" 
                    stroke="hsl(var(--chart-1))" 
                    fillOpacity={1} 
                    fill="url(#colorScore)" 
                    name="Score"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Engagement Metrics</h4>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis yAxisId="left" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <Tooltip content={<CustomTooltip />} />
                  <Line 
                    yAxisId="left" 
                    type="monotone" 
                    dataKey="collaborations" 
                    stroke="hsl(var(--chart-2))" 
                    name="Collaborations" 
                  />
                  <Line 
                    yAxisId="right" 
                    type="monotone" 
                    dataKey="mentions" 
                    stroke="hsl(var(--chart-3))" 
                    name="Mentions" 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          <h4 className="text-sm font-medium mb-2">Score Breakdown</h4>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryScores} layout="vertical">
                <XAxis type="number" domain={[0, 10]} stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis dataKey="name" type="category" stroke="hsl(var(--muted-foreground))" fontSize={12} width={100} />
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="score" fill="hsl(var(--chart-4))" name="Score" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}