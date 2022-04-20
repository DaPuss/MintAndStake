// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";

import "./Puss.sol";
import "./Gravy.sol";

contract stakeNFT is Ownable, IERC721Receiver {

    uint256 public totalStaked;

    uint rewardRate;//per hour
    address tokenAddress;
    address nftAddress;

    struct Staker {
        uint amountStaked;
        uint timeOfLastUpdate;
        uint rewardsOwed;
    }

    mapping(address => Staker) public stakers;
    mapping(uint => bool) public vault;

    constructor(address _nftAddress, address _tokenAddress) { 
        nftAddress = _nftAddress;
        tokenAddress = _tokenAddress;
        rewardRate = 10;
    }

    function setRewardRate(uint _rewardRate) public onlyOwner{
        require(_rewardRate > 0, "Reward rate must be higher than 0");
        rewardRate = _rewardRate;
    }

    function stake(uint[] calldata tokenIds) external {
        stakers[msg.sender].rewardsOwed += calculateRewards();
        for(uint i =0; i < tokenIds.length; i++ ){
            stake(tokenIds[i]);
        }
    }

    function stake(uint _tokenId) private {
            require(Puss(nftAddress).ownerOf(_tokenId) == msg.sender, "Get your own NFTs");
            require(vault[_tokenId] == false, "NFT already staked");
            vault[_tokenId] = true;
            stakers[msg.sender].amountStaked += 1;
            Puss(nftAddress).transferFrom(msg.sender, address(this), _tokenId);

            emit PussStaked(msg.sender, _tokenId);
    }

    function unstake(uint[] calldata tokenIds)external onlyStaker{
        stakers[msg.sender].rewardsOwed += calculateRewards();
        for(uint i =0; i < tokenIds.length; i++ ){
            unstake(tokenIds[i]);
        }
    }

    function unstake(uint _tokenId) private{
            require(Puss(nftAddress).ownerOf(_tokenId) == msg.sender, "Get your own NFTs");
            require(vault[_tokenId] == true, "NFT not staked");
            vault[_tokenId] = false;
            stakers[msg.sender].amountStaked -= 1;
            Puss(nftAddress).transferFrom(address(this), msg.sender, _tokenId);

            emit PussUnstaked(msg.sender, _tokenId);
    }

    function calculateRewards() internal view onlyStaker returns(uint){
        uint timeSinceLast = block.timestamp - stakers[msg.sender].timeOfLastUpdate;
        require(timeSinceLast >  1 hours, "No rewards earnt yet");

        uint rewardsOwed = (timeSinceLast / 1 hours) * stakers[msg.sender].amountStaked * rewardRate;

        return(rewardsOwed);
    }

    function claimRewards() public {
        uint rewards = stakers[msg.sender].rewardsOwed + calculateRewards();
        require(rewards > 0, "No rewards to claim");
        stakers[msg.sender].rewardsOwed = 0;
        Gravy(tokenAddress).mint(msg.sender, rewards);
    }

    function getRewardsOwed()external view onlyStaker returns(uint){
        return calculateRewards();
    }

    function getAmountStaked()external view onlyStaker returns(uint){
        return stakers[msg.sender].amountStaked;
    }

    function getTimeSinceLast()external view onlyStaker returns(uint){
        return stakers[msg.sender].timeOfLastUpdate;
    }

    modifier onlyStaker(){
        require(stakers[msg.sender].amountStaked > 0, "No items staked");
        _;
    }

    event PussStaked(address owner, uint256 tokenId);
    event PussUnstaked(address owner, uint256 tokenId);
    event GravyClaimed(address owner, uint256 amount);

    function onERC721Received(
        address,
        address from,
        uint256,
        bytes calldata
    ) external pure override returns (bytes4) {
      require(from == address(0x0), "Cannot send nfts to Vault directly");
      return IERC721Receiver.onERC721Received.selector;
    }
}