import Link from "next/link";
import { Gem } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1 flex flex-col">
            <div className="flex items-center space-x-2">
              <Gem className="h-6 w-6 text-primary" />
              <span className="font-bold">CreatorHub</span>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Mint your social media presence, collaborate on projects, and build your creator credit score.
            </p>
          </div>
          <div className="md:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Platform</h4>
              <ul className="space-y-2">
                <li><Link href="/" className="text-sm text-muted-foreground hover:text-foreground">Home</Link></li>
                <li><Link href="/creators" className="text-sm text-muted-foreground hover:text-foreground">Creators</Link></li>
                <li><Link href="/leaderboard" className="text-sm text-muted-foreground hover:text-foreground">Leaderboard</Link></li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Features</h4>
              <ul className="space-y-2">
                <li><Link href="/mint" className="text-sm text-muted-foreground hover:text-foreground">Mint NFT</Link></li>
                <li><Link href="/collaborate" className="text-sm text-muted-foreground hover:text-foreground">Collaborate</Link></li>
                <li><Link href="/profile" className="text-sm text-muted-foreground hover:text-foreground">Profile</Link></li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Legal</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Terms</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Privacy</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-6 flex flex-col md:flex-row items-center justify-between">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} CreatorHub. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-4">
            <Link href="#" className="text-xs text-muted-foreground hover:text-foreground">
              Twitter
            </Link>
            <Link href="#" className="text-xs text-muted-foreground hover:text-foreground">
              Discord
            </Link>
            <Link href="#" className="text-xs text-muted-foreground hover:text-foreground">
              GitHub
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}