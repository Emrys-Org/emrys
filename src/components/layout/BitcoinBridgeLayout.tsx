import { Slide, ToastContainer } from 'react-toastify';

import { BitcoinWalletProvider } from '@/contexts/BitcoinWalletProvider';
import SolanaWalletProvider from '@/contexts/SolanaWalletProvider';
import { ZplClientProvider } from '@/contexts/ZplClientProvider';

import DevInfo from '@/components/DevInfo/DevInfo';
import GlobalModals from '@/components/GlobalModals/GlobalModals';
import Header from '@/components/Header/Header';
import Socials from '@/components/Socials/Socials';

import 'react-toastify/dist/ReactToastify.css';

export default function BitcoinBridgeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SolanaWalletProvider>
      <ZplClientProvider>
        <BitcoinWalletProvider>
          <GlobalModals />
          <div className="wrapper">
            <Header />
            <div className="page-wrapper">{children}</div>
            <Socials />
            <DevInfo />
          </div>
          <ToastContainer
            stacked
            className="orpheus-toast"
            position="top-right"
            autoClose={7500}
            hideProgressBar={false}
            rtl={false}
            pauseOnFocusLoss
            theme="dark"
            pauseOnHover
            transition={Slide}
          />
        </BitcoinWalletProvider>
      </ZplClientProvider>
    </SolanaWalletProvider>
  );
}
