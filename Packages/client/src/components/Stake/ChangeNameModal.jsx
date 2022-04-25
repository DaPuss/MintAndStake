import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import styled from 'styled-components';
import { useContractAction, abi, contracts } from '../../hooks/index.js';

const ChangeNameModal = ({ handleClose, show, tokenId, onNameChange }) => {
  const [value, setValue] = useState('');

  return (
    <Modal className="text-center" show={show} onHide={handleClose}>
      <Modal.Dialog>
        <Modal.Title className="mt-2">Change Name</Modal.Title>
        <Modal.Body>
          <Form>
            <Form.Control
              type="text"
              placeholder="name"
              onChange={(e) => setValue(e.target.value)}
            />
            <Button disabled={!value} className="mt-2" onClick={() => onNameChange(value)}>
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
