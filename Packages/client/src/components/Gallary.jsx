import { Container, Button, CardGroup, Row, Col, Image } from 'react-bootstrap';
import { DataCards } from '../assets/DataCards';
import DisplayCard from './DisplayCard';
import styled from 'styled-components';

const Styles = styled.div``;

const Gallary = () => {
  return (
    <Styles>
      <Container className="text-center">
        <h1 className="header">The Queen: Dolly</h1>
        <p className="bodyText">
          Witness the almighty power of the gravy queen. Dolly was a brave hero that lived through
          many great wars and battles. During her lifetime she took down General Morty to save the
          Glenmore Kindgom from invasion. She placed a foolproof mess trap in the hallways of her
          castle to prevent assasians attacking her during the night. She was always ready to defend
          and would often have her claws at the ready.
        </p>
        <p className="bodyText">
          Dolly was not only a brave figher but an excellent athlete, competing in many evens such
          as the sprint, wall steering, hallway watering, and the lap sit. Dolly was adored by the
          masses, and enjoyed visits to her disciples where she would get what every queen wanted.
          Tummy rubs.
        </p>
        <p className="bodyText mt-5 mb-5">Witness The Puss in all her glory!</p>
        <CardGroup>
          <Row xs={1} md={2} lg={4} className="g-4">
            {DataCards.map((item, index) => (
              <Col key={`col_${index}`}>
                <DisplayCard key={`img_${index}`} metaData={item} />
              </Col>
            ))}
          </Row>
        </CardGroup>
      </Container>
    </Styles>
  );
};

export default Gallary;
