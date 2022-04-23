import {
  useContractWrite,
  useSigner,
  useProvider,
  useContract,
  useWaitForTransaction
} from 'wagmi';
import * as wagmi from 'wagmi';
import { ethers } from 'ethers';
import PussContract from '../contracts/Puss.json';

const usePussAction = (funcName) => {
  const [{ data: signData }, getSigner] = useSigner();

  const contract = useContract({
    addressOrName: import.meta.env.VITE_PUSS_CONTRACT,
    contractInterface: PussContract.abi,
    signerOrProvider: signData
  });

  const [{ data, error, loading }, write] = useContractWrite(
    {
      addressOrName: import.meta.env.VITE_PUSS_CONTRACT,
      contractInterface: PussContract.abi
    },
    funcName
  );

  const [{ data: waitData, error: waitError, loading: waitLoading }, wait] = useWaitForTransaction({
    skip: true
  });

  return {
    txnData: data,
    txnError: error,
    txnLoading: loading,
    callContract: write,
    PussContract,
    waitData,
    waitError,
    waitLoading,
    wait
  };
};

export default usePussAction;
