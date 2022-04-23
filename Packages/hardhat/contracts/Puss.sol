// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Puss is ERC721Enumerable, Ownable {
    uint256 public maxSupply;
    uint256 public mintPrice;
    uint256 public nameChangeCost;
    address private gravyAddress;
    uint256 randNonce = 0;
    mapping(uint256 => PussStruct) public PussMetaData;
    mapping(address => uint256) public owners;

    struct PussStruct {
        uint256 level;
        uint256 gravyEaten;
        uint256 rarity;
        string name;
    }

    constructor(address _gravyAddress) ERC721("Puss", "PUSS") {
        gravyAddress = _gravyAddress;
        maxSupply = 1000;
        mintPrice = 1 ether;
        nameChangeCost = 100;
    }

    function mintPuss(uint256 amount) external payable {
        require(amount > 0, "Cannot mint 0 Puss");
        require(msg.value == mintPrice * amount, "Wrong price supplied");

        uint256 _totalSupply = totalSupply();
        require(maxSupply > _totalSupply + amount, "Sold out");
        uint256 tokenId;
        uint256 rarity;
        for (uint256 i = 0; i < amount; i++) {
            _totalSupply += 1;
            tokenId = _totalSupply;
            rarity = (_totalSupply % 5) + 1;
            PussMetaData[tokenId] = PussStruct(1, 0, rarity, "Dolly");
            owners[msg.sender] += 1;
            _safeMint(msg.sender, tokenId);

            emit Mint(msg.sender, tokenId);
        }
    }

    function changeName(string memory _name, uint256 _tokenId)
        public
        onlyOwnerOf(_tokenId)
    {
        require(
            IERC20(gravyAddress).balanceOf(msg.sender) >= nameChangeCost,
            "You don't own enough gravy"
        );

        IERC20(gravyAddress).transferFrom(
            msg.sender,
            address(this),
            nameChangeCost
        );
        PussMetaData[_tokenId].name = _name;

        emit NameChanged(_tokenId, _name);
    }

    function eatGravy(uint256 _amount, uint256 _tokenId)
        public
        onlyOwnerOf(_tokenId)
    {
        require(_amount > 0, "You can't eat 0 gravy");
        require(
            IERC20(gravyAddress).balanceOf(msg.sender) >= _amount,
            "You don't own enough gravy"
        );

        IERC20(gravyAddress).transferFrom(msg.sender, address(this), _amount);
        PussMetaData[_tokenId].gravyEaten += _amount;
        emit GravyEaten(_tokenId, _amount);

        checkLevelUp(_tokenId);
    }

    function checkLevelUp(uint256 _tokenId) private {
        if (
            PussMetaData[_tokenId].gravyEaten / 1000 >
            PussMetaData[_tokenId].level
        ) {
            PussMetaData[_tokenId].level =
                PussMetaData[_tokenId].gravyEaten /
                1000;
            emit LevelUp(_tokenId, PussMetaData[_tokenId].level);
        }
    }

    function GetAllHolderTokens(address _address)
        public
        view
        returns (uint256[] memory)
    {
        uint256 balance = balanceOf(_address);
        require(balance > 0, "No Puss held");

        uint256[] memory ownedTokens = new uint256[](balance);
        for (uint256 i = 0; i < balance; i++) {
            ownedTokens[i] = tokenOfOwnerByIndex(_address, i);
        }
        return ownedTokens;
    }

    function GetTokensMetaData(uint256[] calldata _tokenIds)
        public
        view
        returns (PussStruct[] memory)
    {
        require(_tokenIds.length > 0, "No tokens provided");
        PussStruct[] memory metaData = new PussStruct[](_tokenIds.length);
        uint256 tokenId;
        for (uint256 i = 0; i < _tokenIds.length; i++) {
            tokenId = _tokenIds[i];
            require(tokenId <= totalSupply(), "Invalid token ID");
            metaData[i] = PussMetaData[tokenId];
        }
        return metaData;
    }

    modifier onlyOwnerOf(uint256 _tokenId) {
        require(ownerOf(_tokenId) == msg.sender, "You do not own this Puss");
        _;
    }

    event GravyEaten(uint256 tokenId, uint256 amount);
    event NameChanged(uint256 tokenId, string name);
    event LevelUp(uint256 tokenId, uint256 level);
    event Mint(address owner, uint256 tokenId);
}
