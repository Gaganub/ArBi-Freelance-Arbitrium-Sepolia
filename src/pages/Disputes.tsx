import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { AlertTriangle, Users, Clock, DollarSign, ThumbsUp, ThumbsDown, Eye } from "lucide-react";

// Define Dispute interface
interface Dispute {
  id: number;
  jobTitle: string;
  description: string;
  amount: string;
  votesYes: number;
  votesNo: number;
  totalVotes: number;
  threshold: number;
  timeLeft: string;
  status: "active" | "resolved";
  yourVote: "yes" | "no" | null;
  resolution?: "favor-freelancer" | "favor-client";
}

// Utility to generate mock disputes
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
  "Oracle Integration Service",
  "Security Vulnerability Scan",
  "Whitepaper Writing",
  "Community Management Bot",
  "Staking Platform UI",
  "Liquidity Pool Manager",
  "Flash Loan Arbitrage Bot",
  "Governance Proposal System",
  "NFT Minting Contract",
  "Decentralized Identity System",
  "Prediction Market DApp",
  "Supply Chain Tracker",
  "Voting Escrow Token",
  "Perpetual Futures Exchange",
  "Decentralized Lending Platform",
  "Asset Tokenization Service",
  "Privacy Mixer Implementation",
  "Layer 2 Scaling Solution",
  "Blockchain Analytics Dashboard",
  "Crypto Payment Gateway",
];

const descriptions = [
  "Client claims work was incomplete, freelancer says requirements changed",
  "Freelancer claims client requested additional work beyond scope",
  "Quality dispute - client unsatisfied with deliverable quality",
  "Timeline dispute - delivery was late according to client",
  "Payment issue - freelancer claims partial payment due",
  "Scope creep allegation by freelancer",
  "Intellectual property disagreement",
  "Contract termination dispute",
  "Milestone achievement verification",
  "Refund request by client",
];

const getRandomElement = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

const generateDisputes = (count: number): Dispute[] => {
  const disputes: Dispute[] = [];
  for (let i = 1; i <= count; i++) {
    const totalVotes = Math.floor(Math.random() * 15);
    const votesYes = Math.floor(Math.random() * totalVotes);
    const votesNo = totalVotes - votesYes;
    const status = totalVotes >= 5 ? "resolved" : "active";
    const resolution = status === "resolved" ? (votesYes > votesNo ? "favor-freelancer" : "favor-client") : undefined;
    const timeLeft = status === "active" ? `${Math.floor(Math.random() * 7) + 1} days` : "Resolved";

    disputes.push({
      id: i,
      jobTitle: getRandomElement(jobTitles),
      description: getRandomElement(descriptions),
      amount: `${Math.floor(Math.random() * 5000) + 1000} USDC`,
      votesYes,
      votesNo,
      totalVotes,
      threshold: 5,
      timeLeft,
      status,
      yourVote: null,
      resolution,
    });
  }
  return disputes;
};

// In-component usage
const DISPUTES_PER_PAGE = 5;

export default function Disputes() {
  const [allDisputes, setAllDisputes] = useState<Dispute[]>(generateDisputes(50));
  const [visibleCount, setVisibleCount] = useState(DISPUTES_PER_PAGE);
  const [selectedDispute, setSelectedDispute] = useState<Dispute | null>(null);

  const visibleDisputes = allDisputes.slice(0, visibleCount);

  const handleLoadMore = () => {
    console.log("Load More clicked, current visibleCount:", visibleCount, "total disputes:", allDisputes.length);
    setVisibleCount((prev) => {
      const newCount = Math.min(prev + DISPUTES_PER_PAGE, allDisputes.length);
      console.log("New visibleCount:", newCount);
      return newCount;
    });
  };

  const handleVote = (disputeId: number, vote: "yes" | "no") => {
    setAllDisputes((prevDisputes) =>
      prevDisputes.map((dispute) => {
        if (dispute.id === disputeId && dispute.status === "active" && !dispute.yourVote) {
          const newVotesYes = vote === "yes" ? dispute.votesYes + 1 : dispute.votesYes;
          const newVotesNo = vote === "no" ? dispute.votesNo + 1 : dispute.votesNo;
          const newTotalVotes = newVotesYes + newVotesNo;
          const newStatus = newTotalVotes >= dispute.threshold ? "resolved" : "active";
          const newResolution =
            newStatus === "resolved" ? (newVotesYes > newVotesNo ? "favor-freelancer" : "favor-client") : undefined;
          const newTimeLeft = newStatus === "resolved" ? "Resolved" : dispute.timeLeft;

          return {
            ...dispute,
            votesYes: newVotesYes,
            votesNo: newVotesNo,
            totalVotes: newTotalVotes,
            yourVote: vote,
            status: newStatus,
            resolution: newResolution,
            timeLeft: newTimeLeft,
          };
        }
        return dispute;
      })
    );
  };

  const handleUndoVote = (disputeId: number) => {
    setAllDisputes((prevDisputes) =>
      prevDisputes.map((dispute) => {
        if (dispute.id === disputeId && dispute.yourVote) {
          const voteToUndo = dispute.yourVote;
          const newVotesYes = voteToUndo === "yes" ? dispute.votesYes - 1 : dispute.votesYes;
          const newVotesNo = voteToUndo === "no" ? dispute.votesNo - 1 : dispute.votesNo;
          const newTotalVotes = newVotesYes + newVotesNo;
          const newStatus = newTotalVotes >= dispute.threshold ? "resolved" : "active";
          const newResolution =
            newStatus === "resolved" ? (newVotesYes > newVotesNo ? "favor-freelancer" : "favor-client") : undefined;
          const newTimeLeft = newStatus === "resolved" ? "Resolved" : dispute.timeLeft;

          return {
            ...dispute,
            votesYes: newVotesYes,
            votesNo: newVotesNo,
            totalVotes: newTotalVotes,
            yourVote: null,
            status: newStatus,
            resolution: newResolution,
            timeLeft: newTimeLeft,
          };
        }
        return dispute;
      })
    );
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
        <div className="mb-8">
          <h1 className="mb-4 text-3xl font-bold flex items-center gap-2 text-white">
            <AlertTriangle className="h-8 w-8 text-[#24bfbf]" />
            Community Disputes
          </h1>
          <p className="text-gray-300">
            Help resolve disputes through community voting. Each vote helps maintain platform integrity.
          </p>
        </div>

        {/* Info Card */}
        <Card className="mb-8 bg-gray-800/80 backdrop-blur-sm border-[#24bfbf]/50 hover-web3-glow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#24bfbf]">
              <Users className="h-5 w-5" />
              How Community Voting Works
            </CardTitle>
          </CardHeader>
          <CardContent className="text-gray-300">
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <h4 className="font-medium mb-1 text-white">Threshold: 5 Votes</h4>
                <p className="text-sm">
                  Disputes are resolved when total votes exceed the threshold
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-1 text-white">Majority Rules</h4>
                <p className="text-sm">
                  The side with more votes wins the dispute resolution
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-1 text-white">Fair & Transparent</h4>
                <p className="text-sm">
                  All votes are recorded on-chain for full transparency
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Disputes List */}
        <div className="space-y-6">
          {visibleDisputes.length === 0 ? (
            <div className="text-center text-gray-300">
              No disputes found. Check back later for new disputes.
            </div>
          ) : (
            visibleDisputes.map((dispute) => (
              <Card
                key={dispute.id}
                className="group bg-gray-800/80 backdrop-blur-sm border-[#24bfbf]/50 hover-web3-glow transition-all duration-300 animate-fade-in"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <CardTitle className="group-hover:text-[#24bfbf] transition-colors text-white">
                        Dispute #{dispute.id}: {dispute.jobTitle}
                      </CardTitle>
                      <div className="flex items-center gap-4 text-sm text-gray-300">
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4" />
                          <span className="font-medium">{dispute.amount}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{dispute.timeLeft}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>{dispute.totalVotes} votes</span>
                        </div>
                      </div>
                    </div>
                    <Badge
                      variant={dispute.status === "resolved" ? "secondary" : "default"}
                      className={dispute.status === "resolved" ? "bg-[#24bfbf]/50 text-white" : "bg-[#6824bf]/50 text-white"}
                    >
                      {dispute.status === "resolved" ? "Resolved" : "Active"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6 text-gray-300">
                  <p>{dispute.description}</p>

                  {/* Voting Progress */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span>Community Vote Progress</span>
                      <span className="font-medium">
                        {dispute.totalVotes} / {dispute.threshold} minimum votes
                      </span>
                    </div>
                    <div className="grid gap-3 md:grid-cols-2">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="flex items-center gap-1">
                            <ThumbsUp className="h-4 w-4 text-[#24bfbf]" />
                            Favor Freelancer
                          </span>
                          <span className="font-medium">{dispute.votesYes} votes</span>
                        </div>
                        <Progress
                          value={(dispute.votesYes / Math.max(dispute.totalVotes, 1)) * 100}
                          className="h-2 bg-gray-700"
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="flex items-center gap-1">
                            <ThumbsDown className="h-4 w-4 text-[#6824bf]" />
                            Favor Client
                          </span>
                          <span className="font-medium">{dispute.votesNo} votes</span>
                        </div>
                        <Progress
                          value={(dispute.votesNo / Math.max(dispute.totalVotes, 1)) * 100}
                          className="h-2 bg-gray-700"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Resolution or Voting Actions */}
                  {dispute.status === "resolved" ? (
                    <div className="rounded-lg bg-[#24bfbf]/10 p-4">
                      <div className="flex items-center gap-2 text-[#24bfbf] font-medium">
                        <ThumbsUp className="h-4 w-4" />
                        Resolved in favor of {dispute.resolution === "favor-freelancer" ? "freelancer" : "client"}
                      </div>
                      <p className="text-sm mt-1">
                        Payment has been {dispute.resolution === "favor-freelancer" ? "released to freelancer" : "returned to client"}
                      </p>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-[#24bfbf] text-[#24bfbf] hover:bg-[#24bfbf]/20 hover-web3-glow"
                        onClick={() => setSelectedDispute(dispute)}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </Button>
                      {dispute.yourVote ? (
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="bg-[#6824bf]/50 text-white">
                            You voted: {dispute.yourVote === "yes" ? "Favor Freelancer" : "Favor Client"}
                          </Badge>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleUndoVote(dispute.id)}
                            className="text-xs h-6 px-2 border-[#6824bf] text-[#6824bf] hover:bg-[#6824bf]/20 hover-web3-glow"
                          >
                            Undo
                          </Button>
                        </div>
                      ) : (
                        <>
                          <Button
                            size="sm"
                            className="bg-[#24bfbf] text-white hover:bg-[#3adada] hover-web3-glow"
                            onClick={() => handleVote(dispute.id, "yes")}
                          >
                            <ThumbsUp className="mr-2 h-4 w-4" />
                            Favor Freelancer
                          </Button>
                          <Button
                            size="sm"
                            className="bg-[#6824bf] text-white hover:bg-[#7b3fe4] hover-web3-glow"
                            onClick={() => handleVote(dispute.id, "no")}
                          >
                            <ThumbsDown className="mr-2 h-4 w-4" />
                            Favor Client
                          </Button>
                        </>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Load More */}
        {visibleCount < allDisputes.length && (
          <div className="mt-8 text-center">
            <Button
              variant="outline"
              size="lg"
              className="border-[#24bfbf] text-[#24bfbf] hover:bg-[#24bfbf]/20 hover-web3-glow"
              onClick={() => handleLoadMore()}
            >
              Load More Disputes
            </Button>
          </div>
        )}

        {/* View Details Dialog */}
        <Dialog open={!!selectedDispute} onOpenChange={() => setSelectedDispute(null)}>
          <DialogContent className="bg-gray-800 border-[#24bfbf]/50 text-white">
            <DialogHeader>
              <DialogTitle>Dispute Details: {selectedDispute?.jobTitle}</DialogTitle>
            </DialogHeader>
            <DialogDescription className="text-gray-300">
              <p><strong>Description:</strong> {selectedDispute?.description}</p>
              <p><strong>Amount:</strong> {selectedDispute?.amount}</p>
              <p><strong>Time Left:</strong> {selectedDispute?.timeLeft}</p>
              <p><strong>Votes for Freelancer:</strong> {selectedDispute?.votesYes}</p>
              <p><strong>Votes for Client:</strong> {selectedDispute?.votesNo}</p>
              <p><strong>Total Votes:</strong> {selectedDispute?.totalVotes} / {selectedDispute?.threshold}</p>
            </DialogDescription>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}