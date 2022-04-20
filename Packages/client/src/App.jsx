import Mint from './components/Mint';
import Stake from './components/Stake';
import Home from './components/Home';
import NavigationBar from './components/NavigationBar';
import Footer from './components/Footer';
import { Route, Routes } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import { Container } from 'react-bootstrap';
import background from './assets/background.jpg';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Press Start 2P', cursive;
    background-image: url(${background});
    background-size:cover;
    }
    .btn-primary {
      margin-right: 0px;
      background-color: ${(props) => props.theme.primaryPurple};
      color: ${(props) => props.theme.primaryOrange};
      text-shadow: 2px 2px ${(props) => props.theme.primaryBlack};
      border-color: ${(props) => props.theme.primaryBlack};
    }
    .btn-primary:hover {
      background-color: ${(props) => props.theme.primaryOrange};
      color: ${(props) => props.theme.primaryPurple};
    }
    .modal-content{
      background-color: ${(props) => props.theme.primaryLightGrey};;
      border-width: 4px;
      border-color: ${(props) => props.theme.primaryBlack};
    }
    .header {
      margin-top: 5rem;
      margin-bottom: 5rem;
    }
`;

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Container fluid>
        <NavigationBar />
        <Routes>
          <Route path="/mint" element={<Mint />} />
          <Route path="/stake" element={<Stake />} />
          <Route path="/" element={<Home />} />
        </Routes>
        <Footer />
      </Container>
    </>
  );
};

export default App;
