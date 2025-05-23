"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Twitter, Instagram, Youtube, ExternalLink } from "lucide-react";

// Mock data
const nftsData = [
  {
    id: "nft-001",
    name: "Digital Artisan",
    platform: "twitter",
    category: "Digital Art",
    image: "https://images.pexels.com/photos/2166711/pexels-photo-2166711.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    score: 9.7,
    mintDate: "March 15, 2025",
    account: "@alexmorganart",
    followers: "24.5K",
    avgEngagement: "8.2%"
  },
  {
    id: "nft-002",
    name: "Design Curator",
    platform: "instagram",
    category: "Design",
    image: "https://images.pexels.com/photos/1762851/pexels-photo-1762851.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    score: 9.4,
    mintDate: "February 28, 2025",
    account: "@alexmorgan.design",
    followers: "32.1K",
    avgEngagement: "5.8%"
  },
  {
    id: "nft-003",
    name: "Creative Process",
    platform: "youtube",
    category: "Education",
    image: "https://images.pexels.com/photos/3685523/pexels-photo-3685523.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    score: 8.9,
    mintDate: "January 10, 2025",
    account: "Alex Morgan Art",
    followers: "18.7K",
    avgEngagement: "12.3%"
  }
];

const collaborationNftsData = [
  {
    id: "collab-001",
    name: "AI Art Generator",
    partner: "TechInnovators",
    category: "Technology",
    image: "https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    status: "active",
    mintDate: "March 10, 2025",
    endDate: "June 10, 2025"
  },
  {
    id: "collab-002",
    name: "Fitness Challenge Series",
    partner: "FitLife",
    category: "Health & Fitness",
    image: "https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    status: "completed",
    mintDate: "January 5, 2025",
    endDate: "March 5, 2025"
  }
];

export function CreatorNfts() {
  const [activeTab, setActiveTab] = useState("creator");
  const [selectedNft, setSelectedNft] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  
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
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-blue-500/10 text-blue-500 border-blue-500/50";
      case "completed":
        return "bg-green-500/10 text-green-500 border-green-500/50";
      default:
        return "";
    }
  };
  
  return (
    <Card className="bg-card/50 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle>My NFTs</CardTitle>
          
          <Tabs defaultValue="creator" onValueChange={setActiveTab} value={activeTab}>
            <TabsList>
              <TabsTrigger value="creator">Creator</TabsTrigger>
              <TabsTrigger value="collaboration">Collaboration</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      
      <CardContent>
        <TabsContent value="creator" className="mt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {nftsData.map((nft) => (
              <div
                key={nft.id}
                className="relative overflow-hidden rounded-lg cursor-pointer border border-border/50 hover:shadow-md hover:border-primary/30 transition-all"
                onClick={() => {
                  setSelectedNft({ ...nft, type: "creator" });
                  setDialogOpen(true);
                }}
              >
                <div className="aspect-square relative">
                  <Image
                    src={nft.image}
                    alt={nft.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <div className="flex justify-between items-center">
                    <Badge variant="outline" className="bg-background/30 backdrop-blur-sm flex items-center gap-1">
                      {getPlatformIcon(nft.platform)}
                      <span>{nft.platform}</span>
                    </Badge>
                    
                    <Badge variant="outline" className="bg-background/30 backdrop-blur-sm">
                      Score: {nft.score}
                    </Badge>
                  </div>
                  
                  <h3 className="text-base font-medium mt-2 text-white">{nft.name}</h3>
                  <p className="text-xs text-white/80">{nft.category}</p>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="collaboration" className="mt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {collaborationNftsData.map((nft) => (
              <div
                key={nft.id}
                className="relative overflow-hidden rounded-lg cursor-pointer border border-border/50 hover:shadow-md hover:border-primary/30 transition-all"
                onClick={() => {
                  setSelectedNft({ ...nft, type: "collaboration" });
                  setDialogOpen(true);
                }}
              >
                <div className="aspect-video relative">
                  <Image
                    src={nft.image}
                    alt={nft.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <div className="flex justify-between items-center">
                    <Badge variant="outline" className="bg-background/30 backdrop-blur-sm">
                      {nft.category}
                    </Badge>
                    
                    <Badge variant="outline" className={`${getStatusColor(nft.status)} bg-background/30 backdrop-blur-sm`}>
                      {nft.status === "active" ? "Active" : "Completed"}
                    </Badge>
                  </div>
                  
                  <h3 className="text-base font-medium mt-2 text-white">{nft.name}</h3>
                  <p className="text-xs text-white/80">with {nft.partner}</p>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </CardContent>
      
      {selectedNft && (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{selectedNft.name}</DialogTitle>
              <DialogDescription>
                {selectedNft.type === "creator" 
                  ? `Creator NFT minted on ${selectedNft.mintDate}`
                  : `Collaboration NFT with ${selectedNft.partner}`
                }
              </DialogDescription>
            </DialogHeader>
            
            <div className="aspect-square sm:aspect-video relative rounded-md overflow-hidden my-4">
              <Image
                src={selectedNft.image}
                alt={selectedNft.name}
                fill
                className="object-cover"
              />
            </div>
            
            <div className="space-y-4">
              {selectedNft.type === "creator" ? (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-muted p-3 rounded-md">
                      <h4 className="text-sm font-medium mb-1">Platform</h4>
                      <div className="flex items-center text-muted-foreground">
                        {getPlatformIcon(selectedNft.platform)}
                        <span className="ml-2 capitalize">{selectedNft.platform}</span>
                      </div>
                    </div>
                    
                    <div className="bg-muted p-3 rounded-md">
                      <h4 className="text-sm font-medium mb-1">Account</h4>
                      <div className="flex items-center text-muted-foreground">
                        {selectedNft.account}
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </div>
                    </div>
                    
                    <div className="bg-muted p-3 rounded-md">
                      <h4 className="text-sm font-medium mb-1">Followers</h4>
                      <div className="text-muted-foreground">
                        {selectedNft.followers}
                      </div>
                    </div>
                    
                    <div className="bg-muted p-3 rounded-md">
                      <h4 className="text-sm font-medium mb-1">Engagement</h4>
                      <div className="text-muted-foreground">
                        {selectedNft.avgEngagement}
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-muted p-3 rounded-md">
                    <h4 className="text-sm font-medium mb-1">Social Credit Score</h4>
                    <div className="flex items-center">
                      <div className="bg-gradient-to-r from-amber-500 to-amber-300 h-2 rounded-full flex-1 mr-3" style={{ width: `${(selectedNft.score / 10) * 100}%` }}></div>
                      <span className="font-medium">{selectedNft.score}/10</span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-muted p-3 rounded-md">
                      <h4 className="text-sm font-medium mb-1">Partner</h4>
                      <div className="text-muted-foreground">
                        {selectedNft.partner}
                      </div>
                    </div>
                    
                    <div className="bg-muted p-3 rounded-md">
                      <h4 className="text-sm font-medium mb-1">Category</h4>
                      <div className="text-muted-foreground">
                        {selectedNft.category}
                      </div>
                    </div>
                    
                    <div className="bg-muted p-3 rounded-md">
                      <h4 className="text-sm font-medium mb-1">Start Date</h4>
                      <div className="text-muted-foreground">
                        {selectedNft.mintDate}
                      </div>
                    </div>
                    
                    <div className="bg-muted p-3 rounded-md">
                      <h4 className="text-sm font-medium mb-1">End Date</h4>
                      <div className="text-muted-foreground">
                        {selectedNft.endDate}
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-muted p-3 rounded-md">
                    <h4 className="text-sm font-medium mb-1">Status</h4>
                    <Badge variant="outline" className={getStatusColor(selectedNft.status)}>
                      {selectedNft.status === "active" ? "Active" : "Completed"}
                    </Badge>
                  </div>
                </>
              )}
              
              <div className="bg-muted p-3 rounded-md flex items-center">
                <div className="bg-primary/10 p-1.5 rounded-full mr-2">
                  <ExternalLink className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm font-mono">View on blockchain explorer</span>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </Card>
  );
}