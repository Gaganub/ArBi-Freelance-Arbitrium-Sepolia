import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Plus, X, Calendar, DollarSign, Tag } from 'lucide-react';
import { useArbiFreelanceContract } from '@/hooks/useContract';
import { toast } from '@/hooks/use-toast';

const formSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  budget: z.string().min(1, 'Budget is required').regex(/^\d+(\.\d{1,2})?$/, 'Invalid budget format'),
  duration: z.string().min(1, 'Duration is required'),
  skills: z.array(z.string()).min(1, 'At least one skill is required'),
});

type FormData = z.infer<typeof formSchema>;

interface PostJobDialogProps {
  children: React.ReactNode;
}

export function PostJobDialog({ children }: PostJobDialogProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [skillInput, setSkillInput] = useState('');
  const { createJob, isConnected } = useArbiFreelanceContract();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      budget: '',
      duration: '',
      skills: [],
    },
  });

  const addSkill = () => {
    if (skillInput.trim() && !form.getValues('skills').includes(skillInput.trim())) {
      const currentSkills = form.getValues('skills');
      form.setValue('skills', [...currentSkills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    const currentSkills = form.getValues('skills');
    form.setValue('skills', currentSkills.filter(skill => skill !== skillToRemove));
  };

  const onSubmit = async (data: FormData) => {
    if (!isConnected) {
      toast({
        title: "Connect Wallet",
        description: "Please connect your wallet to post a job",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      // Calculate deadline (current time + duration in days)
      const durationDays = parseInt(data.duration);
      const deadline = Math.floor(Date.now() / 1000) + (durationDays * 24 * 60 * 60);

      await createJob(
        data.title,
        data.description,
        data.budget,
        deadline,
        data.skills
      );

      form.reset();
      setOpen(false);
      toast({
        title: "Job Posted Successfully!",
        description: "Your job has been posted and is now live on the platform",
      });
    } catch (error) {
      console.error('Failed to post job:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Post a New Job
          </DialogTitle>
          <DialogDescription>
            Create a detailed job posting to find the perfect freelancer for your project
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Title</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="e.g., Smart Contract Audit for DeFi Protocol" 
                      {...field} 
                      className="transition-all duration-200 focus:scale-[1.02]"
                    />
                  </FormControl>
                  <FormDescription>
                    Create a clear, descriptive title that highlights your project
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Provide detailed information about your project requirements, deliverables, and any specific preferences..."
                      className="min-h-[120px] transition-all duration-200 focus:scale-[1.01]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Include all important details about the project scope and requirements
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="budget"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4" />
                      Budget (USDC)
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="e.g., 5000" 
                        type="number" 
                        step="0.01"
                        {...field}
                        className="transition-all duration-200 focus:scale-[1.02]"
                      />
                    </FormControl>
                    <FormDescription>
                      Total project budget in USDC
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Duration (Days)
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="e.g., 14" 
                        type="number"
                        {...field}
                        className="transition-all duration-200 focus:scale-[1.02]"
                      />
                    </FormControl>
                    <FormDescription>
                      Expected completion time in days
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="skills"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Tag className="h-4 w-4" />
                    Required Skills
                  </FormLabel>
                  <FormControl>
                    <div className="space-y-3">
                      <div className="flex gap-2">
                        <Input
                          placeholder="Add a skill (e.g., Solidity, React, Web3)"
                          value={skillInput}
                          onChange={(e) => setSkillInput(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                          className="flex-1 transition-all duration-200 focus:scale-[1.01]"
                        />
                        <Button 
                          type="button" 
                          onClick={addSkill}
                          variant="outline"
                          className="hover:scale-105 transition-transform duration-200"
                        >
                          Add
                        </Button>
                      </div>
                      {field.value.length > 0 && (
                        <div className="flex flex-wrap gap-2 animate-fade-in">
                          {field.value.map((skill) => (
                            <Badge 
                              key={skill} 
                              variant="secondary" 
                              className="group hover:bg-destructive hover:text-destructive-foreground transition-colors duration-200 cursor-pointer"
                              onClick={() => removeSkill(skill)}
                            >
                              {skill}
                              <X className="ml-1 h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormDescription>
                    Add skills required for this job. Click on a skill to remove it.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setOpen(false)}
                className="hover:scale-105 transition-transform duration-200"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isLoading || !isConnected}
                className="hover:scale-105 transition-all duration-200 bg-gradient-to-r from-primary to-primary/80"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground" />
                    Posting Job...
                  </div>
                ) : (
                  "Post Job"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
