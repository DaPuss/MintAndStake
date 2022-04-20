import React, { useState } from 'react';
import { Modal, Button, Stack } from 'react-bootstrap';
import { useAccount, useConnect } from 'wagmi';
import styled from 'styled-components';

const WalletConnectModal = ({ handleClose, show }) => {
  const [{ data, error }, connect] = useConnect();

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title className="m-auto">Connect Wallet</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Stack gap={3}>
            {data.connectors.map((connector, index) => (
              <React.Fragment key={index}>
                {connector?.ready && (
                  <Button className="bg-none" key={connector.id} onClick={() => connect(connector)}>
                    {connector.name}
                  </Button>
                )}
              </React.Fragment>
            ))}
          </Stack>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </Modal>
  );
};

export default WalletConnectModal;
