import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import styled from 'styled-components';
import { useContractAction, abi, contracts } from '../../hooks/index.js';

const EatGravyModal = ({ handleClose, show, tokenId }) => {
  const [value, setValue] = useState(0);
  const { writeContract: increaceAllowanceWrite } = useContractAction(
    'increaseAllowance',
    contracts.GRAVY,
    abi.GRAVY
  );
  const { writeContract: eatGravyWrite } = useContractAction('eatGravy', contracts.PUSS, abi.PUSS);

  const onEatGravy = async () => {
    //TODO: make sure balance is high enough
    //allowence
    await increaceAllowanceWrite({
      args: [import.meta.env.VITE_PUSS_CONTRACT, value]
    });
    //eatGravy
    await eatGravyWrite({
      args: [value, Number(tokenId)]
    });
    handleClose();
  };

  return (
    <Modal className="text-center" show={show} onHide={handleClose}>
      <Modal.Dialog>
        <Modal.Title className="mt-2">Eat Gravy</Modal.Title>
        <Modal.Body>
          <Form>
            <Form.Control
              min="0"
              type="number"
              placeholder="0"
              onChange={(e) => setValue(e.target.value)}
            />
            <Button disabled={value < 0} className="mt-2" onClick={() => onEatGravy()}>
              Eat Gravy
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

export default EatGravyModal;
