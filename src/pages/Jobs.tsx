import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/ui/badge-variants";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Clock, DollarSign, MapPin } from "lucide-react";

const mockJobs = [
  {
    id: 1,
    title: "Smart Contract Audit for DeFi Protocol",
    description: "Need comprehensive security audit for our new DeFi lending protocol. Must have experience with Solidity and security best practices.",
    budget: "5000",
    currency: "USDC",
    duration: "2 weeks",
    status: "open" as const,
    skills: ["Solidity", "Security", "DeFi"],
    client: "0x742d35Cc6639C0532fEb96966F4fd329b5b2e8",
    posted: "2 hours ago"
  },
  {
    id: 2,
    title: "Frontend Development for NFT Marketplace",
    description: "Build a modern React frontend for our NFT marketplace with wallet integration and clean UI/UX design.",
    budget: "3500",
    currency: "USDC",
    duration: "3 weeks",
    status: "in-progress" as const,
    skills: ["React", "Web3", "TypeScript"],
    client: "0x8ba1f109551bD432803012645Hao98765",
    posted: "1 day ago"
  },
  {
    id: 3,
    title: "Tokenomics Design & Whitepaper",
    description: "Design comprehensive tokenomics model and create detailed whitepaper for our new blockchain project.",
    budget: "2500",
    currency: "USDC", 
    duration: "1 week",
    status: "open" as const,
    skills: ["Tokenomics", "Writing", "DeFi"],
    client: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
    posted: "3 hours ago"
  },
  {
    id: 4,
    title: "Cross-chain Bridge Implementation",
    description: "Implement secure cross-chain bridge between Ethereum and Arbitrum with comprehensive testing.",
    budget: "8000",
    currency: "USDC",
    duration: "4 weeks", 
    status: "completed" as const,
    skills: ["Solidity", "Cross-chain", "Security"],
    client: "0xa0b86991c431e56e197fc86621b2e0cad2c4c6cd9",
    posted: "2 weeks ago"
  }
];

export default function Jobs() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-4 text-3xl font-bold">Browse Jobs</h1>
        <p className="text-muted-foreground">
          Find your next freelance opportunity on the decentralized web
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input 
            placeholder="Search jobs, skills, or keywords..." 
            className="pl-10"
          />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Jobs</SelectItem>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="latest">
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="latest">Latest</SelectItem>
            <SelectItem value="budget-high">Highest Budget</SelectItem>
            <SelectItem value="budget-low">Lowest Budget</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Job Cards */}
      <div className="grid gap-6">
        {mockJobs.map((job, index) => (
          <Card 
            key={job.id} 
            className="group hover-lift hover-glow transition-all duration-300 animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <CardTitle className="group-hover:text-primary transition-colors duration-200">
                    {job.title}
                  </CardTitle>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4" />
                      <span className="font-medium text-foreground">{job.budget} {job.currency}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{job.duration}</span>
                    </div>
                    <span>Posted {job.posted}</span>
                  </div>
                </div>
                <StatusBadge status={job.status} />
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4 text-base">
                {job.description}
              </CardDescription>
              
              <div className="mb-4 flex flex-wrap gap-2">
                {job.skills.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
              
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  <span className="font-mono">{job.client.slice(0, 10)}...{job.client.slice(-6)}</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="interactive-scale">
                    View Details
                  </Button>
                  {job.status === "open" && (
                    <Button size="sm" className="interactive-scale hover-glow">
                      Apply Now
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="mt-8 text-center">
        <Button variant="outline" size="lg" className="interactive-scale hover-glow">
          Load More Jobs
        </Button>
      </div>
    </div>
  );
}