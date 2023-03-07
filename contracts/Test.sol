// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

contract Test is ERC721 {
    mapping(uint256 => address) public mintedFor;

    constructor() ERC721("Base64", "64") {}

    function mint(address to, uint256 tokenId) public {
        _safeMint(to, tokenId);
        mintedFor[tokenId] = to;
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721)
        returns (string memory)
    {
        bytes memory dataURI = abi.encodePacked(
            "{",
            '"mintedFor": "',
            Strings.toHexString(uint256(uint160(mintedFor[tokenId])), 20),
            '",',
            '"attribute": "value"',
            "}"
        );

        return
            string(
                abi.encodePacked(
                    "data:application/json;base64,",
                    Base64.encode(dataURI)
                )
            );
    }
}
