import { useState } from 'react';
import { Button, Container, Form, Row, Col } from 'react-bootstrap';
import WalletConnect from './WalletConnect';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { RiDiscordLine, RiTwitterLine } from 'react-icons/Ri';

const FooterBar = ({ className }) => {
  return (
    <div className={className}>
      <Container fluid className="footerContainer mt-5 mb-3">
        <Row xs={1} md={2}>
          <Col>
            <a href="https://twitter.com/DollyThePuss" target="_blank">
              <Button className="m-2">
                <RiTwitterLine size={50} />
              </Button>
            </a>
            <a href="https://discord.com/users/ThePuss#6656" target="_blank">
              <Button className="m-2">
                <RiDiscordLine size={50} />
              </Button>
            </a>
          </Col>
          <Col>
            <p>Created by @ThePuss 2022</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const Footer = styled(FooterBar)`
  .footerContainer {
    position: relative;
    bottom: 0px;
    left: 0px;
    width: 100%;
    display: flex;
  }
  .btn-primary {
    background-color: transparent;
    border: none;
  }
  .row {
    width: 100%;
  }
  @media (min-width: 768px) {
    p {
      text-align: right;
      margin-left: 0;
    }
  }
  p {
    margin-left: 20px;
    margin-top: 25px;
  }
`;

export default Footer;
