import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { Search, Clock, DollarSign, Plus } from "lucide-react";
import { useJobStore } from "./jobStore";
import { PostJobDialog } from "./PostJobDialog";

// Define Job interface
interface Job {
  id: number;
  title: string;
  description: string;
  budget: string;
  currency: string;
  duration: string;
  status: "open" | "in-progress" | "completed";
  skills: string[];
  client: string;
  posted: string;
  createdAt: Date;
}

// Mock jobStore for testing
const jobTitles = [
  "Smart Contract Development",
  "Frontend UI/UX Design",
  "Tokenomics Consultation",
  "NFT Marketplace Backend",
  "DeFi Protocol Audit",
  "Web3 Wallet Integration",
  "Blockchain Game Development",
  "DAO Governance Tool",
  "Cross-Chain Bridge",
  "Yield Farming Optimizer",
];

const descriptions = [
  "Develop a secure ERC-20 token contract with staking features.",
  "Design a responsive UI for a decentralized application.",
  "Consult on token economics for a new DeFi project.",
  "Build a scalable backend for an NFT marketplace.",
  "Audit smart contracts for security vulnerabilities.",
  "Integrate wallet functionality with MetaMask and WalletConnect.",
  "Create a blockchain-based game with NFT integration.",
  "Develop a governance tool for decentralized organizations.",
  "Implement a cross-chain bridge for Ethereum and Polygon.",
  "Optimize yield farming strategies for maximum returns.",
];

const skillsList = [
  "Solidity",
  "React",
  "TypeScript",
  "Node.js",
  "Web3.js",
  "UI/UX",
  "DeFi",
  "NFT",
  "Ethereum",
  "Polygon",
];

const getRandomElement = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

const generateJobs = (count: number): Job[] => {
  const jobs: Job[] = [];
  for (let i = 1; i <= count; i++) {
    jobs.push({
      id: i,
      title: getRandomElement(jobTitles),
      description: getRandomElement(descriptions),
      budget: `${Math.floor(Math.random() * 5000) + 1000}`,
      currency: getRandomElement(["USDC", "ETH", "DAI"]),
      duration: `${Math.floor(Math.random() * 30) + 1} days`,
      status: getRandomElement(["open", "in-progress", "completed"]),
      skills: Array.from({ length: Math.floor(Math.random() * 3) + 1 }, () => getRandomElement(skillsList)),
      client: `0x${Math.random().toString(16).slice(2, 10)}...${Math.random().toString(16).slice(2, 6)}`,
      posted: `${Math.floor(Math.random() * 10) + 1} days ago`,
      createdAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000),
    });
  }
  return jobs;
};

// Mock useJobStore
const useJobStore = () => {
  return { allJobs: generateJobs(50) };
};

const JOBS_PER_PAGE = 6;

export default function Jobs() {
  const { allJobs } = useJobStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("latest");
  const [visibleCount, setVisibleCount] = useState(JOBS_PER_PAGE);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const { toast } = useToast();

  const filteredAndSortedJobs = useMemo(() => {
    if (!allJobs) {
      console.error("allJobs is undefined or null");
      return [];
    }

    let jobs = [...allJobs];

    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      jobs = jobs.filter(
        (job) =>
          job.title.toLowerCase().includes(lowerSearch) ||
          job.description.toLowerCase().includes(lowerSearch) ||
          job.skills.some((skill) => skill.toLowerCase().includes(lowerSearch))
      );
    }

    if (statusFilter !== "all") {
      jobs = jobs.filter((job) => job.status === statusFilter);
    }

    if (sortBy === "latest") {
      jobs.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    } else if (sortBy === "budget-high") {
      jobs.sort((a, b) => parseFloat(b.budget) - parseFloat(a.budget));
    } else if (sortBy === "budget-low") {
      jobs.sort((a, b) => parseFloat(a.budget) - parseFloat(a.budget));
    }

    return jobs;
  }, [allJobs, searchTerm, statusFilter, sortBy]);

  const visibleJobs = filteredAndSortedJobs.slice(0, visibleCount);

  const handleLoadMore = () => {
    console.log("Load More clicked, current visibleCount:", visibleCount, "total jobs:", filteredAndSortedJobs.length);
    setVisibleCount((prev) => {
      const newCount = Math.min(prev + JOBS_PER_PAGE, filteredAndSortedJobs.length);
      console.log("New visibleCount:", newCount);
      return newCount;
    });
  };

  const handleApply = (job: Job) => {
    try {
      toast({
        title: "Application Submitted",
        description: `Your application for "${job.title}" has been sent!`,
      });
      setSelectedJob(null);
    } catch (err) {
      console.error("Error in handleApply:", err);
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0b1a] relative overflow-hidden">
      {/* Web3 Background with Animations */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a0b3b] via-[#0a0b1a] to-[#2a1b5a] animate-gradient-pulse">
        <div className="absolute inset-0 starfield-layer-1 animate-starfield-slow" />
        <div className="absolute inset-0 starfield-layer-2 animate-starfield-medium" />
        <div className="absolute inset-0 starfield-layer-3 animate-starfield-fast" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_rgba(104,36,191,0.4)_0%,_transparent_50%),_radial-gradient(circle_at_70%_80%,_rgba(36,191,191,0.4)_0%,_transparent_50%)] animate-nebula-pulse" />
        <div className="absolute inset-0 particle-layer animate-particle-drift" />
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px] animate-grid-glow" />
      </div>

      <style>{`
        /* Starfield Layers (Decentralized Nodes) */
        .starfield-layer-1::before, .starfield-layer-2::before, .starfield-layer-3::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px);
          background-size: 100px 100px;
          opacity: 0.2;
        }
        .starfield-layer-2::before {
          background-size: 80px 80px;
          opacity: 0.3;
        }
        .starfield-layer-3::before {
          background-size: 60px 60px;
          opacity: 0.4;
        }
        /* Particle Layer (Crypto Transactions) */
        .particle-layer::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle, rgba(36,191,191,0.5) 1px, transparent 1px),
                      radial-gradient(circle, rgba(104,36,191,0.5) 1px, transparent 1px);
          background-size: 200px 200px, 150px 150px;
          opacity: 0.3;
        }
        /* Animations */
        @keyframes gradient-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        @keyframes starfield-slow {
          0% { transform: translateY(0); }
          100% { transform: translateY(-200px); }
        }
        @keyframes starfield-medium {
          0% { transform: translateY(0); }
          100% { transform: translateY(-400px); }
        }
        @keyframes starfield-fast {
          0% { transform: translateY(0); }
          100% { transform: translateY(-600px); }
        }
        @keyframes nebula-pulse {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.1); opacity: 0.6; }
        }
        @keyframes particle-drift {
          0%, 100% { transform: translateX(0); opacity: 0.3; }
          50% { transform: translateX(50px); opacity: 0.5; }
        }
        @keyframes grid-glow {
          0%, 100% { opacity: 0.02; }
          50% { opacity: 0.05; }
        }
        @keyframes web3-glow {
          0%, 100% { box-shadow: 0 0 10px rgba(36,191,191,0.3); }
          50% { box-shadow: 0 0 20px rgba(104,36,191,0.5); }
        }
        .animate-gradient-pulse { animation: gradient-pulse 10s ease infinite; }
        .animate-starfield-slow { animation: starfield-slow 120s linear infinite; }
        .animate-starfield-medium { animation: starfield-medium 80s linear infinite; }
        .animate-starfield-fast { animation: starfield-fast 40s linear infinite; }
        .animate-nebula-pulse { animation: nebula-pulse 15s ease infinite; }
        .animate-particle-drift { animation: particle-drift 8s ease infinite; }
        .animate-grid-glow { animation: grid-glow 5s ease infinite; }
        .web3-glow { animation: web3-glow 2s ease infinite; }
        .hover-web3-glow:hover {
          box-shadow: 0 0 20px rgba(36,191,191,0.5);
          transform: translateY(-2px);
        }
      `}</style>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="mb-4 text-3xl font-bold text-white">Browse Jobs</h1>
            <p className="text-gray-300">
              Find your next freelance opportunity on the decentralized web
            </p>
          </div>
          <PostJobDialog>
            <Button size="lg" className="bg-[#24bfbf] hover:bg-[#3adada] web3-glow">
              <Plus className="mr-2 h-4 w-4" />
              Post Job
            </Button>
          </PostJobDialog>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-300" />
            <Input 
              placeholder="Search jobs, skills, or keywords..." 
              className="pl-10 bg-gray-800 border-[#24bfbf] text-white placeholder-gray-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-48 bg-gray-800 border-[#24bfbf] text-white">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Jobs</SelectItem>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full sm:w-48 bg-gray-800 border-[#24bfbf] text-white">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="latest">Latest</SelectItem>
              <SelectItem value="budget-high">Highest Budget</SelectItem>
              <SelectItem value="budget-low">Lowest Budget</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {filteredAndSortedJobs.length === 0 ? (
          <div className="text-center text-gray-300">
            No jobs found. Try adjusting your search or filters.
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {visibleJobs.map((job, index) => (
              <Card 
                key={job.id} 
                className="group bg-gray-800/80 backdrop-blur-sm border-[#24bfbf]/50 hover-web3-glow transition-all duration-300 animate-fade-in text-white"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <CardTitle className="group-hover:text-[#24bfbf] transition-colors duration-200">
                        {job.title}
                      </CardTitle>
                      <div className="flex items-center gap-4 text-sm text-gray-300">
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4" />
                          <span className="font-medium">{job.budget} {job.currency}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{job.duration}</span>
                        </div>
                        <span>Posted {job.posted}</span>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-[#24bfbf]/50 text-white">
                      {job.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4 text-gray-300">
                    {job.description}
                  </CardDescription>
                  
                  <div className="mb-4 flex flex-wrap gap-2">
                    {job.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="bg-[#6824bf]/50 text-white">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-300">
                      <span className="font-mono">{job.client.slice(0, 10)}...{job.client.slice(-6)}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="border-[#24bfbf] text-[#24bfbf] hover:bg-[#24bfbf]/20 hover-web3-glow" onClick={() => setSelectedJob(job)}>
                        View Details
                      </Button>
                      {job.status === "open" && (
                        <Button size="sm" className="bg-[#24bfbf] hover:bg-[#3adada] hover-web3-glow" onClick={() => handleApply(job)}>
                          Apply Now
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {visibleCount < filteredAndSortedJobs.length && (
          <div className="mt-8 text-center">
            <Button
              variant="outline"
              size="lg"
              className="border-[#24bfbf] text-[#24bfbf] hover:bg-[#24bfbf]/20 hover-web3-glow"
              onClick={() => handleLoadMore()}
            >
              Load More Jobs
            </Button>
          </div>
        )}

        <Dialog open={!!selectedJob} onOpenChange={() => setSelectedJob(null)}>
          <DialogContent className="bg-gray-800 border-[#24bfbf]/50 text-white">
            <DialogHeader>
              <DialogTitle>{selectedJob?.title}</DialogTitle>
            </DialogHeader>
            <DialogDescription className="text-gray-300">
              <p><strong>Description:</strong> {selectedJob?.description}</p>
              <p><strong>Budget:</strong> {selectedJob?.budget} {selectedJob?.currency}</p>
              <p><strong>Duration:</strong> {selectedJob?.duration}</p>
              <p><strong>Status:</strong> {selectedJob?.status}</p>
              <p><strong>Skills:</strong> {selectedJob?.skills.join(", ")}</p>
              <p><strong>Client:</strong> {selectedJob?.client}</p>
              <p><strong>Posted:</strong> {selectedJob?.posted}</p>
            </DialogDescription>
            {selectedJob?.status === "open" && (
              <Button className="mt-4 bg-[#24bfbf] hover:bg-[#3adada] hover-web3-glow" onClick={() => handleApply(selectedJob)}>
                Apply Now
              </Button>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}