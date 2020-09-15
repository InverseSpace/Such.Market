pragma solidity ^0.6.8;

import "@nomiclabs/buidler/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract RedeemableNFT is ERC721 {
    constructor() ERC721("SuchNFT", "SNFT") public {
    }
}
