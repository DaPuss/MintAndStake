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
        <Button disabled={totalSupply == 1000} className="mt-2" onClick={handleMint}>
          {totalSupply == 1000 ? 'Sold out my guy!' : 'Mint'}
        </Button>
      </Container>
    </Container>
  );
};

export default MintButtons;
