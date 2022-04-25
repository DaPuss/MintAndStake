import Mint from './components/Mint/Mint';
import Stake from './components/Stake/Stake';
import Gallary from './components/Gallary';
import NavigationBar from './components/NavigationBar';
import Footer from './components/Footer';
import { Route, Routes } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';

const App = () => {
  return (
    <div id="main-container">
      <GlobalStyle />
      <NavigationBar />
      <div id="main-content">
        <Routes>
          <Route path="/stake" element={<Stake />} />
          <Route path="/Gallary" element={<Gallary />} />
          <Route path="/" element={<Mint />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Press Start 2P', cursive;
    background-color: #f6f0c4;
    background-attachment: fixed; /*edit*/
    background-image: linear-gradient(315deg, #f6f0c4 0%, #d99ec9 74%);

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
    .btn-primary:disabled {
      background-color: ${(props) => props.theme.primaryPurple};
      color: ${(props) => props.theme.primaryOrange};
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
    .main-container {
      display: flex;
      min-height: 100vh;
      flex-direction: column;
    }
    
    .main-content {
      flex: 1;
    }
    .main-footer{
      
    }
`;
