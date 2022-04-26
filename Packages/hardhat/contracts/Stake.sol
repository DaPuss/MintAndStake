// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "./Puss.sol";
import "./Gravy.sol";
contract Stake is Ownable, IERC721Receiver {
    uint256 public rewardRate = 1;
    address tokenAddress;
    address nftAddress;

    struct Staker {
        uint256 amountStaked;
        uint256 timeOfLastUpdate;
        uint256 rewardsOwed;
    }
    mapping(address => Staker) public stakers;
    mapping(uint256 => bool) public vault;

    constructor(address _nftAddress, address _tokenAddress) {
        nftAddress = _nftAddress;
        tokenAddress = _tokenAddress;
    }

    function calculateRewards(address account) public view returns (uint256) {
        return ((stakers[account].amountStaked * rewardPerToken(account)) +
            stakers[account].rewardsOwed);
    }

    function rewardPerToken(address account) public view returns (uint256) {
        return ((block.timestamp - stakers[account].timeOfLastUpdate) *
            rewardRate);
    }

    modifier updateReward(address account) {
        uint256 rewards = calculateRewards(account);
        stakers[account].timeOfLastUpdate = block.timestamp;
        stakers[account].rewardsOwed = rewards;
        _;
    }

    function stake(uint256[] calldata _tokenIds)
        public
        updateReward(msg.sender)
    {
        for (uint256 i = 0; i < _tokenIds.length; i++) {
            stake(_tokenIds[i]);
        }
    }

    function stake(uint256 _tokenId) private {
        require(
            Puss(nftAddress).ownerOf(_tokenId) == msg.sender,
            "Get your own NFTs"
        );
        require(vault[_tokenId] == false, "NFT already staked");
        vault[_tokenId] = true;

        _addTokenToOwnerEnumeration(msg.sender, _tokenId);
        _addTokenToAllTokensEnumeration(_tokenId);

        stakers[msg.sender].amountStaked += 1;
        Puss(nftAddress).transferFrom(msg.sender, address(this), _tokenId);

        emit PussStaked(msg.sender, _tokenId);
    }

    function unstake(uint256[] calldata tokenIds)
        public
        updateReward(msg.sender)
    {
        for (uint256 i = 0; i < tokenIds.length; i++) {
            unstake(tokenIds[i]);
        }
    }

    function unstake(uint256 _tokenId) private {
        require(ownerOf(_tokenId), "Get your own NFTs");
        require(vault[_tokenId] == true, "NFT not staked");
        vault[_tokenId] = false;

        _removeTokenFromOwnerEnumeration(msg.sender, _tokenId);
        _removeTokenFromAllTokensEnumeration(_tokenId);

        stakers[msg.sender].amountStaked -= 1;
        Puss(nftAddress).transferFrom(address(this), msg.sender, _tokenId);

        emit PussUnstaked(msg.sender, _tokenId);
    }

    function claimRewards() public updateReward(msg.sender) {
        uint256 rewards = stakers[msg.sender].rewardsOwed;
        stakers[msg.sender].rewardsOwed = 0;
        Gravy(tokenAddress).mint(msg.sender, rewards);
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

    //ripped from ERC721Enumerable
    mapping(address => mapping(uint256 => uint256)) private _ownedTokens;

    // Mapping from token ID to index of the owner tokens list
    mapping(uint256 => uint256) private _ownedTokensIndex;

    // Array with all token ids, used for enumeration
    uint256[] private _allTokens;

    // Mapping from token id to position in the allTokens array
    mapping(uint256 => uint256) private _allTokensIndex;

    function balanceOf(address _address) public view returns (uint256) {
        return stakers[_address].amountStaked;
    }

    function ownerOf(uint256 tokenId) private view returns (bool) {
        uint256 balance = stakers[msg.sender].amountStaked;
        for (uint256 i = 0; i < balance; i++) {
            if (tokenOfOwnerByIndex(msg.sender, i) == tokenId) {
                return true;
            }
        }
        return false;
    }

    function GetAllHolderTokens(address _address)
        public
        view
        returns (uint256[] memory)
    {
        uint256 balance = stakers[_address].amountStaked;
        require(balance > 0, "No Puss staked");

        uint256[] memory ownedTokens = new uint256[](balance);
        for (uint256 i = 0; i < balance; i++) {
            ownedTokens[i] = tokenOfOwnerByIndex(_address, i);
        }
        return ownedTokens;
    }

    function tokenOfOwnerByIndex(address _ownerAddress, uint256 _index)
        public
        view
        returns (uint256)
    {
        require(
            _index < stakers[_ownerAddress].amountStaked,
            "owner index out of bounds"
        );
        return _ownedTokens[_ownerAddress][_index];
    }

    function _addTokenToOwnerEnumeration(address to, uint256 tokenId) private {
        uint256 length = stakers[to].amountStaked;
        _ownedTokens[to][length] = tokenId;
        _ownedTokensIndex[tokenId] = length;
    }

    function _addTokenToAllTokensEnumeration(uint256 tokenId) private {
        _allTokensIndex[tokenId] = _allTokens.length;
        _allTokens.push(tokenId);
    }

    function _removeTokenFromOwnerEnumeration(address from, uint256 tokenId)
        private
    {
        uint256 lastTokenIndex = stakers[from].amountStaked - 1;
        uint256 tokenIndex = _ownedTokensIndex[tokenId];

        if (tokenIndex != lastTokenIndex) {
            uint256 lastTokenId = _ownedTokens[from][lastTokenIndex];

            _ownedTokens[from][tokenIndex] = lastTokenId; // Move the last token to the slot of the to-delete token
            _ownedTokensIndex[lastTokenId] = tokenIndex; // Update the moved token's index
        }

        delete _ownedTokensIndex[tokenId];
        delete _ownedTokens[from][lastTokenIndex];
    }

    function _removeTokenFromAllTokensEnumeration(uint256 tokenId) private {
        uint256 lastTokenIndex = _allTokens.length - 1;
        uint256 tokenIndex = _allTokensIndex[tokenId];

        uint256 lastTokenId = _allTokens[lastTokenIndex];

        _allTokens[tokenIndex] = lastTokenId; // Move the last token to the slot of the to-delete token
        _allTokensIndex[lastTokenId] = tokenIndex; // Update the moved token's index

        delete _allTokensIndex[tokenId];
        _allTokens.pop();
    }
}
