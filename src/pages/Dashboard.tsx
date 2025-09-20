import { useState, useMemo, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

// Define Job interface
interface Job {
  id: number;
  title: string;
  description: string;
  budget: number;
  status: "open" | "in-progress" | "completed";
  type: "posted" | "applied";
  tags: string[];
  createdAt: Date;
}

// Utility to generate mock jobs
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

const tagsList = [
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
      budget: Math.floor(Math.random() * 5000) + 1000,
      status: getRandomElement(["open", "in-progress", "completed"]),
      type: getRandomElement(["posted", "applied"]),
      tags: Array.from({ length: Math.floor(Math.random() * 3) + 1 }, () => getRandomElement(tagsList)),
      createdAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000),
    });
  }
  return jobs;
};

const JOBS_PER_PAGE = 6;

const JobGrid = ({ jobs, onViewDetails }: { jobs: Job[]; onViewDetails: (job: Job) => void }) => (
  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
    {jobs.map((job) => (
      <Card key={job.id} className="group bg-gray-800/80 backdrop-blur-sm border-[#24bfbf]/50 hover-web3-glow transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-lg text-white group-hover:text-[#24bfbf]">{job.title}</CardTitle>
          <Badge
            variant={
              job.status === "completed"
                ? "default"
                : job.status === "in-progress"
                ? "secondary"
                : "outline"
            }
            className="bg-[#24bfbf]/50 text-white"
          >
            {job.status}
          </Badge>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-300 line-clamp-2">{job.description}</p>
          <div className="mt-2 text-sm font-medium text-gray-300">Budget: ${job.budget}</div>
          <div className="flex flex-wrap gap-1 mt-2">
            {job.tags.map((tag, i) => (
              <Badge key={i} variant="outline" className="text-xs border-[#24bfbf] text-[#24bfbf]">
                {tag}
              </Badge>
            ))}
          </div>
          <Button variant="link" className="mt-2 p-0 text-[#24bfbf] hover:text-[#3adada]" onClick={() => onViewDetails(job)}>
            View Details
          </Button>
        </CardContent>
      </Card>
    ))}
  </div>
);

export default function Dashboard() {
  const [allJobs, setAllJobs] = useState<Job[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"active" | "posted" | "completed">("active");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [visibleJobsCount, setVisibleJobsCount] = useState(JOBS_PER_PAGE);
  const [sortOrder, setSortOrder] = useState<"latest" | "highest" | "lowest">("latest");
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Initialize jobs and log for debugging
  useEffect(() => {
    try {
      const jobs = generateJobs(30);
      console.log("Generated Jobs:", jobs);
      setAllJobs(jobs);
    } catch (err) {
      console.error("Error generating jobs:", err);
      setError("Failed to load jobs. Please try again.");
    }
  }, []);

  const filteredJobs = useMemo(() => {
    if (!allJobs.length) return [];

    let jobs = [...allJobs];

    if (activeTab === "active") {
      jobs = jobs.filter((job) => job.status === "in-progress");
    } else if (activeTab === "posted") {
      jobs = jobs.filter((job) => job.type === "posted");
    } else if (activeTab === "completed") {
      jobs = jobs.filter((job) => job.status === "completed");
    }

    if (searchTerm) {
      jobs = jobs.filter(
        (job) =>
          job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (sortOrder === "latest") {
      jobs.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    } else if (sortOrder === "highest") {
      jobs.sort((a, b) => b.budget - a.budget);
    } else {
      jobs.sort((a, b) => a.budget - b.budget);
    }

    return jobs;
  }, [allJobs, searchTerm, activeTab, sortOrder]);

  const visibleJobs = filteredJobs.slice(0, visibleJobsCount);

  const handleApply = () => {
    try {
      toast({
        title: "Application Submitted",
        description: "Your proposal has been sent successfully!",
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

  if (error) {
    return (
      <div className="min-h-screen bg-[#0a0b1a] flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-400">{error}</h1>
          <Button
            className="mt-4 bg-[#24bfbf] hover:bg-[#3adada]"
            onClick={() => window.location.reload()}
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

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

      <div className="p-4 md:p-6 relative z-10">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-white">Freelance Marketplace Dashboard</h1>
          <div className="flex gap-2">
            <Input
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-xs bg-gray-800 border-[#24bfbf] text-white placeholder-gray-400"
            />
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as typeof sortOrder)}
              className="border rounded-md px-2 py-1 bg-gray-800 border-[#24bfbf] text-white"
            >
              <option value="latest">Latest</option>
              <option value="highest">Highest Budget</option>
              <option value="lowest">Lowest Budget</option>
            </select>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={(val) => setActiveTab(val as typeof activeTab)}>
          <TabsList className="bg-gray-800 border-[#24bfbf]">
            <TabsTrigger value="active" className="text-gray-300 hover:text-white">Active Jobs</TabsTrigger>
            <TabsTrigger value="posted" className="text-gray-300 hover:text-white">Posted Jobs</TabsTrigger>
            <TabsTrigger value="completed" className="text-gray-300 hover:text-white">Completed Jobs</TabsTrigger>
          </TabsList>
        </Tabs>

        {visibleJobs.length === 0 ? (
          <div className="text-center text-gray-300 mt-8">
            No jobs found. Try adjusting your search or filters.
          </div>
        ) : (
          <JobGrid jobs={visibleJobs} onViewDetails={setSelectedJob} />
        )}

        {visibleJobsCount < filteredJobs.length && (
          <div className="flex justify-center mt-4">
            <Button
              onClick={() =>
                setVisibleJobsCount((prev) =>
                  Math.min(prev + JOBS_PER_PAGE, filteredJobs.length)
                )
              }
              className="bg-[#24bfbf] hover:bg-[#3adada] hover-web3-glow"
            >
              Load More
            </Button>
          </div>
        )}

        <Dialog open={!!selectedJob} onOpenChange={(open) => !open && setSelectedJob(null)}>
          <DialogContent className="bg-gray-800 border-[#24bfbf]/50 text-white">
            <DialogHeader>
              <DialogTitle>{selectedJob?.title}</DialogTitle>
            </DialogHeader>
            <DialogDescription className="text-gray-300">
              <p><strong>Description:</strong> {selectedJob?.description}</p>
              <p><strong>Budget:</strong> ${selectedJob?.budget}</p>
              <p><strong>Status:</strong> {selectedJob?.status}</p>
              <p><strong>Tags:</strong> {selectedJob?.tags.join(", ")}</p>
            </DialogDescription>
            {selectedJob?.status === "open" && (
              <Button className="mt-4 bg-[#24bfbf] hover:bg-[#3adada] hover-web3-glow" onClick={handleApply}>
                Apply Now
              </Button>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}