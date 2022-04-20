import React, { useState } from 'react';
import { Modal, Button, Stack, Form } from 'react-bootstrap';
import { useAccount, useConnect } from 'wagmi';
import styled from 'styled-components';

const EatGravyModal = ({ handleClose, show, id }) => {
  const [{ data, error }, connect] = useConnect();

  const onEatGravy = () => {};

  return (
    <Modal className="text-center" show={show} onHide={handleClose}>
      <Modal.Dialog>
        <Modal.Title className="mt-2">Eat Gravy</Modal.Title>
        <Modal.Body>
          <Form>
            <Form.Control min="0" type="number" placeholder="0" />
            <Button className="mt-2" onClick={() => onEatGravy()}>
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
