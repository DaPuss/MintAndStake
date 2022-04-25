import { useState, useEffect } from 'react';
import { Container, Button, Image, CardGroup, Card, Row, Col } from 'react-bootstrap';
import { useAccount, useConnect } from 'wagmi';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { BigNumber } from 'ethers';
import Images from '../../assets';
import { formatMetadata, formatTokenIds } from '../../utils/transactionFormatting';
import { useContractAction, useContractRead, abi, contracts } from '../../hooks/index.js';
import StakeCard from './StakeCard';

const StakeGrid = () => {
  const [{ data: accountData }, disconnect] = useAccount({
    fetchEns: true
  });
  const navigate = useNavigate();
  const { readContract: readStakeContract } = useContractRead(contracts.STAKE, abi.STAKE);
  const { readContract: readPussContract } = useContractRead(contracts.PUSS, abi.PUSS);
  const { writeContract: approveAllWrite } = useContractAction(
    'setApprovalForAll',
    contracts.PUSS,
    abi.PUSS
  );
  const { writeContract: stakeWrite } = useContractAction('stake', contracts.STAKE, abi.STAKE);
  const { writeContract: unstakeWrite } = useContractAction('unstake', contracts.STAKE, abi.STAKE);
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
      const tokenMetadata = await readPussContract('GetTokensMetaData', {
        args: [ids]
      });
      const metadata = formatMetadata(ids, tokenMetadata.data);
      return metadata;
    }
  };

  const getUnstakedCards = async () => {
    if (!accountData?.address) return;
    const balance = await readPussContract('balanceOf', {
      args: accountData.address
    });
    if (BigNumber.from(balance.data).toNumber() > 0) {
      const tokenIds = await readPussContract('GetAllHolderTokens', {
        args: accountData.address
      });
      const ids = formatTokenIds(tokenIds.data);
      const tokenMetadata = await readPussContract('GetTokensMetaData', {
        args: [ids]
      });
      const metadata = formatMetadata(ids, tokenMetadata.data);
      return metadata;
    }
  };

  const handleStakeClick = async () => {
    console.log('stake me: ' + selectedUnstakedId);
    if (selectedUnstakedId.length == 0) return;
    await approveAllWrite({
      args: [import.meta.env.VITE_STAKE_CONTRACT, true]
    });

    await stakeWrite({
      args: [selectedUnstakedId]
    });

    updateCards('stake');
  };

  const handleUnstakeClick = async () => {
    console.log('unstake me: ' + selectedStakedId);
    if (selectedStakedId.length == 0) return;
    await unstakeWrite({
      args: [selectedStakedId]
    });

    updateCards('unstake');
  };

  const updateCards = (action) => {
    if (action == 'stake') {
      let unstaked = [...card.unstaked.filter((cards) => !selectedUnstakedId.includes(cards.id))];
      let staked = card?.staked ? card.staked : [];
      staked = [
        ...staked,
        ...card.unstaked.filter((cards) => selectedUnstakedId.includes(cards.id))
      ];
      setCards({ staked, unstaked });
      setSelectedUnstakedId([]);
    } else {
      let staked = [...card.staked.filter((cards) => !selectedStakedId.includes(cards.id))];
      let unstaked = card?.unstaked ? card.unstaked : [];
      unstaked = [
        ...unstaked,
        ...card.staked.filter((cards) => selectedStakedId.includes(cards.id))
      ];
      console.log({ staked, unstaked });

      setCards({ staked, unstaked });
      setSelectedStakedId([]);
    }
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
        <Image width={'50%'} roundedCircle={true} className="mt-5" src={Images['puss2']} />
        <h1 className="m-4">You currently own no Puss</h1>
        <h2 className="m-4">Head over and mint some!</h2>
        <Button onClick={() => navigate('/')} className="m-4">
          Mint
        </Button>
      </Container>
    );
  }

  return (
    <Container className="text-center" fluid>
      <Styles>
        <h2 className="m-4">Look at all those duck! ... I mean Puss!</h2>
        <p className="bodyText">
          Send Dolly on an adventure deep into the dimensions incomprehensible to the avarage Puss,
          here she will travel over vast distances, battle against vicious creatures, and overcome
          any obsticle set in her way so she can bring home liquid gold.... Gravy
        </p>
        <CardGroup>
          <Row xs={1} md={2} lg={4} className="g-4">
            {card?.staked &&
              card.staked.map((item) => (
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
            {card?.unstaked &&
              card.unstaked.map((item) => (
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
        <Button onClick={handleUnstakeClick} className="m-4">
          Send to Sleep
        </Button>
        <Button onClick={handleStakeClick} className="m-4">
          Send on Adventure
        </Button>
      </Styles>
    </Container>
  );
};

export default StakeGrid;

const Styles = styled.div`
  .btn-primary {
    width: 75%;
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
`;
