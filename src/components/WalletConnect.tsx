import { useState } from 'react';
import { Wallet, LogOut } from 'lucide-react';

interface WalletConnectProps {
  walletAddress: string | null;
  setWalletAddress: (address: string | null) => void;
}

export function WalletConnect({ walletAddress, setWalletAddress }: WalletConnectProps) {
  const [isConnecting, setIsConnecting] = useState(false);

  const connectWallet = async () => {
    setIsConnecting(true);
    
    // Check if MetaMask is installed
    if (typeof window !== 'undefined' && (window as any).ethereum) {
      try {
        const accounts = await (window as any).ethereum.request({
          method: 'eth_requestAccounts',
        });
        setWalletAddress(accounts[0]);
      } catch (error) {
        console.error('Failed to connect wallet:', error);
        // Fallback to mock address for demo
        const mockAddress = '0x' + Math.random().toString(16).slice(2, 42).padEnd(40, '0');
        setWalletAddress(mockAddress);
      }
    } else {
      // No wallet extension, use mock address for demo
      const mockAddress = '0x' + Math.random().toString(16).slice(2, 42).padEnd(40, '0');
      setWalletAddress(mockAddress);
    }
    
    setIsConnecting(false);
  };

  const disconnectWallet = () => {
    setWalletAddress(null);
  };

  if (walletAddress) {
    return (
      <div className="flex items-center gap-3">
        <div className="bg-gray-800/50 px-4 py-2 rounded-lg border border-gray-700">
          <p className="text-sm text-gray-300">
            {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
          </p>
        </div>
        <button
          onClick={disconnectWallet}
          className="p-2 bg-red-600/20 hover:bg-red-600/30 rounded-lg border border-red-600/50 transition-colors"
          title="Disconnect Wallet"
        >
          <LogOut className="w-5 h-5 text-red-400" />
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={connectWallet}
      disabled={isConnecting}
      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-lg transition-all disabled:opacity-50"
    >
      <Wallet className="w-5 h-5" />
      <span>{isConnecting ? 'Connecting...' : 'Connect Wallet'}</span>
    </button>
  );
}
