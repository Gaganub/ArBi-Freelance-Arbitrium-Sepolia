import { useState } from "react";

// Define Job interface (moved from generateJobs.tsx for consistency)
export interface Job {
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

// Mock job data generator (moved from generateJobs.tsx)
const titles = [
  "Smart Contract Audit for DeFi Protocol",
  "Frontend Development for NFT Marketplace",
  "Tokenomics Design & Whitepaper",
  "Cross-chain Bridge Implementation",
  "Backend API for a Gaming Platform",
  "UI/UX Design for Mobile Wallet",
  "Technical Writer for Web3 Documentation",
  "Community Manager for a DAO",
  "Rust Developer for Solana Project",
  "Node.js Developer for Indexing Service",
  "React Native Developer for dApp",
  "Solidity Developer for Yield Farming Protocol",
  "Graphic Designer for Pitch Deck",
  "DevOps Engineer for Blockchain Infrastructure",
  "NFT Marketplace Backend",
  "DeFi Protocol Audit",
  "Web3 Wallet Integration",
  "Blockchain Game Development",
  "DAO Governance Tool",
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
  "Need comprehensive security audit for our new DeFi lending protocol. Must have experience with Solidity and security best practices.",
  "Build a modern React frontend for our NFT marketplace with wallet integration and clean UI/UX design.",
  "Design comprehensive tokenomics model and create detailed whitepaper for our new blockchain project.",
  "Implement secure cross-chain bridge between Ethereum and Arbitrum with comprehensive testing.",
  "Develop a scalable and secure backend API using Node.js, Express, and PostgreSQL to support our upcoming blockchain-based game.",
  "Design an intuitive and beautiful user interface for our new non-custodial mobile wallet.",
  "Create clear, concise, and comprehensive documentation for our developer community.",
  "Engage and grow our community across Discord, Twitter, and other social media platforms.",
];

const skillsOptions = [
  "Solidity", "React", "Web3", "TypeScript", "Security", "DeFi", "Tokenomics", "Writing", "Cross-chain",
  "Node.js", "Rust", "UI/UX", "DevOps", "NFT", "DAO", "Oracle", "Staking", "Liquidity",
];

const getRandomElement = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

const getRandomSkills = (): string[] => {
  const numSkills = Math.floor(Math.random() * 3) + 2;
  return [...new Set(Array.from({ length: numSkills }, () => getRandomElement(skillsOptions)))];
};

const generateJobs = (count: number): Job[] => {
  const jobs: Job[] = [];
  for (let i = 1; i <= count; i++) {
    const budgetNum = Math.floor(Math.random() * 18000) + 2000;
    const budget = budgetNum.toString();
    const statusOptions: Job["status"][] = ["open", "in-progress", "completed"];
    const status = getRandomElement(statusOptions);
    const daysAgo = Math.floor(Math.random() * 30);
    const createdAt = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000);
    const posted = `${daysAgo === 0 ? Math.floor(Math.random() * 24) + 1 + " hours" : daysAgo + " days"} ago`;

    jobs.push({
      id: i,
      title: getRandomElement(titles),
      description: getRandomElement(descriptions),
      budget,
      currency: "USDC",
      duration: `${Math.floor(Math.random() * 4) + 1} weeks`,
      status,
      skills: getRandomSkills(),
      client: `0x${Math.random().toString(16).slice(2, 42)}`,
      posted,
      createdAt,
    });
  }
  return jobs;
};

// In-memory store
let jobs: Job[] = generateJobs(120);

export const useJobStore = () => {
  const [allJobs, setAllJobs] = useState<Job[]>(jobs);

  const addJob = (newJob: Omit<Job, "id" | "client" | "posted" | "createdAt" | "status">) => {
    const job: Job = {
      ...newJob,
      id: allJobs.length + 1,
      client: `0x${Math.random().toString(16).slice(2, 42)}`,
      posted: "Just now",
      createdAt: new Date(),
      status: "open",
    };
    jobs = [job, ...jobs];
    setAllJobs([...jobs]);
  };

  return { allJobs, addJob };
};