import {
  useContractWrite,
  useSigner,
  useProvider,
  useContract,
  useWaitForTransaction
} from 'wagmi';
import * as wagmi from 'wagmi';
import { ethers } from 'ethers';
import StakeContract from '../contracts/Stake.json';

const useStakeAction = (funcName) => {
  const [{ data: signData }, getSigner] = useSigner();

  const contract = useContract({
    addressOrName: import.meta.env.VITE_STAKE_CONTRACT,
    contractInterface: StakeContract.abi,
    signerOrProvider: signData
  });

  const [{ data, error, loading }, write] = useContractWrite(
    {
      addressOrName: import.meta.env.VITE_STAKE_CONTRACT,
      contractInterface: StakeContract.abi
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
    writeStakeContract: write,
    contract,
    waitData,
    waitError,
    waitLoading,
    wait
  };
};

export default useStakeAction;
