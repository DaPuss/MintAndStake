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

const useContractRead = (functionName, addressOrName, contractInterface) => {
  const [{ data: signData }, getSigner] = useSigner();

  const contract = useContract({
    addressOrName,
    contractInterface,
    signerOrProvider: signData
  });

  const [{ data, error, loading }, write] = useContractWrite(
    {
      addressOrName,
      contractInterface
    },
    functionName
  );

  const [{ data: waitData, error: waitError, loading: waitLoading }, wait] = useWaitForTransaction({
    skip: true
  });

  const writeContract = useCallback(async (params = {}) => {
    try {
      const txn = await write(params);
      if (typeof txn.data !== 'undefined') {
        await wait({ wait: txn.data.wait });
      }
      return txn;
    } catch (error) {
      //TODO: throw toast error
      console.log(error);
    }
  });

  return {
    writeContract
  };
};

export default useContractRead;
