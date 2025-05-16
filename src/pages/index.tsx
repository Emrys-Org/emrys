import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { SolidButton } from '../components/buttons/SolidButton';
import FaqChat from '../components/faq/FaqChat';
import { APP_DESCRIPTION, APP_NAME } from '../consts/app';

const Home: NextPage = () => {
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleStartBridging = () => {
    setShowDropdown(!showDropdown);
  };

  const navigateToBridge = (network: string) => {
    if (network === 'utxo') {
      window.open('https://google.com', '_blank');
      setShowDropdown(false);
      return;
    }
    
    if (network === 'mainnet') {
      router.push('/bridge');
    } else {
      // For testnet, you can define a different route if needed
      router.push('/bridge?network=testnet');
    }
    setShowDropdown(false);
  };

  return (
    <div className="flex flex-col items-center justify-center px-6 py-10 text-center">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
          {APP_NAME}
        </h1>
        
        <p className="mt-6 text-xl text-white/90 sm:text-2xl">
          {APP_DESCRIPTION}
        </p>
        
        <div className="mt-8 max-w-2xl">
          <p className="mb-6 text-lg text-white/80">
            Emrys is a powerful cross-chain bridge powered by our own forked version of SVM & IBC implementation. 
            Seamlessly transfer tokens between different blockchains with minimal fees and maximum security.
          </p>
          
          <ul className="mb-8 list-inside list-disc space-y-2 text-left text-white/80">
            <li>Fast, secure transfers between multiple chains</li>
            <li>Support for native tokens and popular standards</li>
            <li>Simple, user-friendly interface</li>
            <li>Powered by our own forked version of SVM & IBC implementation</li>
          </ul>
        </div>
        
        <div className="mt-10 relative">
          <SolidButton 
            onClick={handleStartBridging}
            className="px-8 py-3 text-lg font-medium transition-all duration-300 hover:scale-105"
            color="accent"
          >
            Start Bridging
          </SolidButton>
          
          {showDropdown && (
            <div className="absolute mt-2 w-full rounded-md shadow-lg bg-white overflow-hidden z-10">
              <div className="py-1">
                <button
                  onClick={() => navigateToBridge('mainnet')}
                  className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                >
                  Bridge on Mainnet
                </button>
                <button
                  onClick={() => navigateToBridge('testnet')}
                  className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                >
                  Bridge on Testnet
                </button>
                <button
                  onClick={() => navigateToBridge('utxo')}
                  className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                >
                  ZPL UTXO Bridge
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="w-full mt-16 pb-10">
        <h2 className="text-2xl font-bold text-white mb-6">Have Questions? Ask Our AI Assistant</h2>
        <FaqChat />
      </div>
    </div>
  );
};

export default Home;
