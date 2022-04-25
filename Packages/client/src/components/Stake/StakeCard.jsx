import { useState } from 'react';
import { Container, Button, Card } from 'react-bootstrap';
import { useBalance } from 'wagmi';
import styled from 'styled-components';
import { BigNumber } from 'ethers';
import { useContractAction, abi, contracts } from '../../hooks/index.js';
import Images from '../../assets';
import EatGravyModal from './EatGravyModal';
import ChangeNameModal from './ChangeNameModal';
import { useMetaMaskAccount } from '../../context/AccountContext';

const StakeCard = (props) => {
  const [showNameChange, setShowNameChange] = useState(false);
  const [showGravy, setShowGravy] = useState(false);
  const [name, setName] = useState(props.metaData.name);
  const [gravyEaten, setGravyEaten] = useState(parseInt(props.metaData.gravyEaten));
  const { connectedAddr, connected, disconnect, connectToMetaMask, accountErrorMessage } =
    useMetaMaskAccount();
  const handleCloseNamechange = () => setShowNameChange(false);
  const handleShowNamechange = () => setShowNameChange(true);
  const handleCloseGravy = () => setShowGravy(false);
  const handleShowGravy = () => setShowGravy(true);

  const { handleClick, metaData, selected, staked } = props;
  const { id, level, rarity } = metaData;
  const cardSelected = selected ? 'selected' : '';

  const { writeContract: increaceAllowanceWrite } = useContractAction(
    'increaseAllowance',
    contracts.GRAVY,
    abi.GRAVY
  );
  const { writeContract: eatGravyWrite } = useContractAction('eatGravy', contracts.PUSS, abi.PUSS);
  const { writeContract: changeNameWrite } = useContractAction(
    'changeName',
    contracts.PUSS,
    abi.PUSS
  );

  const [{ data, error, loading }, getBalance] = useBalance({
    addressOrName: connectedAddr,
    token: import.meta.env.VITE_GRAVY_CONTRACT
  });

  const checkBalance = async (value) => {
    const currentGravy = await getBalance();
    const balance = BigNumber.from(currentGravy.data.value).toNumber();
    return balance >= value;
  };

  const onEatGravy = async (value) => {
    if (!(await checkBalance(parseInt(value)))) return;
    const allowTxn = await increaceAllowanceWrite({
      args: [import.meta.env.VITE_PUSS_CONTRACT, value]
    });
    const eatTxn = await eatGravyWrite({
      args: [value, Number(id)]
    });
    if (typeof allowTxn.error == 'undefined' && typeof eatTxn.error == 'undefined') {
      handleCloseGravy();
      setGravyEaten(gravyEaten + parseInt(value));
    }
  };

  const onNameChange = async (value) => {
    if (!(await checkBalance(parseInt(100)))) return;
    const allowTxn = await increaceAllowanceWrite({
      args: [import.meta.env.VITE_PUSS_CONTRACT, 100]
    });
    //changeName
    const nameTxn = await changeNameWrite({
      args: [value, Number(id)]
    });
    if (typeof allowTxn.error == 'undefined' && typeof nameTxn.error == 'undefined') {
      handleCloseNamechange();
      setName(value);
    }
  };

  return (
    <Styles>
      <Card className={cardSelected} onClick={() => handleClick(id)}>
        <Card.Body>
          {<Card.Title>{staked ? 'Adventuring' : 'Snoozing...'}</Card.Title>}

          <Card.Img className="mb-4" variant="top" src={Images[`puss${rarity}`]} />
          <Card.Title>{name}</Card.Title>
          <Card.Text>Id: {id}</Card.Text>
          <Card.Text>Level: {level}</Card.Text>
          <Card.Text>
            $GRAVY Eaten
            <br /> {gravyEaten}
          </Card.Text>
          <>
            <ChangeNameModal
              handleClose={handleCloseNamechange}
              show={showNameChange}
              tokenId={id}
              onNameChange={onNameChange}
            />
            <Button
              disabled={staked}
              onClick={handleShowNamechange}
              className={'w-100 mb-2'}
              variant="primary">
              Change Name
            </Button>
            <EatGravyModal
              handleClose={handleCloseGravy}
              show={showGravy}
              tokenId={id}
              onEatGravy={onEatGravy}
            />
            <Button
              disabled={staked}
              onClick={handleShowGravy}
              className={'w-100'}
              variant="primary">
              Eat Gravy
            </Button>
          </>
        </Card.Body>
      </Card>
    </Styles>
  );
};

export default StakeCard;

const Styles = styled.div`
  .card {
    box-sizing: border-box;
    border-radius: 6px;
    border-width: 3px;
    border-color: ${(props) => props.theme.primaryBlack};
    background-color: ${(props) => props.theme.primaryLightGrey};
  }
  .card:hover,
  .card::selection,
  .selected,
  .card:hover > .card-body > .card-img-top,
  .selected > .card-body > .card-img-top {
    box-sizing: border-box;
    cursor: pointer;
    border-color: ${(props) => props.theme.primaryPurple} !important;
  }

  .card-img-top {
    border-radius: 6px;
    border-width: 3px;
    border-style: solid;
    border-color: ${(props) => props.theme.primaryBlack};
  }
`;
