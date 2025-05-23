"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Toast} from "@/components/ui/toast";
import { Twitter, Instagram, Youtube, Edit, Check, Copy, ExternalLink } from "lucide-react";
import { useWallet } from "@/hooks/use-wallet";

// Mock data - would be fetched from API in real implementation
const profileData = {
  name: "Alex Morgan",
  handle: "@alexmorganart",
  avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  banner: "https://images.pexels.com/photos/1762851/pexels-photo-1762851.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  bio: "Digital artist exploring the intersection of art and technology. Creating unique NFTs and collaborating on Web3 projects.",
  category: "Digital Art",
  score: 9.8,
  platforms: [
    { type: "twitter", url: "https://twitter.com/alexmorganart" },
    { type: "instagram", url: "https://instagram.com/alexmorganart" }
  ],
  nfts: 12,
  collaborations: 28,
  joined: "January 15, 2025"
};

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  handle: z.string().min(2, "Handle must be at least 2 characters"),
  bio: z.string().max(280, "Bio must be 280 characters or less"),
  category: z.string(),
  avatarUrl: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  bannerUrl: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
});

export function ProfileDisplay() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { address } = useWallet();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: profileData.name,
      handle: profileData.handle,
      bio: profileData.bio,
      category: profileData.category.toLowerCase().replace(/\s+/g, "-"),
      avatarUrl: profileData.avatar,
      bannerUrl: profileData.banner,
    },
  });
  
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    
    Toast({
      title: "Profile updated"
    });
    
    setDialogOpen(false);
  }
  
  const getPlatformIcon = (type: string) => {
    switch (type) {
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
  
  const truncateAddress = (addr: string) => {
    if (!addr) return "";
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };
  
  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      Toast({
        title: "Address copied to clipboard"
      });
    }
  };
  
  return (
    <Card className="overflow-hidden bg-card/50 backdrop-blur-sm relative">
      <div className="h-32 relative">
        <Image
          src={profileData.banner}
          alt="Profile banner"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/90" />
      </div>
      
      <CardHeader className="pt-0">
        <div className="flex justify-between -mt-12 relative z-10">
          <Avatar className="h-24 w-24 border-4 border-background">
            <AvatarImage src={profileData.avatar} alt={profileData.name} />
            <AvatarFallback>{profileData.name.charAt(0)}</AvatarFallback>
          </Avatar>
          
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon">
                <Edit className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogDescription>
                  Update your profile information visible to other creators and projects.
                </DialogDescription>
              </DialogHeader>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Display Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="handle"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Handle</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bio</FormLabel>
                        <FormControl>
                          <Textarea 
                            {...field}
                            className="resize-none h-20"
                          />
                        </FormControl>
                        <FormDescription>
                          Maximum 280 characters
                        </FormDescription>
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
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="avatarUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Avatar URL</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="bannerUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Banner URL</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <DialogFooter>
                    <Button type="submit">
                      <Check className="mr-2 h-4 w-4" />
                      Save Changes
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="mt-2">
          <CardTitle>{profileData.name}</CardTitle>
          <CardDescription>{profileData.handle}</CardDescription>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-sm">{profileData.bio}</p>
        
        <div className="flex items-center space-x-2">
          <Badge variant="secondary">{profileData.category}</Badge>
          <Badge variant="outline" className="flex items-center">
            <div className="bg-amber-500 w-2 h-2 rounded-full mr-1"></div>
            Score: {profileData.score}
          </Badge>
        </div>
        
        <div className="pt-2">
          <h4 className="text-sm font-medium mb-2">Connected Platforms</h4>
          <div className="flex flex-wrap gap-2">
            {profileData.platforms.map((platform, index) => (
              <Button key={index} variant="outline" size="sm" className="h-8" asChild>
                <a href={platform.url} target="_blank" rel="noopener noreferrer">
                  {getPlatformIcon(platform.type)}
                  <span className="ml-2 capitalize">{platform.type}</span>
                </a>
              </Button>
            ))}
          </div>
        </div>
        
        <div className="pt-2">
          <h4 className="text-sm font-medium mb-2">Wallet Address</h4>
          <div className="flex items-center space-x-2">
            <div className="bg-muted p-2 rounded text-xs font-mono flex-1 truncate">
              {address}
            </div>
            <Button variant="ghost" size="icon" onClick={copyAddress}>
              <Copy className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="border-t flex justify-between text-sm text-muted-foreground pt-4">
        <div>Joined: {profileData.joined}</div>
        <div>
          {profileData.nfts} NFTs · {profileData.collaborations} Collaborations
        </div>
      </CardFooter>
    </Card>
  );
}