import { useCallback } from 'react';
import * as wagmi from 'wagmi';
import { useSigner, useProvider, useContract, useContractRead, useWaitForTransaction } from 'wagmi';
import { ethers } from 'ethers';
import StakeContract from '../contracts/Stake.json';

const useStakeContract = () => {
  const [{ data: signData }, getSigner] = useSigner();
  const provider = useProvider();

  const contract = useContract({
    addressOrName: import.meta.env.VITE_STAKE_CONTRACT,
    contractInterface: StakeContract.abi,
    signerOrProvider: signData || provider
  });

  const readStakeContract = useCallback(
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
    readStakeContract
  };
};
export default useStakeContract;
