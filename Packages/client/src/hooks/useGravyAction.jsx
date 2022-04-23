import {
  useContractWrite,
  useSigner,
  useProvider,
  useContract,
  useWaitForTransaction
} from 'wagmi';
import * as wagmi from 'wagmi';
import { ethers } from 'ethers';
import GravyContract from '../contracts/Gravy.json';

const useGravyAction = (funcName) => {
  const [{ data: signData }, getSigner] = useSigner();

  const contract = useContract({
    addressOrName: import.meta.env.VITE_GRAVY_CONTRACT,
    contractInterface: GravyContract.abi,
    signerOrProvider: signData
  });

  const [{ data, error, loading }, write] = useContractWrite(
    {
      addressOrName: import.meta.env.VITE_GRAVY_CONTRACT,
      contractInterface: GravyContract.abi
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
    writeGravyContract: write,
    contract,
    waitData,
    waitError,
    waitLoading,
    waitGravyContract: wait
  };
};

export default useGravyAction;
