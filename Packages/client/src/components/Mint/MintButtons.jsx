import { Container, Button, Form } from 'react-bootstrap';

const MintButtons = ({ mintAmount, handleMinus, handleAdd, totalSupply, handleMint } = props) => {
  return (
    <Container>
      <p>
        Total Minted: {totalSupply}/{1000}
      </p>
      <Button onClick={handleMinus}>-</Button>
      <Form.Control
        className="w-25 d-inline"
        type="number"
        min="0"
        placeholder="0"
        value={mintAmount}
        disabled
      />
      <Button onClick={handleAdd}>+</Button>
      <Container>
        <Button className="mt-2" onClick={handleMint}>
          Mint
        </Button>
      </Container>
    </Container>
  );
};

export default MintButtons;
