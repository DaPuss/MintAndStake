import React, { useState } from 'react';
import { Modal, Button, Stack, Form } from 'react-bootstrap';
import styled from 'styled-components';
import usePussAction from '../../hooks/usePussAction';
import useGravyAction from '../../hooks/useGravyAction';

const EatGravyModal = ({ handleClose, show, tokenId }) => {
  const [value, setValue] = useState(0);
  const { callContract, wait } = usePussAction('eatGravy');
  const { writeGravyContract, waitGravyContract } = useGravyAction('increaseAllowance');

  const onEatGravy = async () => {
    //TODO: make sure balance is high enough

    const txnGravy = await writeGravyContract({
      args: [import.meta.env.VITE_PUSS_CONTRACT, value]
    });
    if (typeof txnGravy.data !== 'undefined') {
      await waitGravyContract({ wait: txnGravy.data.wait });
    }
    //change name
    const txn = await callContract({
      args: [value, Number(tokenId)]
    });
    if (typeof txn.data !== 'undefined') {
      await wait({ wait: txn.data.wait });
    }
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
