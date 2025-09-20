import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PostJobDialog } from "@/components/PostJobDialog";
import { Link } from "react-router-dom";
import { Shield, Zap, Vote, ArrowRight, Plus } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0b1a] relative overflow-hidden">
      {/* Cosmic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a0b3b] via-[#0a0b1a] to-[#2a1b5a] animate-gradient-pulse">
        {/* Starfield Layers */}
        <div className="absolute inset-0 starfield-layer-1 animate-starfield-slow" />
        <div className="absolute inset-0 starfield-layer-2 animate-starfield-medium" />
        <div className="absolute inset-0 starfield-layer-3 animate-starfield-fast" />
        {/* Nebula */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_rgba(104,36,191,0.4)_0%,_transparent_50%),_radial-gradient(circle_at_70%_80%,_rgba(36,191,191,0.4)_0%,_transparent_50%)] animate-nebula-pulse" />
        {/* Cosmic Particles */}
        <div className="absolute inset-0 particle-layer animate-particle-drift" />
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
      </div>

      <style>{`
        /* Starfield Layers */
        .starfield-layer-1, .starfield-layer-2, .starfield-layer-3 {
          background: transparent;
          position: absolute;
          inset: 0;
        }
        .starfield-layer-1::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px);
          background-size: 100px 100px;
          background-position: 0 0;
          opacity: 0.2;
        }
        .starfield-layer-2::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle, rgba(255,255,255,0.6) 0.8px, transparent 0.8px);
          background-size: 80px 80px;
          background-position: 20px 20px;
          opacity: 0.3;
        }
        .starfield-layer-3::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle, rgba(255,255,255,0.4) 0.6px, transparent 0.6px);
          background-size: 60px 60px;
          background-position: 40px 40px;
          opacity: 0.4;
        }
        /* Particle Layer */
        .particle-layer::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle, rgba(36,191,191,0.5) 1px, transparent 1px),
                      radial-gradient(circle, rgba(104,36,191,0.5) 1px, transparent 1px);
          background-size: 200px 200px, 150px 150px;
          background-position: 0 0, 50px 50px;
          opacity: 0.3;
        }
        /* Animations */
        @keyframes gradient-pulse {
          0% { background-position: 0% 50%; opacity: 1; }
          50% { background-position: 100% 50%; opacity: 0.8; }
          100% { background-position: 0% 50%; opacity: 1; }
        }
        @keyframes starfield-slow {
          0% { transform: translateY(0); }
          100% { transform: translateY(-100px); }
        }
        @keyframes starfield-medium {
          0% { transform: translateY(0); }
          100% { transform: translateY(-200px); }
        }
        @keyframes starfield-fast {
          0% { transform: translateY(0); }
          100% { transform: translateY(-300px); }
        }
        @keyframes nebula-pulse {
          0% { 
            background-position: 30% 20%, 70% 80%; 
            opacity: 0.4; 
            transform: scale(1);
          }
          50% { 
            background-position: 35% 25%, 65% 75%; 
            opacity: 0.6; 
            transform: scale(1.05);
          }
          100% { 
            background-position: 30% 20%, 70% 80%; 
            opacity: 0.4; 
            transform: scale(1);
          }
        }
        @keyframes particle-drift {
          0% { 
            background-position: 0 0, 50px 50px; 
            opacity: 0.3; 
            transform: translateX(0);
          }
          50% { 
            background-position: 10px 10px, 60px 60px; 
            opacity: 0.5; 
            transform: translateX(20px);
          }
          100% { 
            background-position: 0 0, 50px 50px; 
            opacity: 0.3; 
            transform: translateX(0);
          }
        }
        @keyframes cosmic-glow {
          0% { text-shadow: 0 0 5px rgba(104, 36, 191, 0.5); }
          50% { text-shadow: 0 0 15px rgba(36, 191, 191, 0.7); }
          100% { text-shadow: 0 0 5px rgba(104, 36, 191, 0.5); }
        }
        .animate-gradient-pulse {
          background-size: 200% 200%;
          animation: gradient-pulse 15s ease infinite;
        }
        .animate-starfield-slow {
          animation: starfield-slow 60s linear infinite;
        }
        .animate-starfield-medium {
          animation: starfield-medium 40s linear infinite;
        }
        .animate-starfield-fast {
          animation: starfield-fast 20s linear infinite;
        }
        .animate-nebula-pulse {
          animation: nebula-pulse 25s ease-in-out infinite;
        }
        .animate-particle-drift {
          animation: particle-drift 10s ease-in-out infinite;
        }
        .cosmic-glow {
          animation: cosmic-glow 3s ease-in-out infinite;
        }
        .hover-glow:hover {
          box-shadow: 0 0 20px rgba(36, 191, 191, 0.5);
          transform: translateY(-2px);
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative py-24">
        <div className="container relative mx-auto px-4 text-center">
          <div className="mx-auto max-w-4xl">
            <h1 className="mb-6 text-5xl font-bold tracking-tight lg:text-7xl animate-fade-in text-white cosmic-glow">
              <span className="bg-gradient-to-r from-[#6824bf] via-[#24bfbf] to-[#6824bf] bg-clip-text text-transparent">
                Decentralized
              </span>
              <br />
              Freelance Platform
            </h1>
            <p className="mb-8 text-xl text-gray-200 lg:text-2xl animate-slide-up">
              Secure escrow smart contracts on Arbitrum. Zero disputes, instant payments, 
              and community-driven resolution for the future of freelance work.
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center animate-scale-in">
              <Button size="lg" className="group bg-[#6824bf] text-white hover:bg-[#7b3fe4] hover-glow transition-all duration-300" asChild>
                <Link to="/jobs">
                  Browse Jobs
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>

              <PostJobDialog>
                <Button size="lg" variant="outline" className="bg-transparent border-[#24bfbf] text-[#24bfbf] hover:bg-[#24bfbf]/20 hover-glow transition-all duration-300">
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
            <h2 className="mb-4 text-3xl font-bold lg:text-4xl animate-fade-in text-white cosmic-glow">
              Built on <span className="text-[#24bfbf]">Arbitrum</span>
            </h2>
            <p className="text-lg text-gray-300 animate-slide-up">
              Leveraging smart contracts for transparent, secure, and efficient freelance transactions
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            <Card className="group bg-[#1a0b3b]/80 backdrop-blur-sm border-[#6824bf]/50 hover-glow transition-all duration-300 animate-fade-in" style={{ animationDelay: '100ms' }}>
              <CardHeader>
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[#6824bf]/20 text-[#6824bf] group-hover:scale-110 transition-transform duration-300 animate-float">
                  <Shield className="h-6 w-6" />
                </div>
                <CardTitle className="group-hover:text-[#24bfbf] transition-colors duration-200 text-white cosmic-glow">Secure Escrow</CardTitle>
                <CardDescription className="text-gray-300">
                  USDC funds are locked in smart contracts until job completion, ensuring payment security for both parties.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="group bg-[#1a0b3b]/80 backdrop-blur-sm border-[#6824bf]/50 hover-glow transition-all duration-300 animate-fade-in" style={{ animationDelay: '200ms' }}>
              <CardHeader>
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[#24bfbf]/20 text-[#24bfbf] group-hover:scale-110 transition-transform duration-300 animate-float">
                  <Zap className="h-6 w-6" />
                </div>
                <CardTitle className="group-hover:text-[#24bfbf] transition-colors duration-200 text-white cosmic-glow">Instant Releases</CardTitle>
                <CardDescription className="text-gray-300">
                  Payments are released instantly upon job completion confirmation, with no intermediary delays.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="group bg-[#1a0b3b]/80 backdrop-blur-sm border-[#6824bf]/50 hover-glow transition-all duration-300 animate-fade-in" style={{ animationDelay: '300ms' }}>
              <CardHeader>
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[#6824bf]/20 text-[#6824bf] group-hover:scale-110 transition-transform duration-300 animate-float">
                  <Vote className="h-6 w-6" />
                </div>
                <CardTitle className="group-hover:text-[#24bfbf] transition-colors duration-200 text-white cosmic-glow">Community Disputes</CardTitle>
                <CardDescription className="text-gray-300">
                  Fair dispute resolution through community voting, ensuring transparent and democratic outcomes.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}