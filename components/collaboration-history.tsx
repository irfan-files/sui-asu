"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Toast } from "@/components/ui/toast";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { CheckCircle, Clock, Flame, ShieldAlert } from "lucide-react";

// Mock data
const collaborationsData = [
  {
    id: "collab-001",
    title: "AI Art Generator",
    category: "Technology",
    partner: {
      name: "TechInnovators",
      image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    status: "active",
    startDate: "March 10, 2025",
    endDate: "June 10, 2025",
    description: "Developing an AI-powered art generator that creates unique digital pieces based on text prompts.",
    nftImage: "https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    id: "collab-002",
    title: "Fitness Challenge Series",
    category: "Health & Fitness",
    partner: {
      name: "FitLife",
      image: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    status: "completed",
    startDate: "January 5, 2025",
    endDate: "March 5, 2025",
    description: "Created a 60-day fitness challenge with daily workout videos and nutrition guides.",
    nftImage: "https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    id: "collab-003",
    title: "NFT Photography Collection",
    category: "Photography",
    partner: {
      name: "James Wilson",
      image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    status: "active",
    startDate: "February 20, 2025",
    endDate: "April 20, 2025",
    description: "Curating a collection of limited edition photography NFTs featuring urban landscapes.",
    nftImage: "https://images.pexels.com/photos/2174656/pexels-photo-2174656.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  }
];

export function CollaborationHistory() {
  const [activeTab, setActiveTab] = useState<string>("active");
  const [selectedCollaboration, setSelectedCollaboration] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const filteredCollaborations = collaborationsData.filter(collab => {
    if (activeTab === "active") return collab.status === "active";
    if (activeTab === "completed") return collab.status === "completed";
    return true; // Show all if "all" tab
  });
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <Clock className="h-4 w-4 text-blue-500" />;
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return null;
    }
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/50">Active</Badge>;
      case "completed":
        return <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/50">Completed</Badge>;
      default:
        return null;
    }
  };
  
  const handleCompleteCollaboration = () => {
    Toast({
      title: "Collaboration Completed"
      
    });
    
    setDialogOpen(false);
  };
  
  const handleBurnCollaboration = () => {
    Toast({
      variant: "destructive",
      title: "Collaboration Terminated"
    });
  };
  
  return (
    <div className="space-y-6">
      <Tabs defaultValue="active" className="w-[400px]" onValueChange={setActiveTab} value={activeTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="all">All</TabsTrigger>
        </TabsList>
      </Tabs>
      
      {filteredCollaborations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCollaborations.map((collab) => (
            <Card key={collab.id} className="overflow-hidden bg-card/50 backdrop-blur-sm hover:shadow-md hover:bg-card/70 transition-all">
              <div className="aspect-video relative">
                <Image
                  src={collab.nftImage}
                  alt={collab.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-3 right-3">
                  {getStatusBadge(collab.status)}
                </div>
              </div>
              
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{collab.title}</CardTitle>
                    <CardDescription>{collab.category}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pb-2">
                <div className="flex items-center mb-4">
                  <div className="h-8 w-8 rounded-full overflow-hidden relative mr-2">
                    <Image
                      src={collab.partner.image}
                      alt={collab.partner.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className="text-sm">with {collab.partner.name}</span>
                </div>
                
                <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                  {collab.description}
                </p>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground mt-4">
                  <div className="flex items-center">
                    {getStatusIcon(collab.status)}
                    <span className="ml-1">
                      {collab.status === "active" ? "Ends" : "Ended"}: {collab.endDate}
                    </span>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="border-t pt-3">
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => {
                    setSelectedCollaboration(collab);
                    setDialogOpen(true);
                  }}
                >
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No collaborations found with the selected status.</p>
        </div>
      )}
      
      {selectedCollaboration && (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{selectedCollaboration.title}</DialogTitle>
              <DialogDescription className="flex items-center">
                {getStatusBadge(selectedCollaboration.status)}
                <span className="ml-2">{selectedCollaboration.category}</span>
              </DialogDescription>
            </DialogHeader>
            
            <div className="aspect-video relative rounded-md overflow-hidden my-4">
              <Image
                src={selectedCollaboration.nftImage}
                alt={selectedCollaboration.title}
                fill
                className="object-cover"
              />
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full overflow-hidden relative mr-3">
                  <Image
                    src={selectedCollaboration.partner.image}
                    alt={selectedCollaboration.partner.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium">Collaboration with {selectedCollaboration.partner.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {selectedCollaboration.startDate} - {selectedCollaboration.endDate}
                  </p>
                </div>
              </div>
              
              <p className="text-sm">{selectedCollaboration.description}</p>
              
              <div className="bg-muted p-3 rounded-md text-sm">
                <h4 className="font-medium mb-1">Collaboration NFT</h4>
                <p className="text-muted-foreground">
                  This NFT serves as proof of your collaboration and contributes to your social credit score.
                </p>
              </div>
            </div>
            
            <DialogFooter className="gap-2 sm:gap-0">
              {selectedCollaboration.status === "active" && (
                <>
                  <Button
                    variant="outline"
                    onClick={handleCompleteCollaboration}
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Complete
                  </Button>
                  
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive">
                        <Flame className="mr-2 h-4 w-4" />
                        Terminate
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Terminating this collaboration will burn the collaboration NFT and may negatively impact your social credit score.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleBurnCollaboration}>
                          Confirm Termination
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}