// A simple utility to generate mock job data.
// In a real app, this data would come from an API.

export interface Job {
  id: number;
  title: string;
  description: string;
  type: "posted" | "working";
  status: "in-progress" | "completed" | "open";
  budget: number;
  progress: number;
  freelancer: string;
  client: string;
  deadline: string;
  createdAt: Date;
  tags: string[];
}

const titles = [
  "Smart Contract Audit for DeFi Protocol",
  "Frontend Development for NFT Marketplace",
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
];

const descriptions = [
  "We are looking for an experienced smart contract auditor to review our new DeFi protocol for security vulnerabilities. The ideal candidate has a deep understanding of the EVM and common attack vectors.",
  "Build a responsive and performant frontend for our new NFT marketplace using React, Next.js, and TypeScript. Experience with Ethers.js or Web3.js is required.",
  "Develop a scalable and secure backend API using Node.js, Express, and PostgreSQL to support our upcoming blockchain-based game. Must have experience with user authentication and database management.",
  "Design an intuitive and beautiful user interface for our new non-custodial mobile wallet. The work will involve creating wireframes, mockups, and a complete design system in Figma.",
  "Create clear, concise, and comprehensive documentation for our developer community. You will be writing tutorials, API references, and conceptual guides for our Web3 SDK.",
  "Engage and grow our community across Discord, Twitter, and other social media platforms. You will be responsible for organizing events, answering questions, and fostering a positive environment.",
];

const tags = [
  "Solidity",
  "Frontend",
  "Backend",
  "Design",
  "Security",
  "Community",
  "Rust",
  "Node.js",
  "React",
  "Mobile",
  "Documentation",
];

const getRandomElement = <T,>(arr: T[]): T =>
  arr[Math.floor(Math.random() * arr.length)];

const getRandomTags = (): string[] => {
  const numTags = Math.floor(Math.random() * 2) + 2; // 2 or 3 tags
  return [...new Set(Array.from({ length: numTags }, () => getRandomElement(tags)))];
};

export const generateJobs = (count: number): Job[] => {
  const jobs: Job[] = [];
  for (let i = 1; i <= count; i++) {
    const type = Math.random() > 0.5 ? "posted" : "working";
    const statusOptions: Job["status"][] = ["in-progress", "completed", "open"];
    const status = getRandomElement(statusOptions);

    jobs.push({
      id: i,
      title: getRandomElement(titles),
      description: getRandomElement(descriptions),
      type,
      status,
      budget: Math.floor(Math.random() * 18000) + 2000, // 2000 to 20000
      progress:
        status === "in-progress"
          ? Math.floor(Math.random() * 80) + 10
          : status === "completed"
          ? 100
          : 0,
      freelancer: `0x${Math.random().toString(16).slice(2, 42)}`, // ✅ fixed substr -> slice
      client: `0x${Math.random().toString(16).slice(2, 42)}`,
      deadline: `${Math.floor(Math.random() * 28) + 2} days left`,
      createdAt: new Date(
        Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000
      ), // Within the last 30 days
      tags: getRandomTags(),
    });
  }
  return jobs;
};
