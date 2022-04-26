import { useState } from 'react';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';
import { useMetaMaskAccount } from '../context/AccountContext';

const WalletConnect = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { connectedAddr, connected, disconnect, connectToMetaMask, loading, accountErrorMessage } =
    useMetaMaskAccount();

  const getAddress = (address) => {
    return !address
      ? ''
      : `${address.slice(0, 3)}..${address.slice(address.length - 3, address.length)}`;
  };

  return (
    <Styles>
      {connected ? (
        <Button className="mt-2" onClick={disconnect}>
          Disconnect {getAddress(connectedAddr)}
        </Button>
      ) : (
        <Button className="mt-2" onClick={connectToMetaMask}>
          {accountErrorMessage ? accountErrorMessage : 'Connect to MetaMask'}
        </Button>
      )}
    </Styles>
  );
};

export default WalletConnect;

const Styles = styled.div`
  @media (max-width: 768px) {
    .btn-primary {
      text-align: left;
    }
  }
  .btn-primary {
    background-color: ${(props) => props.theme.primaryPurple};
    color: ${(props) => props.theme.primaryOrange};
    text-shadow: 2px 2px ${(props) => props.theme.primaryBlack};
    border-color: ${(props) => props.theme.primaryBlack};
  }
  .btn-primary:hover {
    background-color: ${(props) => props.theme.primaryOrange};
    color: ${(props) => props.theme.primaryPurple};
  }
`;
