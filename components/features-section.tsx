"use client";

import { motion } from "framer-motion";
import { 
  Award, 
  Gem, 
  FileCheck, 
  Flame, 
  Zap, 
  BarChart3,
  BadgeCheck, 
  Lock
} from "lucide-react";

const features = [
  {
    icon: <Gem className="h-10 w-10" />,
    title: "Social NFT Minting",
    description: "Transform your social media accounts into valuable NFTs that represent your digital identity and influence"
  },
  {
    icon: <FileCheck className="h-10 w-10" />,
    title: "Categorized Content",
    description: "Create focused categories for your NFTs to better organize your digital presence and reach targeted audiences"
  },
  {
    icon: <Flame className="h-10 w-10" />,
    title: "Collaboration Platform",
    description: "Connect with projects and other creators to build meaningful partnerships authenticated with NFTs"
  },
  {
    icon: <BarChart3 className="h-10 w-10" />,
    title: "Social Credit Scoring",
    description: "Build your reputation through verified collaborations and earn a transparent social credit score"
  },
  {
    icon: <Award className="h-10 w-10" />,
    title: "Creator Leaderboard",
    description: "Compete for recognition as your influence and collaboration history grows within the ecosystem"
  },
  {
    icon: <BadgeCheck className="h-10 w-10" />,
    title: "Verified Collaborations",
    description: "Mint, vault, and burn collaboration NFTs as proof of partnerships between creators and projects"
  },
  {
    icon: <Lock className="h-10 w-10" />,
    title: "Secure Wallet Integration",
    description: "Connect with Sui wallet for seamless transactions and NFT management with full security"
  },
  {
    icon: <Zap className="h-10 w-10" />,
    title: "Creator Analytics",
    description: "Access detailed insights about your performance, engagement, and social credit metrics"
  }
];

export function FeaturesSection() {
  return (
    <section className="py-20 bg-black/20">
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Powerful Tools for Creators
          </h2>
          <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to build your reputation, connect with opportunities, and maximize your creator potential.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="flex flex-col items-center text-center p-6 rounded-xl bg-card/30 border border-border/50 backdrop-blur-sm hover:bg-card/50 transition-colors"
            >
              <div className="mb-4 p-3 rounded-full bg-primary/10 text-primary">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}