import { useState } from 'react';
import { Container, Button, Form, Row, Col } from 'react-bootstrap';
import { useAccount, useConnect } from 'wagmi';
import WalletConnect from './WalletConnect';
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

const Mint = () => {
  const [mintAmount, setMintAmount] = useState(0);
  const handleAdd = () => setMintAmount(mintAmount + 1);
  const handleMinus = () => {
    let amount = mintAmount - 1;
    if (amount <= 0) amount = 0;
    setMintAmount(amount);
  };
  const [{ data: accountData }, disconnect] = useAccount({
    fetchEns: true
  });

  const handleMint = () => {};
  const totalMinted = 0;
  const maxMintAmount = 10000;

  return (
    <Container className="text-center" fluid>
      <Styles>
        <Container className="d-flex-block justify-content-center align-items-center text-center">
          <h2 className="header">Mint your Puss</h2>
          <p className="bodyText">
            It is a long established fact that a reader will be distracted by the readable content
            of.
          </p>
          <p className="bodyText">
            It is a long established fact that a reader will be distracted by the readable content
            of.
          </p>
        </Container>
        <p>
          Total Minted: {totalMinted}/{maxMintAmount}
        </p>
        <Container className="d-flex justify-content-center align-items-center">
          <Button onClick={handleMinus}>-</Button>
          <Form.Control
            className="w-25 d-inline"
            type="number"
            min="0"
            placeholder="0"
            value={mintAmount}
            disabled
          />
          <Button onClick={handleAdd}>+</Button>
        </Container>
        <Container className="d-flex justify-content-center align-items-center">
          {accountData ? (
            <Button className="mt-2" onClick={handleMint}>
              Mint
            </Button>
          ) : (
            <WalletConnect />
          )}
        </Container>
      </Styles>
    </Container>
  );
};

export default Mint;
