import { Container, Button, CardGroup, Row, Col, Image } from 'react-bootstrap';
import { DataCards } from '../assets/DataCards';
import DisplayCard from './DisplayCard';
import styled from 'styled-components';
import Images from '../assets';

const Styles = styled.div``;

const Gallary = () => {
  return (
    <Styles>
      <Container className="text-center">
        <h1 className="header">The Queen: Dolly</h1>
        <p className="bodyText mt-5 mb-5">Witness The Puss in all her glory!</p>
        <CardGroup>
          <Row xs={1} md={2} lg={4} xl={6} className="g-4">
            {DataCards.map((item) => (
              <Col key={`col_${item.id}`}>
                <DisplayCard key={item.id} metaData={item} />
              </Col>
            ))}
          </Row>
        </CardGroup>
      </Container>
    </Styles>
  );
};

export default Gallary;
