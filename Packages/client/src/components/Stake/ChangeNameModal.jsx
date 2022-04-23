import React, { useState } from 'react';
import { Modal, Button, Stack, Form } from 'react-bootstrap';
import styled from 'styled-components';
import usePussAction from '../../hooks/usePussAction';
import useGravyAction from '../../hooks/useGravyAction';

const ChangeNameModal = ({ handleClose, show, tokenId }) => {
  const [value, setValue] = useState('');
  const { callContract, wait } = usePussAction('changeName');
  const { writeGravyContract, waitGravyContract } = useGravyAction('increaseAllowance');

  const onNameChange = async () => {
    //allowence
    const txnGravy = await writeGravyContract({
      args: [import.meta.env.VITE_PUSS_CONTRACT, 100]
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
