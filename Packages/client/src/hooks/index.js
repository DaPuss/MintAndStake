import GravyContract from '../contracts/Gravy.json';
import PussContract from '../contracts/Puss.json';
import StakeContract from '../contracts/Stake.json';

export const contracts = {
    GRAVY: import.meta.env.VITE_GRAVY_CONTRACT,
    PUSS:import.meta.env.VITE_PUSS_CONTRACT,
    STAKE:import.meta.env.VITE_STAKE_CONTRACT
  };

  export const abi = {
    GRAVY:  GravyContract.abi,
    PUSS: PussContract.abi,
    STAKE: StakeContract.abi,
  };


  export {default as useContractAction} from './useContractAction';
  export {default as useContractRead} from './useContractRead';