"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Toast } from "@/components/ui/toast";
import { HandshakeIcon, Users, Sparkles, Clock } from "lucide-react";

// Mock data
const projectsData = [
  {
    id: "project-001",
    title: "DeFi Dashboard",
    category: "Finance",
    description: "Building a comprehensive dashboard for DeFi protocols with real-time data visualization.",
    image: "https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    creator: {
      name: "Blockchain Builders",
      avatar: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    duration: "3 months",
    compensation: "5 SUI + Revenue Share",
    applicants: 12
  },
  {
    id: "project-002",
    title: "NFT Collection Launch",
    category: "Art",
    description: "Seeking digital artists to collaborate on a new generative art NFT collection with 10,000 unique pieces.",
    image: "https://images.pexels.com/photos/2694434/pexels-photo-2694434.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    creator: {
      name: "MetaArt Studios",
      avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    duration: "2 months",
    compensation: "Revenue Split (70/30)",
    applicants: 34
  },
  {
    id: "project-003",
    title: "Web3 Educational Series",
    category: "Education",
    description: "Creating an educational video series explaining Web3 concepts for beginners with animated explainers.",
    image: "https://images.pexels.com/photos/4145354/pexels-photo-4145354.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    creator: {
      name: "Crypto Learn",
      avatar: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    duration: "6 months",
    compensation: "10 SUI + Attribution",
    applicants: 8
  },
  {
    id: "project-004",
    title: "Metaverse Concert",
    category: "Music",
    description: "Organizing a virtual concert in the metaverse featuring multiple artists and interactive elements.",
    image: "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    creator: {
      name: "Virtual Venues",
      avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    duration: "1 month",
    compensation: "Profit Sharing",
    applicants: 21
  }
];

const creatorsData = [
  {
    id: "creator-005",
    name: "Elena Lopez",
    category: "Food & Cooking",
    looking: "Food content creators for a cookbook NFT project",
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    score: 9.0,
    collaborations: 22
  },
  {
    id: "creator-006",
    name: "James Wilson",
    category: "Photography",
    looking: "Collaboration with creators to develop a photo editing preset collection",
    image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    score: 8.9,
    collaborations: 15
  },
  {
    id: "creator-007",
    name: "Priya Patel",
    category: "Technology",
    looking: "Tech reviewers for a new hardware testing series",
    image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    score: 8.7,
    collaborations: 27
  }
];

const formSchema = z.object({
  projectName: z.string().min(2, "Project name must be at least 2 characters"),
  category: z.string().min(1, "Please select a category"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  duration: z.string().min(1, "Please specify the duration"),
  compensation: z.string().min(1, "Please specify the compensation"),
});

export function CollaborationHub() {
  const [activeTab, setActiveTab] = useState("projects");
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectName: "",
      category: "",
      description: "",
      duration: "",
      compensation: "",
    },
  });
  
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    
    Toast({
      title: "Collaboration proposal created"
      
    });
    
    setDialogOpen(false);
    form.reset();
  }
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Tabs defaultValue="projects" className="w-[400px]" onValueChange={setActiveTab} value={activeTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="creators">Creators</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <HandshakeIcon className="mr-2 h-4 w-4" />
              Create Proposal
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create a Collaboration Proposal</DialogTitle>
              <DialogDescription>
                Define the details of your collaboration project to find the right partners.
              </DialogDescription>
            </DialogHeader>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="projectName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., NFT Collection Launch" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="art">Art</SelectItem>
                          <SelectItem value="music">Music</SelectItem>
                          <SelectItem value="gaming">Gaming</SelectItem>
                          <SelectItem value="defi">DeFi</SelectItem>
                          <SelectItem value="education">Education</SelectItem>
                          <SelectItem value="technology">Technology</SelectItem>
                          <SelectItem value="metaverse">Metaverse</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe your project and what kind of collaborators you're looking for..."
                          className="resize-none h-24"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Duration</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 2 months" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="compensation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Compensation</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 5 SUI + Revenue Share" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <DialogFooter>
                  <Button type="submit">Create Proposal</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      
      <TabsContent value="projects" className="mt-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projectsData.map((project) => (
            <Card key={project.id} className="overflow-hidden bg-card/50 backdrop-blur-sm hover:shadow-md hover:bg-card/70 transition-all">
              <div className="aspect-video relative">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <Badge variant="outline" className="bg-background/30 backdrop-blur-sm">
                    {project.category}
                  </Badge>
                  <h3 className="text-xl font-semibold mt-2 text-white">{project.title}</h3>
                </div>
              </div>
              
              <CardContent className="pt-4">
                <div className="flex items-center mb-4">
                  <div className="h-8 w-8 rounded-full overflow-hidden relative mr-2">
                    <Image
                      src={project.creator.avatar}
                      alt={project.creator.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className="text-sm">{project.creator.name}</span>
                </div>
                
                <p className="text-sm text-muted-foreground mb-4">
                  {project.description}
                </p>
                
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                    {project.duration}
                  </div>
                  <div className="flex items-center">
                    <Sparkles className="h-4 w-4 mr-2 text-muted-foreground" />
                    {project.compensation}
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="flex justify-between border-t pt-4 text-sm">
                <div className="flex items-center text-muted-foreground">
                  <Users className="h-4 w-4 mr-1" />
                  {project.applicants} applicants
                </div>
                <Button size="sm">Apply</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </TabsContent>
      
      <TabsContent value="creators" className="mt-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {creatorsData.map((creator) => (
            <Card key={creator.id} className="bg-card/50 backdrop-blur-sm hover:shadow-md hover:bg-card/70 transition-all">
              <CardHeader className="pb-2">
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 rounded-full overflow-hidden relative">
                    <Image
                      src={creator.image}
                      alt={creator.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{creator.name}</CardTitle>
                    <CardDescription>{creator.category}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pb-2">
                <p className="text-sm mb-4">
                  {creator.looking}
                </p>
                
                <div className="flex justify-between text-sm text-muted-foreground">
                  <div>Score: {creator.score}</div>
                  <div>{creator.collaborations} collabs</div>
                </div>
              </CardContent>
              
              <CardFooter>
                <Button variant="outline" className="w-full">Connect</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </TabsContent>
    </div>
  );
}