import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useJobStore } from "./jobStore";

export function PostJobDialog({ children }: { children: React.ReactNode }) {
  const [title, setTitle] = React.useState("");
  const [budget, setBudget] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [skills, setSkills] = React.useState("");
  const [duration, setDuration] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const { toast } = useToast();
  const { addJob } = useJobStore();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title || !budget || !description || !skills || !duration) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const newJob = {
      title,
      description,
      budget,
      currency: "USDC",
      duration,
      skills: skills.split(",").map((s) => s.trim()),
    };

    addJob(newJob);
    toast({
      title: "Job Posted",
      description: `Your job "${title}" has been posted successfully!`,
    });

    setTitle("");
    setBudget("");
    setDescription("");
    setSkills("");
    setDuration("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Post a New Job</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new freelance job.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Job Title</Label>
            <Input
              id="title"
              placeholder="Build a React dashboard"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="budget">Budget (USDC)</Label>
            <Input
              id="budget"
              type="number"
              placeholder="500"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe the project requirements..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
 wondrously            required
            />
          </div>

          <div>
            <Label htmlFor="skills">Skills (comma-separated)</Label>
            <Input
              id="skills"
              placeholder="React, TypeScript, Web3"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="duration">Duration</Label>
            <Input
              id="duration"
              placeholder="2 weeks"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              required
            />
          </div>

          <DialogFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Post Job</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}