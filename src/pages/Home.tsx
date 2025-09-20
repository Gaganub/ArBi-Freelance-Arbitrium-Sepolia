import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PostJobDialog } from "@/components/PostJobDialog";
import { Link } from "react-router-dom";
import { Shield, Zap, Users, ArrowRight, Code, Coins, Vote, Plus } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-accent/5 to-background py-24">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
        <div className="container relative mx-auto px-4 text-center">
          <div className="mx-auto max-w-4xl">
            <h1 className="mb-6 text-5xl font-bold tracking-tight lg:text-7xl animate-fade-in">
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-glow">
                Decentralized
              </span>
              <br />
              Freelance Platform
            </h1>
            <p className="mb-8 text-xl text-muted-foreground lg:text-2xl animate-slide-up">
              Secure escrow smart contracts on Arbitrum. Zero disputes, instant payments, 
              and community-driven resolution for the future of freelance work.
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center animate-scale-in">
              <Button size="lg" className="group interactive-scale hover-glow" asChild>
                <Link to="/jobs">
                  Browse Jobs
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <PostJobDialog>
                <Button size="lg" variant="outline" className="interactive-scale hover-glow">
                  <Plus className="mr-2 h-4 w-4" />
                  Post a Job
                </Button>
              </PostJobDialog>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold lg:text-4xl animate-fade-in">
              Built on <span className="text-primary animate-glow">Arbitrum</span>
            </h2>
            <p className="text-lg text-muted-foreground animate-slide-up">
              Leveraging smart contracts for transparent, secure, and efficient freelance transactions
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            <Card className="group hover-lift hover-glow transition-all duration-300 animate-fade-in" style={{ animationDelay: '100ms' }}>
              <CardHeader>
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-300 animate-float">
                  <Shield className="h-6 w-6" />
                </div>
                <CardTitle className="group-hover:text-primary transition-colors duration-200">Secure Escrow</CardTitle>
                <CardDescription>
                  USDC funds are locked in smart contracts until job completion, ensuring payment security for both parties.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="group hover-lift hover-glow transition-all duration-300 animate-fade-in" style={{ animationDelay: '200ms' }}>
              <CardHeader>
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent group-hover:scale-110 transition-transform duration-300 animate-float" style={{ animationDelay: '0.5s' }}>
                  <Zap className="h-6 w-6" />
                </div>
                <CardTitle className="group-hover:text-accent transition-colors duration-200">Instant Releases</CardTitle>
                <CardDescription>
                  Payments are released instantly upon job completion confirmation, with no intermediary delays.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="group hover-lift hover-glow transition-all duration-300 animate-fade-in" style={{ animationDelay: '300ms' }}>
              <CardHeader>
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-info/10 text-info group-hover:scale-110 transition-transform duration-300 animate-float" style={{ animationDelay: '1s' }}>
                  <Vote className="h-6 w-6" />
                </div>
                <CardTitle className="group-hover:text-info transition-colors duration-200">Community Disputes</CardTitle>
                <CardDescription>
                  Fair dispute resolution through community voting, ensuring transparent and democratic outcomes.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-muted/30 py-24">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold lg:text-4xl animate-fade-in">How It Works</h2>
            <p className="text-lg text-muted-foreground animate-slide-up">
              Simple, secure, and transparent freelance workflow
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-4">
            <div className="text-center animate-fade-in" style={{ animationDelay: '100ms' }}>
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-xl font-bold hover:scale-110 transition-transform duration-300 animate-pulse-glow">
                1
              </div>
              <h3 className="mb-2 text-xl font-semibold">Post Job</h3>
              <p className="text-muted-foreground">
                Client deposits USDC into escrow smart contract with job details
              </p>
            </div>
            
            <div className="text-center animate-fade-in" style={{ animationDelay: '200ms' }}>
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-accent text-accent-foreground text-xl font-bold hover:scale-110 transition-transform duration-300">
                2
              </div>
              <h3 className="mb-2 text-xl font-semibold">Accept Work</h3>
              <p className="text-muted-foreground">
                Freelancer accepts the job, locking their address to the contract
              </p>
            </div>
            
            <div className="text-center animate-fade-in" style={{ animationDelay: '300ms' }}>
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-info text-info-foreground text-xl font-bold hover:scale-110 transition-transform duration-300">
                3
              </div>
              <h3 className="mb-2 text-xl font-semibold">Complete & Review</h3>
              <p className="text-muted-foreground">
                Work is delivered and reviewed by the client for approval
              </p>
            </div>
            
            <div className="text-center animate-fade-in" style={{ animationDelay: '400ms' }}>
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-success text-success-foreground text-xl font-bold hover:scale-110 transition-transform duration-300">
                4
              </div>
              <h3 className="mb-2 text-xl font-semibold">Get Paid</h3>
              <p className="text-muted-foreground">
                Funds are instantly released to freelancer upon client approval
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center animate-fade-in" style={{ animationDelay: '100ms' }}>
              <div className="mb-2 text-4xl font-bold text-primary hover:scale-110 transition-transform duration-300">$2.5M+</div>
              <div className="text-muted-foreground">Total Volume Secured</div>
            </div>
            <div className="text-center animate-fade-in" style={{ animationDelay: '200ms' }}>
              <div className="mb-2 text-4xl font-bold text-accent hover:scale-110 transition-transform duration-300">1,247</div>
              <div className="text-muted-foreground">Jobs Completed</div>
            </div>
            <div className="text-center animate-fade-in" style={{ animationDelay: '300ms' }}>
              <div className="mb-2 text-4xl font-bold text-info hover:scale-110 transition-transform duration-300">99.2%</div>
              <div className="text-muted-foreground">Success Rate</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}