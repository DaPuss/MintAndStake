import { useState } from 'react';
import { Container, Button, Card } from 'react-bootstrap';
import styled from 'styled-components';
import puss from '../assets/puss.jpg';

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

const DisplayCard = (props) => {
  const { metaData } = props;
  const { id, name, level, gravyEaten } = metaData;

  return (
    <Styles>
      <Card>
        <Card.Body>
          <Card.Img className="mb-4" variant="top" src={puss} />
          <Card.Title>{name}</Card.Title>
          <Card.Text>Id: {id}</Card.Text>
          <Card.Text>Level: {level}</Card.Text>
          <Card.Text>Gravy Eaten: {gravyEaten}</Card.Text>
        </Card.Body>
      </Card>
    </Styles>
  );
};

export default DisplayCard;
