// Smart Contract Interface for ArbiFreelance
// This represents the contract ABI and types for frontend integration

export interface Job {
  id: string;
  client: `0x${string}`;
  freelancer?: `0x${string}`;
  title: string;
  description: string;
  budget: bigint;
  escrowAmount: bigint;
  deadline: bigint;
  status: JobStatus;
  skillsRequired: string[];
  disputeVotes?: DisputeVote[];
  createdAt: bigint;
  updatedAt: bigint;
}

export enum JobStatus {
  OPEN = 0,
  ASSIGNED = 1,
  IN_PROGRESS = 2,
  SUBMITTED = 3,
  COMPLETED = 4,
  DISPUTED = 5,
  CANCELLED = 6
}

export interface DisputeVote {
  voter: `0x${string}`;
  votedForFreelancer: boolean;
  timestamp: bigint;
}

export interface ContractConfig {
  address: `0x${string}`;
  abi: readonly unknown[];
  chainId: number;
}

// Mock contract ABI for frontend integration
export const ARBI_FREELANCE_ABI = [
  {
    "inputs": [
      { "name": "_title", "type": "string" },
      { "name": "_description", "type": "string" },
      { "name": "_budget", "type": "uint256" },
      { "name": "_deadline", "type": "uint256" },
      { "name": "_skillsRequired", "type": "string[]" }
    ],
    "name": "createJob",
    "outputs": [{ "name": "jobId", "type": "bytes32" }],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [{ "name": "_jobId", "type": "bytes32" }],
    "name": "acceptJob",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "name": "_jobId", "type": "bytes32" }],
    "name": "submitWork",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "name": "_jobId", "type": "bytes32" }],
    "name": "approveWork",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "name": "_jobId", "type": "bytes32" }],
    "name": "raiseDispute",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "name": "_jobId", "type": "bytes32" },
      { "name": "_voteForFreelancer", "type": "bool" }
    ],
    "name": "voteOnDispute",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "name": "_jobId", "type": "bytes32" }],
    "name": "getJob",
    "outputs": [
      {
        "components": [
          { "name": "id", "type": "bytes32" },
          { "name": "client", "type": "address" },
          { "name": "freelancer", "type": "address" },
          { "name": "title", "type": "string" },
          { "name": "description", "type": "string" },
          { "name": "budget", "type": "uint256" },
          { "name": "escrowAmount", "type": "uint256" },
          { "name": "deadline", "type": "uint256" },
          { "name": "status", "type": "uint8" },
          { "name": "createdAt", "type": "uint256" }
        ],
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const;

// Contract addresses for different networks
export const CONTRACT_ADDRESSES = {
  arbitrum: "0x" as `0x${string}`, // To be deployed
  arbitrumSepolia: "0x" as `0x${string}`, // To be deployed
} as const;

// USDC contract addresses
export const USDC_ADDRESSES = {
  arbitrum: "0xA0b86991c431e56e193b6a2F5a79F8C28A89C8618" as `0x${string}`,
  arbitrumSepolia: "0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d" as `0x${string}`,
} as const;