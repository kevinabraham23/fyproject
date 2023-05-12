//SPDX-License-Identifier:MIT

pragma solidity ^0.8.8;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract certificateNft is ERC721URIStorage {
    string public constant TOKEN_URI = "ipfs://QmVD3mAZeTYZBgpHdTHLPtv4biFmBAFYHU56xQAkL9965d";

    uint256 private s_tokenId;

    constructor() ERC721("Certificate", "CER") {
        s_tokenId = 0;
    }

    function mintNft() public returns (uint256) {
        _safeMint(msg.sender, s_tokenId);

        s_tokenId = s_tokenId + 1;
        return s_tokenId;
    }

    function getTokenId() public view returns (uint256) {
        return s_tokenId;
    }

    function tokenURI(uint256) public view override returns (string memory) {
        return TOKEN_URI;
    }
}
