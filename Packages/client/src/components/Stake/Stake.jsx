import { useEffect, useState } from 'react';
import { Container, Button, Form, Row, Col } from 'react-bootstrap';
import { useAccount, useBalance, useConnect } from 'wagmi';
import { BigNumber } from 'ethers';
import WalletConnect from '../WalletConnect';
import StakeGrid from './StakeGrid';
import styled from 'styled-components';
import useStakeContract from '../../hooks/useStakeContract';
import useGravyContract from '../../hooks/useGravyContract';
import useStakeAction from '../../hooks/useStakeAction';

const Stake = () => {
  const [currentGravy, setCurrentGravy] = useState(0);
  const [claimableGravy, setClaimableGravy] = useState(0);
  const [{ data: accountData }, disconnect] = useAccount({
    fetchEns: true
  });
  const { writeStakeContract: claimGravy, wait: waitGravyClaim } = useStakeAction('claimRewards');
  const { readStakeContract } = useStakeContract();
  const { readGravyContract } = useGravyContract();
  const [{ data, error, loading }, getBalance] = useBalance({
    addressOrName: '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199',
    token: import.meta.env.VITE_GRAVY_CONTRACT,
    watch: true
  });

  useEffect(async () => {
    if (!accountData?.address) return;
    const gravyToClaim = await readStakeContract('calculateRewards', {
      args: accountData.address
    });
    console.log('Claim: ', gravyToClaim.data);
    setClaimableGravy(BigNumber.from(gravyToClaim.data).toNumber());
    const currentGravy = await getBalance();
    console.log('Current: ', currentGravy);
    setCurrentGravy(BigNumber.from(currentGravy.data.value).toNumber());
  }, [accountData?.address]);

  const handleClaimGravy = async () => {
    const txn = await claimGravy();
    if (typeof txn.data !== 'undefined') {
      await waitGravyClaim({ wait: txn.data.wait });
    }
    console.log('Claimed boi! : ', txn);
    const gravyToClaim = await readStakeContract('calculateRewards', {
      args: accountData.address
    });
    console.log('Claim: ', gravyToClaim.data);
    setCurrentGravy(currentGravy + BigNumber.from(gravyToClaim.data).toNumber());
    setClaimableGravy(0);
  };

  return (
    <Container fluid>
      <Styles>
        <Container className="d-flex-block justify-content-center align-items-center text-center">
          <h2 className="header">Earn Some Gravy</h2>
          <p className="bodyText">
            Send Dolly on an adventure deep into the dimensions incomprehensible to the avarage
            Puss, here she will travel over vast distances, battle against vicious creatures, and
            overcome any obsticle set in her way so she can bring home liquid gold.... Gravy
          </p>
          <p className="bodyText">Send your Dolly one an adventure, bring home some gravy!</p>
          <h3 className="">Current Gravy: {currentGravy}</h3>
          <h3 className="">Gravy to claim: {claimableGravy}</h3>
          <Button onClick={handleClaimGravy}>Claim Gravy</Button>
        </Container>
        <Container className="d-flex justify-content-center align-items-center">
          {true ? <StakeGrid /> : <WalletConnect />}
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
