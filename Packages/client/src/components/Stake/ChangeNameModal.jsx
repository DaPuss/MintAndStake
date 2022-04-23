import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import styled from 'styled-components';
import { useContractAction, abi, contracts } from '../../hooks/index.js';

const ChangeNameModal = ({ handleClose, show, tokenId }) => {
  const [value, setValue] = useState('');
  const { writeContract: changeNameWrite } = useContractAction(
    'changeName',
    contracts.PUSS,
    abi.PUSS
  );
  const { writeContract: increaceAllowanceWrite } = useContractAction(
    'increaseAllowance',
    contracts.GRAVY,
    abi.GRAVY
  );

  const onNameChange = async () => {
    //allowence
    await increaceAllowanceWrite({
      args: [import.meta.env.VITE_PUSS_CONTRACT, 100]
    });
    //changeName
    await changeNameWrite({
      args: [value, Number(tokenId)]
    });
    handleClose();
  };

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
            <Button disabled={!value} className="mt-2" onClick={() => onNameChange()}>
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
