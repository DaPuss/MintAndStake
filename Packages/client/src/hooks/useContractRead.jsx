import { useCallback } from 'react';
import {
  useContractWrite,
  useSigner,
  useProvider,
  useContract,
  useWaitForTransaction
} from 'wagmi';
import * as wagmi from 'wagmi';
import { ethers } from 'ethers';

const useContractRead = (addressOrName, contractInterface) => {
  const [{ data: signData }, getSigner] = useSigner();
  const provider = useProvider();

  const contract = useContract({
    addressOrName,
    contractInterface,
    signerOrProvider: signData ?? provider
  });

  const readContract = useCallback(
    async (functionName, config = {}) => {
      const { args, overrides } = config;
      try {
        const config_ = config ?? { args, overrides };
        const params = [
          ...(Array.isArray(config_.args) ? config_.args : config_.args ? [config_.args] : []),
          ...(config_.overrides ? [config_.overrides] : [])
        ];
        const response = await contract[functionName](...params);
        return { data: response, error: undefined };
      } catch (error) {
        console.log('failed to fetch data', error);
        return { data: undefined, error };
      }
    },
    [contract]
  );

  return {
    readContract
  };
};

export default useContractRead;
