import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { SolidButton } from '../components/buttons/SolidButton';
import { APP_DESCRIPTION, APP_NAME } from '../consts/app';

const Home: NextPage = () => {
  const router = useRouter();

  const handleStartBridging = () => {
    router.push('/bridge');
  };

  return (
    <div className="flex flex-col items-center justify-center px-6 py-20 text-center sm:min-h-[60vh] sm:py-0">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
          {APP_NAME}
        </h1>
        
        <p className="mt-6 text-xl text-white/90 sm:text-2xl">
          {APP_DESCRIPTION}
        </p>
        
        <div className="mt-8 max-w-2xl">
          <p className="mb-6 text-lg text-white/80">
            Emrys is a powerful cross-chain bridge powered by Hyperlane's secure interoperability protocol. 
            Seamlessly transfer tokens between different blockchains with minimal fees and maximum security.
          </p>
          
          <ul className="mb-8 list-inside list-disc space-y-2 text-left text-white/80">
            <li>Fast, secure transfers between multiple chains</li>
            <li>Support for native tokens and popular standards</li>
            <li>Simple, user-friendly interface</li>
            <li>Powered by Hyperlane's battle-tested infrastructure</li>
          </ul>
        </div>
        
        <div className="mt-10">
          <SolidButton 
            onClick={handleStartBridging}
            className="px-8 py-3 text-lg font-medium transition-all duration-300 hover:scale-105"
            color="accent"
          >
            Start Bridging
          </SolidButton>
        </div>
      </div>
    </div>
  );
};

export default Home;
