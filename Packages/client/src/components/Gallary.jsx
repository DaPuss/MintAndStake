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
          Send Dolly on an adventure deep into the dimensions incomprehensible to the avarage Puss,
          here she will travel over vast distances, battle against vicious creatures, and overcome
          any obsticle set in her way so she can bring home liquid gold.... Gravy
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
