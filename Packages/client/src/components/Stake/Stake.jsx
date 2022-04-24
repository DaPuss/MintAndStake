import { useEffect, useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import { useAccount, useBalance, useConnect } from 'wagmi';
import { BigNumber } from 'ethers';
import styled from 'styled-components';
import { useContractAction, useContractRead, abi, contracts } from '../../hooks/index.js';
import { useMetaMaskAccount } from '../../context/AccountContext';
import WalletConnect from '../WalletConnect';
import StakeGrid from './StakeGrid';
import ConnectPage from '../ConnectPage.jsx';

const Stake = () => {
  const [currentGravy, setCurrentGravy] = useState(0);
  const [claimableGravy, setClaimableGravy] = useState(0);
  const { connectedAddr, connected, disconnect, connectToMetaMask, accountErrorMessage } =
    useMetaMaskAccount();
  const { readContract: readStakeContract } = useContractRead(contracts.STAKE, abi.STAKE);
  const { writeContract: claimGravyWrite } = useContractAction(
    'claimRewards',
    contracts.STAKE,
    abi.STAKE
  );

  const [{ data, error, loading }, getBalance] = useBalance({
    addressOrName: connectedAddr,
    token: import.meta.env.VITE_GRAVY_CONTRACT
  });

  useEffect(async () => {
    if (!connected) return;
    const gravyToClaim = await readStakeContract('calculateRewards', {
      args: connectedAddr
    });
    setClaimableGravy(BigNumber.from(gravyToClaim.data).toNumber());
    const currentGravy = await getBalance();
    setCurrentGravy(BigNumber.from(currentGravy.data.value).toNumber());
  }, [connected]);

  const handleClaimGravy = async () => {
    await claimGravyWrite();
    setClaimableGravy(0);
    const currentGravy = await getBalance();
    setCurrentGravy(BigNumber.from(currentGravy.data.value).toNumber());
  };
  if (!connected) {
    return <ConnectPage />;
  }
  return (
    <Container style={{ height: '100%' }} fluid>
      <Styles>
        <Container className="d-flex-block justify-content-center align-items-center text-center">
          <h2 className="header">All about the $GRAVY</h2>
          <h3 className="">Current Gravy: {currentGravy}</h3>
          <h3 className="">Gravy to claim: {claimableGravy}</h3>
          <Button onClick={handleClaimGravy}>Claim Gravy</Button>
        </Container>
        <Container className="d-flex justify-content-center align-items-center">
          {connected ? <StakeGrid /> : <WalletConnect />}
        </Container>
      </Styles>
    </Container>
  );
};

export default Stake;

const Styles = styled.div`
  .btn-primary {
    margin-right: 0px;
    background-color: ${(props) => props.theme.primaryPurple};
    color: ${(props) => props.theme.primaryOrange};
    text-shadow: 2px 2px ${(props) => props.theme.primaryBlack};
    border-color: ${(props) => props.theme.primaryBlack};
  }
  .btn-primary:hover {
    background-color: ${(props) => props.theme.primaryOrange};
    color: ${(props) => props.theme.primaryPurple};
  }
  .bodyText {
    margin-top: 3rem;
    margin-bottom: 3rem;
  }
`;
