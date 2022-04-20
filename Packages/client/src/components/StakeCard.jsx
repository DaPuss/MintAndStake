import { useState } from 'react';
import { Container, Button, Card } from 'react-bootstrap';
import { useAccount, useConnect } from 'wagmi';
import styled from 'styled-components';
import puss from '../assets/puss.jpg';
import StakeCardModal from './ChangeNameModal';
import EatGravyModal from './EatGravyModal';
import ChangeNameModal from './ChangeNameModal';

const Styles = styled.div`
  .card {
    box-sizing: border-box;
    border-radius: 6px;
    border-width: 3px;
    border-color: ${(props) => props.theme.primaryBlack};
    background-color: ${(props) => props.theme.primaryLightGrey};
  }
  .card:hover,
  .card::selection,
  .selected,
  .card:hover > .card-body > .card-img-top,
  .selected > .card-body > .card-img-top {
    box-sizing: border-box;
    cursor: pointer;
    border-color: ${(props) => props.theme.primaryPurple} !important;
  }

  .card-img-top {
    border-radius: 6px;
    border-width: 3px;
    border-style: solid;
    border-color: ${(props) => props.theme.primaryBlack};
  }
`;

const StakeCard = (props) => {
  const [showNameChange, setShowNameChange] = useState(false);
  const [showGravy, setShowGravy] = useState(false);

  const handleCloseNamechange = () => setShowNameChange(false);
  const handleShowNamechange = () => setShowNameChange(true);
  const handleCloseGravy = () => setShowGravy(false);
  const handleShowGravy = () => setShowGravy(true);

  const [{ data: accountData }, disconnect] = useAccount({
    fetchEns: true
  });

  const { handleClick, metaData, selected } = props;
  const { id, name, level, gravyEaten } = metaData;
  const cardSelected = selected ? 'selected' : '';

  return (
    <Styles>
      <Card className={cardSelected} onClick={() => handleClick(id)}>
        <Card.Body>
          <Card.Img className="mb-4" variant="top" src={puss} />
          <Card.Title>{name}</Card.Title>
          <Card.Text>Id: {id}</Card.Text>
          <Card.Text>Level: {level}</Card.Text>
          <Card.Text>Gravy Eaten: {gravyEaten}</Card.Text>
          <ChangeNameModal handleClose={handleCloseNamechange} show={showNameChange} />
          <Button onClick={handleShowNamechange} className={'w-100 mb-2'} id={id} variant="primary">
            Change Name
          </Button>
          <EatGravyModal handleClose={handleCloseGravy} show={showGravy} />
          <Button onClick={handleShowGravy} className={'w-100'} id={id} variant="primary">
            Eat Gravy
          </Button>
        </Card.Body>
      </Card>
    </Styles>
  );
};

export default StakeCard;