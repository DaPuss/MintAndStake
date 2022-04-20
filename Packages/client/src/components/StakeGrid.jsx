import { useState } from 'react';
import { Container, Button, CardGroup, Card, Row, Col } from 'react-bootstrap';
import { useAccount, useConnect } from 'wagmi';
import StakeCard from './StakeCard';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Styles = styled.div`
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
  h2 {
    text-decoration: underline;
    text-decoration-thickness: 3px;
  }
`;

const StakeGrid = () => {
  const [{ data: accountData }, disconnect] = useAccount({
    fetchEns: true
  });

  const [selectedStakedId, setSelectedStakedId] = useState([]);
  const [selectedUnstakedId, setSelectedUnstakedId] = useState([]);

  const handleStakedCardClick = (id) => {
    let stakedNew = selectedStakedId;
    if (!selectedStakedId.includes(id)) {
      stakedNew = [...stakedNew, id];
    } else {
      stakedNew = stakedNew.filter((value) => value != id);
    }
    setSelectedStakedId(stakedNew);
  };

  const handleUnstakedCardClick = (id) => {
    let unstakedNew = selectedUnstakedId;
    if (!selectedUnstakedId.includes(id)) {
      unstakedNew = [...unstakedNew, id];
    } else {
      unstakedNew = unstakedNew.filter((value) => value != id);
    }
    setSelectedUnstakedId(unstakedNew);
  };

  const handleStakeClick = () => {
    console.log('stake me: ' + selectedUnstakedId);
  };

  const handleUnstakeClick = () => {
    console.log('unstake me: ' + selectedStakedId);
  };

  const staked = [
    { id: 11, name: 'Puss', level: 100, gravyEaten: 100 },
    { id: 22, name: 'Puss', level: 100, gravyEaten: 100 },
    { id: 33, name: 'Puss', level: 100, gravyEaten: 100 },
    { id: 44, name: 'Puss', level: 100, gravyEaten: 100 }
  ];
  const unstaked = [
    { id: 1, name: 'Puss', level: 100, gravyEaten: 100 },
    { id: 2, name: 'Puss', level: 100, gravyEaten: 100 },
    { id: 3, name: 'Puss', level: 100, gravyEaten: 100 },
    { id: 4, name: 'Puss', level: 100, gravyEaten: 100 }
  ];

  if (unstaked.length == 0 && staked.length == 0) {
    const navigate = useNavigate();
    return (
      <Container className="text-center" fluid>
        <h1 className="m-4">You currently own no Puss</h1>
        <h2 className="m-4">Head over and mint some!</h2>
        <Button onClick={() => navigate('/mint')} className="m-4">
          Mint
        </Button>
      </Container>
    );
  }

  return (
    <Container className="text-center" fluid>
      <Styles>
        {staked.length > 0 && (
          <>
            <h2 className="m-4">Puss Currently On Adventure</h2>
            <CardGroup>
              <Row xs={1} md={2} lg={3} xl={4} className="g-4">
                {staked.map((item) => (
                  <Col key={`col_${item.id}`}>
                    <StakeCard
                      key={item.id}
                      handleClick={handleStakedCardClick}
                      metaData={item}
                      selected={selectedStakedId.includes(item.id)}
                    />
                  </Col>
                ))}
              </Row>
            </CardGroup>
            <Button onClick={handleUnstakeClick} className="m-4">
              Send to Sleep
            </Button>
          </>
        )}
        {unstaked.length > 0 && (
          <>
            <h2 className="m-4">Puss Currently Sleeping</h2>
            <CardGroup>
              <Row xs={1} md={2} lg={3} xl={4} className="g-4">
                {unstaked.map((item) => (
                  <Col key={`col_${item.id}`}>
                    <StakeCard
                      key={item.id}
                      handleClick={handleUnstakedCardClick}
                      metaData={item}
                      selected={selectedUnstakedId.includes(item.id)}
                    />
                  </Col>
                ))}
              </Row>
            </CardGroup>
            <Button onClick={handleStakeClick} className="m-4">
              Send on Adventure
            </Button>
          </>
        )}
      </Styles>
    </Container>
  );
};

export default StakeGrid;
