import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useAccount, useConnect, useNetwork } from 'wagmi';
import { Container, Button, Form, Image, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import { useContractAction, useContractRead, abi, contracts } from '../../hooks/index.js';
import { useMetaMaskAccount } from '../../context/AccountContext';
import Images from '../../assets';
import DisplayCard from '../DisplayCard';
import WalletConnect from '../WalletConnect';
import MintButtons from './MintButtons';
import ConnectPage from '../ConnectPage.jsx';
const Mint = () => {
  const { readContract } = useContractRead(contracts.PUSS, abi.PUSS);
  const [totalSupply, setTotalSupply] = useState(0);
  const [mintAmount, setMintAmount] = useState(0);
  const handleAdd = () => setMintAmount(mintAmount + 1);
  const { connected } = useMetaMaskAccount();
  const handleMinus = () => {
    setMintAmount(mintAmount == 0 ? 0 : mintAmount - 1);
  };

  useEffect(async () => {
    if (connected) {
      const result = await readContract('totalSupply');
      const supply = parseInt(result.data, 16);
      setTotalSupply(supply);
    }
  }, [connected]);

  const [{ data: accountData }, disconnect] = useAccount({
    fetchEns: true
  });

  const { writeContract: mintPussWrite } = useContractAction('mintPuss', contracts.PUSS, abi.PUSS);

  const handleMint = async () => {
    if (mintAmount <= 0) return;
    const txn = await mintPussWrite({
      args: [mintAmount],
      overrides: {
        value: ethers.utils.parseEther(mintAmount.toString(16))
      }
    });
    if (typeof txn.error == 'undefined') {
      setTotalSupply(totalSupply + mintAmount);
      setMintAmount(0);
    }
  };

  if (!connected) {
    return <ConnectPage />;
  }
  return (
    <Container style={{ height: '100%' }} className="text-center " fluid>
      <Styles style={{ height: '100%' }}>
        <Container
          style={{ height: '100%' }}
          className="d-flex flex-col flex-wrap contentContainer justify-content-center align-items-center text-center">
          <Container>
            <h2 className="header">Mint your Puss</h2>
            <Image width={'50%'} roundedCircle={true} className="mt-5" src={Images['puss1']} />
            <p className="bodyText">
              It is a long established fact that a reader will be distracted by the readable content
              of.
            </p>
          </Container>
          <Container>
            <MintButtons
              mintAmount={mintAmount}
              handleMinus={handleMinus}
              handleAdd={handleAdd}
              totalSupply={totalSupply}
              handleMint={handleMint}
            />
          </Container>
        </Container>
      </Styles>
    </Container>
  );
};

export default Mint;

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
  .contentContainer > * {
    flex: 0 0 100%;
  }
`;
