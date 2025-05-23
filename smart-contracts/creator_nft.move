module creator_hub::creator_nft {
    use std::string::{Self, String};
    use std::vector;
    use sui::object::{Self, ID, UID};
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};
    use sui::url::{Self, Url};
    use sui::event;
    use sui::package;
    use sui::display;
    
    // ====== Constants ======

    const APP_NAME: vector<u8> = b"CreatorHub";
    
    // ====== Error Codes ======
    
    const EInvalidScore: u64 = 0;
    const ENotOwner: u64 = 1;
    
    // ====== Structs ======

    /// One-time witness for the module
    struct CREATOR_NFT has drop {}
    
    /// Creator NFT representing a social media account
    struct CreatorNFT has key, store {
        id: UID,
        name: String,
        platform: String,
        category: String,
        creator: address,
        url: Url,
        score: u64,
        creation_time: u64,
    }
    
    /// Collaboration NFT representing a partnership between creators or projects
    struct CollaborationNFT has key, store {
        id: UID,
        name: String,
        creator_a: address,
        creator_b: address,
        description: String,
        url: Url,
        creation_time: u64,
        status: u8, // 0: active, 1: completed, 2: burned
    }
    
    // ====== Events ======
    
    /// Emitted when a new Creator NFT is minted
    struct CreatorNFTMinted has copy, drop {
        id: ID,
        name: String,
        platform: String,
        category: String,
        creator: address,
    }
    
    /// Emitted when a Creator NFT's score is updated
    struct CreatorScoreUpdated has copy, drop {
        id: ID,
        old_score: u64,
        new_score: u64,
    }
    
    /// Emitted when a new Collaboration NFT is created
    struct CollaborationCreated has copy, drop {
        id: ID,
        name: String,
        creator_a: address,
        creator_b: address,
    }
    
    /// Emitted when a Collaboration NFT's status changes
    struct CollaborationStatusChanged has copy, drop {
        id: ID,
        old_status: u8,
        new_status: u8,
    }
    
    // ====== Functions ======
    
    fun init(witness: CREATOR_NFT, ctx: &mut TxContext) {
        let publisher = package::claim(witness, ctx);
        
        // Creator NFT Display
        let creator_keys = vector[
            string::utf8(b"name"),
            string::utf8(b"description"),
            string::utf8(b"image_url"),
            string::utf8(b"creator"),
            string::utf8(b"platform"),
            string::utf8(b"category"),
            string::utf8(b"score"),
        ];
        
        let creator_values = vector[
            string::utf8(b"{name}"),
            string::utf8(b"Creator NFT from CreatorHub"),
            string::utf8(b"{url}"),
            string::utf8(b"{creator}"),
            string::utf8(b"{platform}"),
            string::utf8(b"{category}"),
            string::utf8(b"{score}"),
        ];
        
        let creator_display = display::new_with_fields<CreatorNFT>(
            &publisher, creator_keys, creator_values, ctx
        );
        display::update_version(&mut creator_display);
        
        // Collaboration NFT Display
        let collab_keys = vector[
            string::utf8(b"name"),
            string::utf8(b"description"),
            string::utf8(b"image_url"),
            string::utf8(b"creator_a"),
            string::utf8(b"creator_b"),
            string::utf8(b"status"),
        ];
        
        let collab_values = vector[
            string::utf8(b"{name}"),
            string::utf8(b"{description}"),
            string::utf8(b"{url}"),
            string::utf8(b"{creator_a}"),
            string::utf8(b"{creator_b}"),
            string::utf8(b"{status}"),
        ];
        
        let collab_display = display::new_with_fields<CollaborationNFT>(
            &publisher, collab_keys, collab_values, ctx
        );
        display::update_version(&mut collab_display);
        
        transfer::public_transfer(creator_display, tx_context::sender(ctx));
        transfer::public_transfer(collab_display, tx_context::sender(ctx));
        transfer::public_transfer(publisher, tx_context::sender(ctx));
    }
    
    // ====== Test Only Functions ======
    
    #[test_only]
    /// Initialize function for testing
    public fun init_for_testing(ctx: &mut TxContext) {
        init(CREATOR_NFT {}, ctx);
    }
    
    // ====== Public Functions ======
    
    /// Mint a new Creator NFT
    public entry fun mint_creator_nft(
        name: vector<u8>,
        platform: vector<u8>,
        category: vector<u8>,
        image_url: vector<u8>,
        initial_score: u64,
        ctx: &mut TxContext
    ) {
        assert!(initial_score <= 100, EInvalidScore);
        
        let creator_nft = CreatorNFT {
            id: object::new(ctx),
            name: string::utf8(name),
            platform: string::utf8(platform),
            category: string::utf8(category),
            creator: tx_context::sender(ctx),
            url: url::new_unsafe_from_bytes(image_url),
            score: initial_score,
            creation_time: tx_context::epoch(ctx),
        };
        
        event::emit(CreatorNFTMinted {
            id: object::id(&creator_nft),
            name: creator_nft.name,
            platform: creator_nft.platform,
            category: creator_nft.category,
            creator: creator_nft.creator,
        });
        
        transfer::transfer(creator_nft, tx_context::sender(ctx));
    }
    
    /// Update a Creator NFT's score
    public entry fun update_score(
        nft: &mut CreatorNFT, 
        new_score: u64,
        ctx: &mut TxContext
    ) {
        assert!(new_score <= 100, EInvalidScore);
        
        let old_score = nft.score;
        nft.score = new_score;
        
        event::emit(CreatorScoreUpdated {
            id: object::id(nft),
            old_score,
            new_score,
        });
    }
    
    /// Create a new Collaboration NFT
    public entry fun create_collaboration(
        name: vector<u8>,
        creator_b: address,
        description: vector<u8>,
        image_url: vector<u8>,
        ctx: &mut TxContext
    ) {
        let collaboration_nft = CollaborationNFT {
            id: object::new(ctx),
            name: string::utf8(name),
            creator_a: tx_context::sender(ctx),
            creator_b,
            description: string::utf8(description),
            url: url::new_unsafe_from_bytes(image_url),
            creation_time: tx_context::epoch(ctx),
            status: 0, // active
        };
        
        event::emit(CollaborationCreated {
            id: object::id(&collaboration_nft),
            name: collaboration_nft.name,
            creator_a: collaboration_nft.creator_a,
            creator_b: collaboration_nft.creator_b,
        });
        
        transfer::transfer(collaboration_nft, tx_context::sender(ctx));
    }
    
    /// Complete a collaboration
    public entry fun complete_collaboration(
        collab: &mut CollaborationNFT,
        ctx: &mut TxContext
    ) {
        assert!(collab.creator_a == tx_context::sender(ctx) || collab.creator_b == tx_context::sender(ctx), ENotOwner);
        
        let old_status = collab.status;
        collab.status = 1; // completed
        
        event::emit(CollaborationStatusChanged {
            id: object::id(collab),
            old_status,
            new_status: 1,
        });
    }
    
    /// Burn a collaboration
    public entry fun burn_collaboration(
        collab: &mut CollaborationNFT,
        ctx: &mut TxContext
    ) {
        assert!(collab.creator_a == tx_context::sender(ctx) || collab.creator_b == tx_context::sender(ctx), ENotOwner);
        
        let old_status = collab.status;
        collab.status = 2; // burned
        
        event::emit(CollaborationStatusChanged {
            id: object::id(collab),
            old_status,
            new_status: 2,
        });
    }
    
    // ====== View Functions ======
    
    /// Get Creator NFT details
    public fun get_creator_nft_details(nft: &CreatorNFT): (String, String, String, address, u64) {
        (nft.name, nft.platform, nft.category, nft.creator, nft.score)
    }
    
    /// Get Collaboration NFT details
    public fun get_collaboration_details(collab: &CollaborationNFT): (String, address, address, String, u8) {
        (collab.name, collab.creator_a, collab.creator_b, collab.description, collab.status)
    }
}