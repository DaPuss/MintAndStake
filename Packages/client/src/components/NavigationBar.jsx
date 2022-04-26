import { useState, useRef, useEffect } from 'react';
import { Navbar, Image, Nav, Container, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import WalletConnect from './WalletConnect';
import styled from 'styled-components';

const Navigation = ({ className }) => {
  const [navBackground, setNavBackground] = useState(false);

  const navRef = useRef();
  navRef.current = navBackground;
  useEffect(() => {
    const handleScroll = () => {
      const show = window.scrollY > 50;
      if (navRef.current !== show) {
        setNavBackground(show);
      }
    };
    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={className}>
      <Navbar
        expand="md"
        fixed="top"
        collapseOnSelect
        className={`navbarBackgroundResponsive ${
          navBackground ? 'navbarBackground' : 'bg-transparent'
        }`}>
        <Navbar.Brand className="margin" href="/">
          PUSS NFT
        </Navbar.Brand>
        <Navbar.Toggle className="margin" aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="m-auto">
            <Nav.Link as={Link} to="/">
              Mint
            </Nav.Link>
            <Nav.Link as={Link} to="/stake">
              Adventure
            </Nav.Link>
            <Nav.Link as={Link} to="/Gallary">
              Gallary
            </Nav.Link>
          </Nav>
          <Form className={'margin'}>
            <WalletConnect />
          </Form>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

const NavigationBar = styled(Navigation)`
  @media (min-width: 768px) {
    .navbarBackground {
      background-color: rgba(255, 182, 193, 0.9) !important;
    }
  }

  @media (max-width: 768px) {
    .navbarBackgroundResponsive {
      background-color: rgba(255, 182, 193, 0.9) !important;
    }
    .btn-primary {
      background-color: transparent !important;
      border: none;
      font-size: 1.5rem;
      padding-left: 0 !important;
      padding-top: 0 !important;
      margin-left: 0px;
    }
    .margin {
      margin-left: 2rem !important;
    }
    .nav-link {
      font-size: 1.5rem;
      color: ${(props) => props.theme.primaryOrange} !important;
      text-shadow: 2px 2px ${(props) => props.theme.primaryBlack};
    }
  }

  .nav-link {
    margin-left: 2rem;
    margin-right: 2rem;
    font-size: 1.5rem;
    color: ${(props) => props.theme.primaryOrange} !important;
    text-shadow: 2px 2px ${(props) => props.theme.primaryBlack};
  }
  .nav-link:hover {
    color: ${(props) => props.theme.primaryPurple} !important;
    font-size: 1.8rem;
    padding: 0.5rem 0.5rem 0 0.5rem;
  }
  .navbar-brand {
    margin-right: 2rem;
    margin-left: 2rem !important;
  }
  .navbar-toggler {
    background-color: ${(props) => props.theme.primaryPurple};
    color: white;
  }
  .margin {
    margin-right: 10px;
    margin-left: 10px;
  }
`;

export default NavigationBar;
