//SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.26;

/* Solady contracts */
import {ERC721} from "@solady/contracts/tokens/ERC721.sol";

/* Solady libraries */
import {Ownable} from "@solady/contracts/auth/Ownable.sol";

/* Openzeppelin libraries */
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";

/* Interfaces */
import {IWorldID} from "contracts/interfaces/IWorldID.sol";

/* SlothShaming Libraries */
import {SSErrors} from "contracts/libraries/SSErrors.sol";
import {SSDataTypes} from "contracts/libraries/SSDataTypes.sol";

/* Helpers */
import {ByteHasher} from "contracts/helpers/ByteHasher.sol";

/**
 * @title Sloth Shaming
 * @notice Sloth Shaming Reputation handling
 * @author https://x.com/0xjsieth
 *
 */
contract SlothShaming is ERC721, Ownable {
    // Helper for worldId proving actions
    using ByteHasher for bytes;
    // Uint to string conversion library
    using Strings for uint256;

    //     _____ __        __
    //    / ___// /_____ _/ /____  _____
    //    \__ \/ __/ __ `/ __/ _ \/ ___/
    //   ___/ / /_/ /_/ / /_/  __(__  )
    //  /____/\__/\__,_/\__/\___/____/

    /// @dev The contract's external nullifier hash for notes
    uint256 internal immutable externalNullifierNote;

    /// @dev The contract's external nullifier hash for votes
    uint256 internal immutable externalNullifierVote;

    /// @dev The World ID group ID (always 1)
    uint256 internal immutable groupId = 1;

    // Current id, forever incrementing
    uint256 private currentId;

    /// @dev Keep track of if we are using worldId
    bool public useWordlId;

    /// @dev contract instance for worldId prover
    IWorldID worldId;

    // Base uri for nft hosting
    string private baseUri;

    // Mapping registry of ids associated with holders 
    mapping(address user => uint256 id) public idOf;


    //     ______                 __                  __
    //    / ____/___  ____  _____/ /________  _______/ /_____  _____
    //   / /   / __ \/ __ \/ ___/ __/ ___/ / / / ___/ __/ __ \/ ___/
    //  / /___/ /_/ / / / (__  ) /_/ /  / /_/ / /__/ /_/ /_/ / /
    //  \____/\____/_/ /_/____/\__/_/   \__,_/\___/\__/\____/_/

    /**
     * @notice
     *  Constructor for Notes contract
     *
     * @param _useWorldId a boolan if we are using worldcoin id or not
     * @param _worldId address of worldå
     * @param _appId worldcoin app id as string
     * @param _noteId worldcoin action id for note
     * @param _voteId worldcoin action id for vote
     *
     */
    constructor(
        bool _useWorldId,
        address _worldId,
        string memory _appId,
        string memory _noteId,
        string memory _voteId
    ) {
        // Set the status of worldId usage
        useWordlId = _useWorldId;

        // Instantiate world Id contract for proving
        worldId = IWorldID(_worldId);

        // create nullifier used for notes
        externalNullifierNote = abi
            .encodePacked(abi.encodePacked(_appId).hashToField(), _noteId)
            .hashToField();

        // create nullifier used for votes
        externalNullifierVote = abi
            .encodePacked(abi.encodePacked(_appId).hashToField(), _voteId)
            .hashToField();

        // Set deployer as owner
        _initializeOwner(msg.sender);
    }

    /* 
     * @notice 
     *  Returns the token collection name.
     *
     * @return The Sloth Shaming. Proudly.
     *
     */
    function name() public pure override returns (string memory) {
        // Fearless 😎
        return "Sloth Shaming";
    }

    /* 
     * @notice 
     *  Returns the token collection symbol.
     *
     * @return The Sloth Shaming. Proudly.
     *
     */
    function symbol() public pure override returns (string memory) {
        // Fearless 😎
        return "Sloth Shaming";
    }

    /* 
     * @notice 
     *  Returns the Uniform Resource Identifier (URI) for token `id`.
     *
     * @param id id of token we want to look up
     *
     * @return Return associated tokenURI 
     *
     */
    function tokenURI(uint256 id) public view override returns (string memory) {
        // String magic, basically
        return string.concat(baseUri, id.toString());
    }

    /// Bypassing this function in order to convert ERC721 contract to a SBT style contract
    function transferFrom(address from, address to, uint256 id) public payable override {
        revert SSErrors.SLOTHS_CANT_SEND_THEIR_REPUTATION();
    }

    function registerSloth(SSDataTypes.WorldIdProof memory _proof) external {
        // if we are using worldId...
        if (useWordlId) {
            // verify proof
            worldId.verifyProof(
                _proof.root,
                groupId,
                abi.encodePacked(_proof.signal).hashToField(),
                _proof.nullifierHash,
                externalNullifierNote,
                _proof.proof
            );
        }

        // Mint the soulboud token to the msg.sender
        _mint(msg.sender, currentId);

        // Set id mapping
        idOf[msg.sender] = currentId;

        // Increment currentId
        currentId++;
    }

    function resetBaseUri(string memory _newBaseUri) external onlyOwner {
        baseUri = _newBaseUri;
    }

}