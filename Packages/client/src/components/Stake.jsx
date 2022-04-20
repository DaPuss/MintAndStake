import { useState } from 'react';
import { Container, Button, Form, Row, Col } from 'react-bootstrap';
import { useAccount, useConnect } from 'wagmi';
import WalletConnect from './WalletConnect';
import StakeGrid from './StakeGrid';
import styled from 'styled-components';

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

const Stake = () => {
  const [{ data: accountData }, disconnect] = useAccount({
    fetchEns: true
  });

  return (
    <Container className="" fluid>
      <Styles>
        <Container className="d-flex-block justify-content-center align-items-center text-center">
          <h2 className="header">Earn Some Gravy</h2>
          <p className="bodyText">
            Send Dolly on an adventure deep into the dimensions incomprehensible to the avarage
            Puss, here she will travel over vast distances, battle against vicious creatures, and
            overcome any obsticle set in her way so she can bring home liquid gold.... Gravy
          </p>
          <p className="bodyText">Send your Dolly one an adventure, bring home some gravy!</p>
        </Container>
        <Container className="d-flex justify-content-center align-items-center"></Container>
        <Container className="d-flex justify-content-center align-items-center">
          {true ? <StakeGrid /> : <WalletConnect />}
        </Container>
      </Styles>
    </Container>
  );
};

export default Stake;
