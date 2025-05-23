"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Twitter, Instagram, Youtube, Search, Trophy } from "lucide-react";
import Link from "next/link";

// Mock data
const creatorsData = [
  {
    id: "creator-001",
    name: "Alex Morgan",
    handle: "@alexmorganart",
    avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    banner: "https://images.pexels.com/photos/1762851/pexels-photo-1762851.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    platforms: ["twitter", "instagram"],
    category: "Digital Art",
    score: 9.8,
    bio: "Creating digital art and exploring NFT collections. Based in Paris.",
    nfts: 12,
    collaborations: 28
  },
  {
    id: "creator-002",
    name: "Mike Chen",
    handle: "@mikechentech",
    avatar: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    banner: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    platforms: ["twitter", "youtube"],
    category: "Technology",
    score: 9.6,
    bio: "Tech reviewer and blockchain enthusiast. Creating content about the latest in Web3.",
    nfts: 8,
    collaborations: 42
  },
  {
    id: "creator-003",
    name: "Sarah Johnson",
    handle: "@sarahfitness",
    avatar: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    banner: "https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    platforms: ["instagram", "youtube"],
    category: "Health & Fitness",
    score: 9.4,
    bio: "Fitness coach and wellness advocate. Sharing workout tips and healthy recipes.",
    nfts: 15,
    collaborations: 35
  },
  {
    id: "creator-004",
    name: "David Kim",
    handle: "@davidkimmusic",
    avatar: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    banner: "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    platforms: ["twitter", "instagram", "youtube"],
    category: "Music",
    score: 9.2,
    bio: "Independent musician and producer exploring Web3 music distribution.",
    nfts: 24,
    collaborations: 19
  },
  {
    id: "creator-005",
    name: "Elena Lopez",
    handle: "@elenacooks",
    avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    banner: "https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    platforms: ["instagram", "youtube"],
    category: "Food & Cooking",
    score: 9.0,
    bio: "Chef and food content creator sharing authentic recipes from around the world.",
    nfts: 9,
    collaborations: 22
  },
  {
    id: "creator-006",
    name: "James Wilson",
    handle: "@jameswilsonphoto",
    avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    banner: "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    platforms: ["instagram", "twitter"],
    category: "Photography",
    score: 8.9,
    bio: "Travel photographer capturing landscapes and urban scenes from across the globe.",
    nfts: 31,
    collaborations: 15
  }
];

const categories = [
  "All Categories",
  "Digital Art",
  "Technology",
  "Health & Fitness",
  "Music",
  "Food & Cooking",
  "Photography"
];

const platforms = [
  "All Platforms",
  "Twitter",
  "Instagram",
  "YouTube"
];

export function CreatorDirectory() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedPlatform, setSelectedPlatform] = useState("All Platforms");
  
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
  
  const filteredCreators = creatorsData.filter(creator => {
    // Filter by search query
    const matchesSearch = 
      creator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      creator.handle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      creator.bio.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by category
    const matchesCategory = 
      selectedCategory === "All Categories" || 
      creator.category === selectedCategory;
    
    // Filter by platform
    const matchesPlatform = 
      selectedPlatform === "All Platforms" || 
      creator.platforms.includes(selectedPlatform.toLowerCase());
    
    return matchesSearch && matchesCategory && matchesPlatform;
  });
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search creators by name or keyword..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <Select
            value={selectedCategory}
            onValueChange={setSelectedCategory}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select
            value={selectedPlatform}
            onValueChange={setSelectedPlatform}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Platform" />
            </SelectTrigger>
            <SelectContent>
              {platforms.map(platform => (
                <SelectItem key={platform} value={platform}>
                  {platform}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCreators.map((creator, index) => (
          <Link key={creator.id} href={`/creators/${creator.id}`}>
            <Card className="overflow-hidden bg-card/50 backdrop-blur-sm hover:shadow-md hover:shadow-primary/10 transition-all h-full">
              <div className="aspect-[3/1] relative">
                <Image
                  src={creator.banner}
                  alt={`${creator.name}'s banner`}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
              </div>
              
              <CardContent className="pt-0 relative">
                <div className="flex justify-between -mt-12 mb-4">
                  <div className="h-24 w-24 rounded-full overflow-hidden border-4 border-background relative">
                    <Image
                      src={creator.avatar}
                      alt={creator.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  <div className="mt-14 flex items-center gap-1">
                    <div className="flex items-center gap-1">
                      {creator.platforms.map((platform, i) => (
                        <div key={i} className="p-1.5 rounded-full bg-muted">
                          {getPlatformIcon(platform)}
                        </div>
                      ))}
                    </div>
                    
                    <Badge variant="outline" className="flex items-center gap-1 ml-2">
                      <Trophy className="h-3 w-3 text-amber-500" />
                      {creator.score}
                    </Badge>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold">{creator.name}</h3>
                    <p className="text-sm text-muted-foreground">{creator.handle}</p>
                  </div>
                  
                  <p className="text-sm line-clamp-2">{creator.bio}</p>
                  
                  <div className="flex justify-between text-sm pt-2">
                    <Badge variant="secondary">{creator.category}</Badge>
                    <div className="text-muted-foreground">
                      {creator.nfts} NFTs · {creator.collaborations} Collaborations
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      
      {filteredCreators.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No creators found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}