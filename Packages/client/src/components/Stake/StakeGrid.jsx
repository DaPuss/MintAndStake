import { useState, useEffect } from 'react';
import { Container, Button, CardGroup, Card, Row, Col } from 'react-bootstrap';
import { useAccount, useConnect } from 'wagmi';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { BigNumber } from 'ethers';
import { formatMetadata, formatTokenIds } from '../../utils/transactionFormatting';
import StakeCard from './StakeCard';
import usePussContract from '../../hooks/usePussContract';
import useStakeContract from '../../hooks/useStakeContract';
import useStakeAction from '../../hooks/useStakeAction';
import usePussAction from '../../hooks/usePussAction';

const StakeGrid = () => {
  const [{ data: accountData }, disconnect] = useAccount({
    fetchEns: true
  });
  const navigate = useNavigate();
  const { readStakeContract } = useStakeContract();
  const { readContractFunction } = usePussContract();
  const { callContract: callApproveForAll, wait: waitApproveAll } =
    usePussAction('setApprovalForAll');
  const { writeStakeContract: callStake, wait: waitStake } = useStakeAction('stake');
  const { writeStakeContract: callUnstake, wait: waitUnstake } = useStakeAction('unstake');
  const [selectedStakedId, setSelectedStakedId] = useState([]);
  const [selectedUnstakedId, setSelectedUnstakedId] = useState([]);
  const [card, setCards] = useState({});

  useEffect(async () => {
    const staked = await getStakedCards();
    const unstaked = await getUnstakedCards();
    setCards({ staked, unstaked });
  }, [accountData?.address]);

  const getStakedCards = async () => {
    if (!accountData?.address) return;
    const balance = await readStakeContract('balanceOf', {
      args: accountData.address
    });
    if (BigNumber.from(balance.data).toNumber() > 0) {
      const tokenIds = await readStakeContract('GetAllHolderTokens', {
        args: accountData.address
      });
      const ids = formatTokenIds(tokenIds.data);
      const tokenMetadata = await readContractFunction('GetTokensMetaData', {
        args: [ids]
      });
      const metadata = formatMetadata(ids, tokenMetadata.data);
      return metadata;
    }
  };

  const getUnstakedCards = async () => {
    if (!accountData?.address) return;
    const balance = await readContractFunction('balanceOf', {
      args: accountData.address
    });
    if (BigNumber.from(balance.data).toNumber() > 0) {
      const tokenIds = await readContractFunction('GetAllHolderTokens', {
        args: accountData.address
      });
      const ids = formatTokenIds(tokenIds.data);
      const tokenMetadata = await readContractFunction('GetTokensMetaData', {
        args: [ids]
      });
      const metadata = formatMetadata(ids, tokenMetadata.data);
      return metadata;
    }
  };

  const handleStakeClick = async () => {
    console.log('stake me: ' + selectedUnstakedId);
    const txnApp = await callApproveForAll({
      args: [import.meta.env.VITE_STAKE_CONTRACT, true]
    });
    if (typeof txnApp.data !== 'undefined') {
      await waitApproveAll({ wait: txnApp.data.wait });
    }
    const txn = await callStake({
      args: [selectedUnstakedId]
    });
    if (typeof txn.data !== 'undefined') {
      await waitStake({ wait: txn.data.wait });
    }

    let unstaked = [...card.unstaked.filter((cards) => !selectedUnstakedId.includes(cards.id))];
    let staked = card?.staked ? card.staked : [];
    staked = [...staked, ...card.unstaked.filter((cards) => selectedUnstakedId.includes(cards.id))];
    console.log({ staked, unstaked });
    setCards({ staked, unstaked });
    setSelectedUnstakedId([]);
  };

  const handleUnstakeClick = async () => {
    console.log('unstake me: ' + selectedStakedId);
    const txn = await callUnstake({
      args: [selectedStakedId]
    });
    if (typeof txn.data !== 'undefined') {
      await waitUnstake({ wait: txn.data.wait });
    }

    let staked = [...card.staked.filter((cards) => !selectedStakedId.includes(cards.id))];
    let unstaked = card?.unstaked ? card.unstaked : [];
    unstaked = [...unstaked, ...card.staked.filter((cards) => selectedStakedId.includes(cards.id))];
    console.log({ staked, unstaked });

    setCards({ staked, unstaked });
    setSelectedStakedId([]);
  };

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

  if (!card?.unstaked && !card?.staked) {
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
        {card?.staked && (
          <>
            <h2 className="m-4">Puss Currently On Adventure</h2>
            <CardGroup>
              <Row xs={1} md={2} lg={4} xl={6} className="g-4">
                {card.staked.map((item) => (
                  <Col key={`col_${item.id}`}>
                    <StakeCard
                      key={item.id}
                      handleClick={handleStakedCardClick}
                      metaData={item}
                      selected={selectedStakedId.includes(item.id)}
                      staked={true}
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
        {card?.unstaked && (
          <>
            <h2 className="m-4">Puss Currently Sleeping</h2>
            <CardGroup>
              <Row xs={1} md={2} lg={4} xl={6} className="g-4">
                {card.unstaked.map((item) => (
                  <Col key={`col_${item.id}`}>
                    <StakeCard
                      key={item.id}
                      handleClick={handleUnstakedCardClick}
                      metaData={item}
                      selected={selectedUnstakedId.includes(item.id)}
                      staked={false}
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
