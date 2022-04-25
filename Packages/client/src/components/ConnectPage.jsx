import { Container, Button, Image } from 'react-bootstrap';
import styled from 'styled-components';
import { useMetaMaskAccount } from '../context/AccountContext';
import Images from '../assets';
import WalletConnect from './WalletConnect';

const ConnectPage = () => {
  const { connected } = useMetaMaskAccount();

  const exampleCards = { id: 11, name: 'Puss', level: 100, gravyEaten: 100 };

  return (
    <Container style={{ height: '100%' }} className="text-center " fluid>
      <Styles style={{ height: '100%' }}>
        <Container
          style={{ height: '100%' }}
          className="d-flex flex-col flex-wrap contentContainer justify-content-center align-items-center text-center">
          <Container>
            <h2 className="header">Connect Your Puss</h2>
            <Image width={'50%'} roundedCircle={true} className="mt-5" src={Images['puss20']} />
            <p className="bodyText">
              It's probably a good idea to connect your wallet huh? You won't be doing anything till
              you get around to that....
            </p>
            <WalletConnect />
          </Container>
        </Container>
      </Styles>
    </Container>
  );
};

export default ConnectPage;

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
