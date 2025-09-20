import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { arbitrum, arbitrumSepolia } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'ArbiFreelance',
  projectId: 'YOUR_PROJECT_ID', // Get this from WalletConnect Cloud
  chains: [arbitrum, arbitrumSepolia],
  ssr: false, // If using SSR (server-side rendering)
});