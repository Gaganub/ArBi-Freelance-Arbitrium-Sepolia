import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, Users, Clock, DollarSign, ThumbsUp, ThumbsDown, Eye } from "lucide-react";

const disputes = [
  {
    id: 1,
    jobTitle: "Smart Contract Development",
    description: "Client claims work was incomplete, freelancer says requirements changed",
    amount: "2500 USDC",
    votesYes: 8,
    votesNo: 2,
    totalVotes: 10,
    threshold: 5,
    timeLeft: "2 days",
    status: "active",
    yourVote: null
  },
  {
    id: 2,
    jobTitle: "Frontend UI/UX Design",
    description: "Freelancer claims client requested additional work beyond scope",
    amount: "1800 USDC",
    votesYes: 3,
    votesNo: 7,
    totalVotes: 10,
    threshold: 5,
    timeLeft: "4 days",
    status: "active", 
    yourVote: "no"
  },
  {
    id: 3,
    jobTitle: "Tokenomics Consultation",
    description: "Quality dispute - client unsatisfied with deliverable quality",
    amount: "1200 USDC",
    votesYes: 12,
    votesNo: 1,
    totalVotes: 13,
    threshold: 5,
    timeLeft: "Resolved",
    status: "resolved",
    resolution: "favor-freelancer"
  }
];

export default function Disputes() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-4 text-3xl font-bold flex items-center gap-2">
          <AlertTriangle className="h-8 w-8 text-warning" />
          Community Disputes
        </h1>
        <p className="text-muted-foreground">
          Help resolve disputes through community voting. Each vote helps maintain platform integrity.
        </p>
      </div>

      {/* Info Card */}
      <Card className="mb-8 border-info/20 bg-info/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-info">
            <Users className="h-5 w-5" />
            How Community Voting Works
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <h4 className="font-medium mb-1">Threshold: 5 Votes</h4>
              <p className="text-sm text-muted-foreground">
                Disputes are resolved when total votes exceed the threshold
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-1">Majority Rules</h4>
              <p className="text-sm text-muted-foreground">
                The side with more votes wins the dispute resolution
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-1">Fair & Transparent</h4>
              <p className="text-sm text-muted-foreground">
                All votes are recorded on-chain for full transparency
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Disputes List */}
      <div className="space-y-6">
        {disputes.map((dispute) => (
          <Card key={dispute.id} className="group hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <CardTitle className="group-hover:text-primary transition-colors">
                    Dispute #{dispute.id}: {dispute.jobTitle}
                  </CardTitle>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4" />
                      <span className="font-medium text-foreground">{dispute.amount}</span>
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
                  variant={dispute.status === 'resolved' ? 'secondary' : 'default'}
                  className={dispute.status === 'resolved' ? 'bg-success text-success-foreground' : ''}
                >
                  {dispute.status === 'resolved' ? 'Resolved' : 'Active'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground">
                {dispute.description}
              </p>

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
                        <ThumbsUp className="h-4 w-4 text-success" />
                        Favor Freelancer
                      </span>
                      <span className="font-medium">{dispute.votesYes} votes</span>
                    </div>
                    <Progress 
                      value={(dispute.votesYes / Math.max(dispute.totalVotes, 1)) * 100} 
                      className="h-2 bg-muted" 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-1">
                        <ThumbsDown className="h-4 w-4 text-destructive" />
                        Favor Client
                      </span>
                      <span className="font-medium">{dispute.votesNo} votes</span>
                    </div>
                    <Progress 
                      value={(dispute.votesNo / Math.max(dispute.totalVotes, 1)) * 100} 
                      className="h-2 bg-muted"
                    />
                  </div>
                </div>
              </div>

              {/* Resolution or Voting Actions */}
              {dispute.status === 'resolved' ? (
                <div className="rounded-lg bg-success/10 p-4">
                  <div className="flex items-center gap-2 text-success font-medium">
                    <ThumbsUp className="h-4 w-4" />
                    Resolved in favor of {dispute.resolution === 'favor-freelancer' ? 'freelancer' : 'client'}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Payment has been {dispute.resolution === 'favor-freelancer' ? 'released to freelancer' : 'returned to client'}
                  </p>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Button variant="outline" size="sm">
                    <Eye className="mr-2 h-4 w-4" />
                    View Details
                  </Button>
                  
                  {dispute.yourVote ? (
                    <Badge variant="secondary">
                      You voted: {dispute.yourVote === 'yes' ? 'Favor Freelancer' : 'Favor Client'}
                    </Badge>
                  ) : (
                    <>
                      <Button size="sm" className="bg-success text-success-foreground hover:bg-success/90">
                        <ThumbsUp className="mr-2 h-4 w-4" />
                        Favor Freelancer
                      </Button>
                      <Button size="sm" variant="destructive">
                        <ThumbsDown className="mr-2 h-4 w-4" />
                        Favor Client
                      </Button>
                    </>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="mt-8 text-center">
        <Button variant="outline" size="lg">
          Load More Disputes
        </Button>
      </div>
    </div>
  );
}