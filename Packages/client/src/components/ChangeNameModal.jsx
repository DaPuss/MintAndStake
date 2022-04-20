import React, { useState } from 'react';
import { Modal, Button, Stack, Form } from 'react-bootstrap';
import { useAccount, useConnect } from 'wagmi';
import styled from 'styled-components';

const ChangeNameModal = ({ handleClose, show, id }) => {
  const [{ data, error }, connect] = useConnect();

  const onNameChange = () => {};

  return (
    <Modal className="text-center" show={show} onHide={handleClose}>
      <Modal.Dialog>
        <Modal.Title className="mt-2">Change Name</Modal.Title>
        <Modal.Body>
          <Form>
            <Form.Control type="text" placeholder="name" />
            <Button className="mt-2" onClick={() => onNameChange()}>
              Change Name
            </Button>
          </Form>
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

export default ChangeNameModal;
