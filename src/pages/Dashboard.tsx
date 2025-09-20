import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatusBadge } from "@/components/ui/badge-variants";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { PostJobDialog } from "@/components/PostJobDialog";
import { Plus, DollarSign, Clock, TrendingUp, FileText, Shield } from "lucide-react";

const myJobs = [
  {
    id: 1,
    title: "Smart Contract Audit for DeFi Protocol",
    type: "posted",
    status: "in-progress" as const,
    budget: "5000",
    progress: 75,
    freelancer: "0x8ba1f109551bD432803012645Hao98765",
    escrowAmount: "5000",
    deadline: "5 days left"
  },
  {
    id: 2,
    title: "Frontend Development for NFT Marketplace", 
    type: "working",
    status: "in-progress" as const,
    budget: "3500",
    progress: 45,
    client: "0x742d35Cc6639C0532fEb96966F4fd329b5b2e8",
    escrowAmount: "3500",
    deadline: "12 days left"
  }
];

const stats = [
  { label: "Total Earned", value: "$12,450", icon: DollarSign, change: "+12%" },
  { label: "Jobs Completed", value: "23", icon: FileText, change: "+5%" },
  { label: "Success Rate", value: "98.5%", icon: TrendingUp, change: "+2%" },
  { label: "In Escrow", value: "$8,500", icon: Shield, change: "0%" }
];

export default function Dashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="mb-2 text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your jobs and track your freelance progress
          </p>
        </div>
        <PostJobDialog>
          <Button className="hover:scale-105 transition-transform duration-200 hover-glow">
            <Plus className="mr-2 h-4 w-4" />
            Post New Job
          </Button>
        </PostJobDialog>
      </div>

      {/* Stats Grid */}
      <div className="mb-8 grid gap-4 md:grid-cols-4">
        {stats.map((stat, index) => (
          <Card 
            key={stat.label} 
            className="hover-lift hover-glow group transition-all duration-300 animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold group-hover:scale-110 transition-transform duration-200">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className={stat.change.startsWith('+') ? 'text-success' : 'text-muted-foreground'}>
                  {stat.change}
                </span>{' '}
                from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Jobs Tabs */}
      <Tabs defaultValue="active" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="active">Active Jobs</TabsTrigger>
          <TabsTrigger value="posted">Jobs Posted</TabsTrigger>
          <TabsTrigger value="working">Working On</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {myJobs.map((job, index) => (
            <Card 
              key={job.id} 
              className="group hover-lift hover-glow transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="group-hover:text-primary transition-colors duration-200">
                      {job.title}
                    </CardTitle>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <Badge variant={job.type === 'posted' ? 'default' : 'secondary'}>
                        {job.type === 'posted' ? 'Client' : 'Freelancer'}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4" />
                        <span className="font-medium text-foreground">{job.budget} USDC</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{job.deadline}</span>
                      </div>
                    </div>
                  </div>
                  <StatusBadge status={job.status} />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Progress</span>
                    <span className="font-medium">{job.progress}%</span>
                  </div>
                  <Progress value={job.progress} className="h-2" />
                </div>

                <div className="rounded-lg bg-muted/50 p-4">
                  <div className="grid gap-3 md:grid-cols-2">
                    <div>
                      <div className="text-sm text-muted-foreground">Escrow Amount</div>
                      <div className="font-medium">{job.escrowAmount} USDC</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">
                        {job.type === 'posted' ? 'Freelancer' : 'Client'}
                      </div>
                      <div className="font-mono text-sm">
                        {job.type === 'posted' ? job.freelancer : job.client}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="interactive-scale">
                    View Details
                  </Button>
                  <Button variant="outline" size="sm" className="interactive-scale">
                    Messages
                  </Button>
                  {job.type === 'posted' && job.status === 'in-progress' && (
                    <Button size="sm" className="bg-success text-success-foreground hover:bg-success/90 interactive-scale animate-pulse-glow">
                      Release Payment
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="posted">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-muted-foreground">No jobs posted yet</div>
              <Button className="mt-4">
                <Plus className="mr-2 h-4 w-4" />
                Post Your First Job
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="working">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-muted-foreground">No active work</div>
              <Button className="mt-4" variant="outline">
                Browse Available Jobs
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-muted-foreground">No completed jobs yet</div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}