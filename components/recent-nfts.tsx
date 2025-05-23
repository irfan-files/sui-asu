"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Twitter, Instagram, Youtube } from "lucide-react";

// Mock data - would come from API in real implementation
const nftsData = [
  {
    id: "nft-001",
    name: "Digital Artisan",
    platform: "twitter",
    category: "Digital Art",
    creator: "Alex Morgan",
    image: "https://images.pexels.com/photos/2166711/pexels-photo-2166711.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    score: 9.2
  },
  {
    id: "nft-002",
    name: "Fitness Guru",
    platform: "instagram",
    category: "Health & Fitness",
    creator: "Sarah Fitness",
    image: "https://images.pexels.com/photos/1547248/pexels-photo-1547248.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    score: 8.7
  },
  {
    id: "nft-003",
    name: "Tech Reviewer",
    platform: "youtube",
    category: "Technology",
    creator: "Tech With Mike",
    image: "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    score: 8.9
  }
];

export function RecentNfts() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Recently Minted NFTs</h3>
        <Button variant="link" asChild>
          <Link href="/creators">View All</Link>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        {nftsData.map((nft, index) => (
          <motion.div
            key={nft.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            onMouseEnter={() => setHoveredId(nft.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <Card className="overflow-hidden bg-card/50 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
              <CardContent className="p-0 relative">
                <div className="aspect-video relative overflow-hidden">
                  <Image
                    src={nft.image}
                    alt={nft.name}
                    fill
                    style={{ objectFit: "cover" }}
                    className={`transition-transform duration-500 ${hoveredId === nft.id ? "scale-110" : "scale-100"}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-col space-y-1">
                    <div className="flex items-center justify-between">
                      <Badge className="flex items-center gap-1 bg-primary/20 text-primary-foreground">
                        {getPlatformIcon(nft.platform)} {nft.platform}
                      </Badge>
                      <Badge variant="outline" className="bg-background/50 backdrop-blur-sm">
                        Score: {nft.score}
                      </Badge>
                    </div>
                    <h4 className="text-lg font-semibold">{nft.name}</h4>
                    <p className="text-sm text-muted-foreground">by {nft.creator}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center py-3">
                <Badge variant="secondary">{nft.category}</Badge>
                <Button variant="ghost" size="sm" asChild>
                  <Link href={`/creators/${nft.id}`}>View Details</Link>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}