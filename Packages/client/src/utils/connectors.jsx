import { Provider, chain, defaultChains } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { WalletLinkConnector } from 'wagmi/connectors/walletLink';
import { appName } from './constants';
import { providers } from 'ethers';
// API key for Ethereum node
// Two popular services are Infura (infura.io) and Alchemy (alchemy.com)
//const alchemyId = process.env.ALCHEMY_ID
const alchemyId = import.meta.env.VITE_ALCHEMY_ID;
const etherscanApiKey = import.meta.env.VITE_ETHERSCAN_API_KEY;
const infuraId = import.meta.env.VITE_INFURA_ID;

// Chains for connectors to support
const chains = [chain.hardhat, chain.avalancheFuji];
const defaultChain = chain.hardhat;

// export const provider = ({ chainId }) => new providers.Web3Provider(window.ethereum, chainId);
export const provider = ({ chainId }) => {
  if (chain.hardhat.id == chainId) {
    return providers.getDefaultProvider(
      import.meta.env.VITE_APP_PROVIDER_URL /* ,{
    infura: process.env.REACT_APP_INFURA_KEY,
    alchemy: process.env.REACT_APP_ALCHEMY_KEY
  } */
    );
  }
};

export const connectors = ({ chainId }) => {
  return [new InjectedConnector({ chains })];
};
