import { useAccount, useChainId, useWriteContract, useReadContract } from 'wagmi';
import { parseEther, formatEther } from 'viem';
import { ARBI_FREELANCE_ABI, CONTRACT_ADDRESSES, JobStatus, type Job } from '@/contracts/ArbiFreelance';
import { toast } from '@/hooks/use-toast';

export function useArbiFreelanceContract() {
  const { address, chain } = useAccount();
  const chainId = useChainId();
  const { writeContractAsync } = useWriteContract();

  const contractAddress = chainId === 42161 
    ? CONTRACT_ADDRESSES.arbitrum 
    : CONTRACT_ADDRESSES.arbitrumSepolia;

  const createJob = async (
    title: string,
    description: string,
    budget: string,
    deadline: number,
    skills: string[]
  ) => {
    if (!address) {
      toast({
        title: "Connect Wallet",
        description: "Please connect your wallet to create a job",
        variant: "destructive"
      });
      return;
    }

    try {
      const budgetInWei = parseEther(budget);
      
      const hash = await writeContractAsync({
        address: contractAddress,
        abi: ARBI_FREELANCE_ABI,
        functionName: 'createJob',
        args: [title, description, budgetInWei, BigInt(deadline), skills],
        value: budgetInWei, // Escrow amount
        chain,
        account: address!,
      });

      toast({
        title: "Job Created Successfully!",
        description: `Transaction hash: ${hash}`,
      });

      return hash;
    } catch (error) {
      console.error('Error creating job:', error);
      toast({
        title: "Failed to Create Job",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive"
      });
      throw error;
    }
  };

  const acceptJob = async (jobId: string) => {
    if (!address) {
      toast({
        title: "Connect Wallet",
        description: "Please connect your wallet to accept this job",
        variant: "destructive"
      });
      return;
    }

    try {
      const hash = await writeContractAsync({
        address: contractAddress,
        abi: ARBI_FREELANCE_ABI,
        functionName: 'acceptJob',
        args: [jobId as `0x${string}`],
        chain,
        account: address!,
      });

      toast({
        title: "Job Accepted!",
        description: "You can now start working on this job",
      });

      return hash;
    } catch (error) {
      console.error('Error accepting job:', error);
      toast({
        title: "Failed to Accept Job",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive"
      });
      throw error;
    }
  };

  const submitWork = async (jobId: string) => {
    try {
      const hash = await writeContractAsync({
        address: contractAddress,
        abi: ARBI_FREELANCE_ABI,
        functionName: 'submitWork',
        args: [jobId as `0x${string}`],
        chain,
        account: address!,
      });

      toast({
        title: "Work Submitted!",
        description: "Waiting for client approval",
      });

      return hash;
    } catch (error) {
      console.error('Error submitting work:', error);
      toast({
        title: "Failed to Submit Work",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive"
      });
      throw error;
    }
  };

  const approveWork = async (jobId: string) => {
    try {
      const hash = await writeContractAsync({
        address: contractAddress,
        abi: ARBI_FREELANCE_ABI,
        functionName: 'approveWork',
        args: [jobId as `0x${string}`],
        chain,
        account: address!,
      });

      toast({
        title: "Work Approved!",
        description: "Payment released to freelancer",
      });

      return hash;
    } catch (error) {
      console.error('Error approving work:', error);
      toast({
        title: "Failed to Approve Work",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive"
      });
      throw error;
    }
  };

  const raiseDispute = async (jobId: string) => {
    try {
      const hash = await writeContractAsync({
        address: contractAddress,
        abi: ARBI_FREELANCE_ABI,
        functionName: 'raiseDispute',
        args: [jobId as `0x${string}`],
        chain,
        account: address!,
      });

      toast({
        title: "Dispute Raised",
        description: "Community voting has started",
      });

      return hash;
    } catch (error) {
      console.error('Error raising dispute:', error);
      toast({
        title: "Failed to Raise Dispute",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive"
      });
      throw error;
    }
  };

  const voteOnDispute = async (jobId: string, voteForFreelancer: boolean) => {
    try {
      const hash = await writeContractAsync({
        address: contractAddress,
        abi: ARBI_FREELANCE_ABI,
        functionName: 'voteOnDispute',
        args: [jobId as `0x${string}`, voteForFreelancer],
        chain,
        account: address!,
      });

      toast({
        title: "Vote Submitted",
        description: `Voted ${voteForFreelancer ? 'for' : 'against'} freelancer`,
      });

      return hash;
    } catch (error) {
      console.error('Error voting on dispute:', error);
      toast({
        title: "Failed to Submit Vote",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive"
      });
      throw error;
    }
  };

  return {
    createJob,
    acceptJob,
    submitWork,
    approveWork,
    raiseDispute,
    voteOnDispute,
    contractAddress,
    isConnected: !!address,
  };
}