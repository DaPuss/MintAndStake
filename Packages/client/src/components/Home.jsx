import { Container, Button, CardGroup, Row, Col, Image } from 'react-bootstrap';
import DisplayCard from './DisplayCard';
import styled from 'styled-components';
import puss from '../assets/puss.jpg';

const Styles = styled.div``;

const Home = () => {
  const exampleCards = [
    { id: 11, name: 'Puss', level: 100, gravyEaten: 100 },
    { id: 22, name: 'Puss', level: 100, gravyEaten: 100 }
  ];

  return (
    <Styles>
      <Container className="text-center">
        <h1 className="header">The Puss NFT Collection</h1>
        <h2>The Queen: Dolly</h2>
        <Image width={'50%'} roundedCircle={true} className="mt-5" src={puss} />
        <h2 className="mt-5 mb-5">The Story</h2>
        <p className="bodyText mt-5 mb-5">
          Send Dolly on an adventure deep into the dimensions incomprehensible to the avarage Puss,
          here she will travel over vast distances, battle against vicious creatures, and overcome
          any obsticle set in her way so she can bring home liquid gold.... Gravy
        </p>
        <h2 className="mt-5 mb-5">Show me the goods!</h2>
        <CardGroup>
          <Row xs={1} md={2} className="g-4">
            {exampleCards.map((item) => (
              <Col key={`col_${item.id}`}>
                <DisplayCard key={item.id} metaData={item} />
              </Col>
            ))}
          </Row>
        </CardGroup>
        <h2 className="mt-5 mb-5">What can she do?</h2>
        <p className="bodyText mt-5 mb-5">Eat Gravy baby</p>
        <h2 className="mt-5 mb-5">Connect with me</h2>
        <p className="bodyText mt-5 mb-5">
          If you'd like to connect, get in touch via Discord or Twitter. I'm always happy to talk :)
        </p>
      </Container>
    </Styles>
  );
};

export default Home;
