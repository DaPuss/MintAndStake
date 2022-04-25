import { Provider, chain, defaultChains } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { WalletLinkConnector } from 'wagmi/connectors/walletLink';
import { appName } from './constants';
import { providers } from 'ethers';

const alchemyId = import.meta.env.VITE_ALCHEMY_ID;
const etherscanApiKey = import.meta.env.VITE_ETHERSCAN_API_KEY;
const infuraId = import.meta.env.VITE_INFURA_ID;

const chains = [chain.avalancheFuji];
const defaultChain = chain.avalancheFuji;

export const provider = ({ chainId }) => {
  return providers.getDefaultProvider(import.meta.env.VITE_APP_PROVIDER_URL);
};

export const connectors = ({ chainId }) => {
  return [new InjectedConnector({ chains })];
};
