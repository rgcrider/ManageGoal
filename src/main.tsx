import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Inject mock window.ethereum if not present to allow headless/sandboxed MetaMask testing & seamless simulation
if (typeof window !== "undefined" && !(window as any).ethereum) {
  const listeners = new Set<(accounts: string[]) => void>();
  (window as any).ethereum = {
    isMetaMask: true,
    isSimulated: true,
    request: async (args: { method: string; params?: any[] }) => {
      if (args.method === "eth_requestAccounts" || args.method === "eth_accounts") {
        return ["0x71C7656EC7ab88b098defB751B7401B5f6d8976F"];
      }
      if (args.method === "eth_sendTransaction") {
        return "0x" + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join("");
      }
      return null;
    },
    on: (event: string, callback: any) => {
      if (event === "accountsChanged") {
        listeners.add(callback);
      }
    },
    removeListener: (event: string, callback: any) => {
      if (event === "accountsChanged") {
        listeners.delete(callback);
      }
    }
  };
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

