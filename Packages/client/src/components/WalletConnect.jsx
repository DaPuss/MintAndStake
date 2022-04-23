import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useAccount, useConnect } from 'wagmi';
import WalletConnectModal from './WalletConnectModal';
import styled from 'styled-components';

const Styles = styled.div`
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

const WalletConnect = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [{ data: accountData }, disconnect] = useAccount({
    fetchEns: true
  });

  const getAddress = (address) => {
    return !address
      ? ''
      : `${address.slice(0, 3)}..${address.slice(address.length - 3, address.length)}`;
  };

  if (accountData) {
    return (
      <div>
        <Button onClick={disconnect}>Disconnect {getAddress(accountData.address)}</Button>
      </div>
    );
  }

  return (
    <Styles>
      <Button className="mt-2" onClick={handleShow}>
        Connect
      </Button>
      <WalletConnectModal handleClose={handleClose} show={show} />
    </Styles>
  );
};

export default WalletConnect;
