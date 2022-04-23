import { useCallback } from 'react';
import * as wagmi from 'wagmi';
import { useSigner, useProvider, useContract, useContractRead, useWaitForTransaction } from 'wagmi';
import { ethers } from 'ethers';
import GravyContract from '../contracts/Gravy.json';

const useGravyContract = () => {
  const [{ data: signData }, getSigner] = useSigner();
  const provider = useProvider();

  const contract = useContract({
    addressOrName: import.meta.env.VITE_GRAVY_CONTRACT,
    contractInterface: GravyContract.abi,
    signerOrProvider: signData || provider
  });

  const readGravyContract = useCallback(
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
    contract,
    readGravyContract
  };
};
export default useGravyContract;
