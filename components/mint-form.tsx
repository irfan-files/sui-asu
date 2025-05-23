"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Toast } from "@/components/ui/toast";
import { useWallet } from "@/hooks/use-wallet";
import { Loader2, Check, Twitter, Instagram, Youtube, Send } from "lucide-react";

const formSchema = z.object({
  platform: z.string().min(1, { message: "Please select a platform" }),
  accountUrl: z.string().url({ message: "Please enter a valid URL" }),
  displayName: z.string().min(2, { message: "Display name must be at least 2 characters" }),
  username: z.string().min(2, { message: "Username must be at least 2 characters" }),
  category: z.string().min(1, { message: "Please select a category" }),
  bio: z.string().max(280, { message: "Bio must be 280 characters or less" }).optional(),
  avatarUrl: z.string().url({ message: "Please enter a valid URL" }).optional(),
  bannerUrl: z.string().url({ message: "Please enter a valid URL" }).optional(),
});

export function MintForm() {
  const { address } = useWallet();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      platform: "",
      accountUrl: "",
      displayName: "",
      username: "",
      category: "",
      bio: "",
      avatarUrl: "",
      bannerUrl: "",
    },
  });
  
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log("Form submitted:", values);
      
      Toast({
        title: "NFT Minting Successful"
        
      });
      
      // Reset form and step
      form.reset();
      setStep(1);
    } catch (error) {
      Toast({
        variant: "destructive",
        title: "Minting Failed"
      });
    } finally {
      setIsSubmitting(false);
    }
  }
  
  const platformIcons = {
    twitter: <Twitter className="h-5 w-5" />,
    instagram: <Instagram className="h-5 w-5" />,
    youtube: <Youtube className="h-5 w-5" />,
  };
  
  return (
    <Card className="bg-card/70 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Mint Your Creator NFT</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {step === 1 && (
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="platform"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Platform</FormLabel>
                      <FormDescription>
                        Select the social media platform to mint as an NFT
                      </FormDescription>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="grid grid-cols-3 gap-4"
                      >
                        {Object.entries(platformIcons).map(([key, icon]) => (
                          <FormItem key={key}>
                            <FormLabel className="cursor-pointer [&:has([data-state=checked])>div]:border-primary [&:has([data-state=checked])>div]:bg-primary/10">
                              <FormControl>
                                <RadioGroupItem
                                  value={key}
                                  className="sr-only"
                                />
                              </FormControl>
                              <div className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground">
                                {icon}
                                <span className="mt-2 capitalize">{key}</span>
                              </div>
                            </FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="accountUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Account URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://twitter.com/yourusername" {...field} />
                      </FormControl>
                      <FormDescription>
                        Enter the URL to your social media profile
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="button" 
                  onClick={() => {
                    form.trigger(["platform", "accountUrl"]);
                    const platformValid = form.getFieldState("platform").invalid === false;
                    const urlValid = form.getFieldState("accountUrl").invalid === false;
                    
                    if (platformValid && urlValid) {
                      setStep(2);
                    }
                  }}
                  className="w-full"
                >
                  Continue
                </Button>
              </div>
            )}
            
            {step === 2 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="displayName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Display Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your Name or Brand" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input placeholder="@yourusername" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
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
                          <SelectItem value="fashion">Fashion</SelectItem>
                          <SelectItem value="education">Education</SelectItem>
                          <SelectItem value="finance">Finance</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Choose the primary focus of your content
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell others about yourself and your content..."
                          className="resize-none h-20"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Maximum 280 characters
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
                  <Button type="button" variant="outline" onClick={() => setStep(1)} className="md:w-1/2">
                    Back
                  </Button>
                  <Button 
                    type="button" 
                    onClick={() => {
                      form.trigger(["displayName", "username", "category"]);
                      const nameValid = form.getFieldState("displayName").invalid === false;
                      const usernameValid = form.getFieldState("username").invalid === false;
                      const categoryValid = form.getFieldState("category").invalid === false;
                      
                      if (nameValid && usernameValid && categoryValid) {
                        setStep(3);
                      }
                    }}
                    className="md:w-1/2"
                  >
                    Continue
                  </Button>
                </div>
              </div>
            )}
            
            {step === 3 && (
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="avatarUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Avatar Image URL (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com/your-avatar.jpg" {...field} />
                      </FormControl>
                      <FormDescription>
                        Provide a URL to your profile image
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="bannerUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Banner Image URL (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com/your-banner.jpg" {...field} />
                      </FormControl>
                      <FormDescription>
                        Provide a URL to your banner image
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="p-4 bg-muted rounded-md">
                  <h4 className="font-semibold mb-2">Connected Wallet</h4>
                  <p className="text-sm text-muted-foreground mb-1">NFT will be minted to:</p>
                  <div className="font-mono text-xs bg-background p-2 rounded border">
                    {address}
                  </div>
                </div>
                
                <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
                  <Button type="button" variant="outline" onClick={() => setStep(2)} className="md:w-1/2">
                    Back
                  </Button>
                  <Button type="submit" disabled={isSubmitting} className="md:w-1/2">
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Minting...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Mint NFT
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}