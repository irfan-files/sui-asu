#[test_only]
module creator_hub::creator_nft_tests {
    use std::string;
    use sui::test_scenario::{Self, Scenario};
    use sui::test_utils;
    use creator_hub::creator_nft::{Self, CreatorNFT, CollaborationNFT, CREATOR_NFT};

    // Test addresses
    const ADMIN: address = @0xAD;
    const CREATOR_A: address = @0xA;
    const CREATOR_B: address = @0xB;
    const USER: address = @0xC;

    // Helper function to create a test scenario
    fun create_test_scenario(): Scenario {
        test_scenario::begin(ADMIN)
    }

    #[test]
    fun test_init_module() {
        let scenario = create_test_scenario();
        let scenario_mut = &mut scenario;
        
        // Initialize the module
        test_scenario::next_tx(scenario_mut, ADMIN);
        {
            creator_nft::init_for_testing(test_scenario::ctx(scenario_mut));
        };
        
        // Check that Publisher and Display objects were created and transferred to admin
        test_scenario::next_tx(scenario_mut, ADMIN);
        {
            // The init function should transfer publisher and display objects to sender
            // In a real test environment, you would check for these objects
            // For now, we just verify the transaction succeeds
        };
        
        test_scenario::end(scenario);
    }

    #[test]
    fun test_mint_creator_nft_success() {
        let scenario = create_test_scenario();
        let scenario_mut = &mut scenario;
        
        // Initialize module first
        test_scenario::next_tx(scenario_mut, ADMIN);
        {
            creator_nft::init_for_testing(test_scenario::ctx(scenario_mut));
        };
        
        // Mint a Creator NFT
        test_scenario::next_tx(scenario_mut, CREATOR_A);
        {
            creator_nft::mint_creator_nft(
                b"TestCreator",
                b"YouTube",
                b"Gaming",
                b"https://example.com/image.png",
                85,
                test_scenario::ctx(scenario_mut)
            );
        };
        
        // Verify the NFT was created and transferred to the creator
        test_scenario::next_tx(scenario_mut, CREATOR_A);
        {
            let nft = test_scenario::take_from_sender<CreatorNFT>(scenario_mut);
            let (name, platform, category, creator, score) = creator_nft::get_creator_nft_details(&nft);
            
            assert!(name == string::utf8(b"TestCreator"), 0);
            assert!(platform == string::utf8(b"YouTube"), 1);
            assert!(category == string::utf8(b"Gaming"), 2);
            assert!(creator == CREATOR_A, 3);
            assert!(score == 85, 4);
            
            test_scenario::return_to_sender(scenario_mut, nft);
        };
        
        test_scenario::end(scenario);
    }

    #[test]
    #[expected_failure(abort_code = creator_nft::EInvalidScore)]
    fun test_mint_creator_nft_invalid_score() {
        let scenario = create_test_scenario();
        let scenario_mut = &mut scenario;
        
        // Initialize module first
        test_scenario::next_tx(scenario_mut, ADMIN);
        {
            creator_nft::init_for_testing(test_scenario::ctx(scenario_mut));
        };
        
        // Try to mint with invalid score (> 100)
        test_scenario::next_tx(scenario_mut, CREATOR_A);
        {
            creator_nft::mint_creator_nft(
                b"TestCreator",
                b"YouTube",
                b"Gaming",
                b"https://example.com/image.png",
                150, // Invalid score > 100
                test_scenario::ctx(scenario_mut)
            );
        };
        
        test_scenario::end(scenario);
    }

    #[test]
    fun test_update_score_success() {
        let scenario = create_test_scenario();
        let scenario_mut = &mut scenario;
        
        // Initialize and mint NFT
        test_scenario::next_tx(scenario_mut, ADMIN);
        {
            creator_nft::init_for_testing(test_scenario::ctx(scenario_mut));
        };
        
        test_scenario::next_tx(scenario_mut, CREATOR_A);
        {
            creator_nft::mint_creator_nft(
                b"TestCreator",
                b"YouTube",
                b"Gaming",
                b"https://example.com/image.png",
                50,
                test_scenario::ctx(scenario_mut)
            );
        };
        
        // Update the score
        test_scenario::next_tx(scenario_mut, CREATOR_A);
        {
            let nft = test_scenario::take_from_sender<CreatorNFT>(scenario_mut);
            creator_nft::update_score(&mut nft, 90, test_scenario::ctx(scenario_mut));
            
            let (_, _, _, _, score) = creator_nft::get_creator_nft_details(&nft);
            assert!(score == 90, 0);
            
            test_scenario::return_to_sender(scenario_mut, nft);
        };
        
        test_scenario::end(scenario);
    }

    #[test]
    #[expected_failure(abort_code = creator_nft::EInvalidScore)]
    fun test_update_score_invalid() {
        let scenario = create_test_scenario();
        let scenario_mut = &mut scenario;
        
        // Initialize and mint NFT
        test_scenario::next_tx(scenario_mut, ADMIN);
        {
            creator_nft::init_for_testing(test_scenario::ctx(scenario_mut));
        };
        
        test_scenario::next_tx(scenario_mut, CREATOR_A);
        {
            creator_nft::mint_creator_nft(
                b"TestCreator",
                b"YouTube",
                b"Gaming",
                b"https://example.com/image.png",
                50,
                test_scenario::ctx(scenario_mut)
            );
        };
        
        // Try to update with invalid score
        test_scenario::next_tx(scenario_mut, CREATOR_A);
        {
            let nft = test_scenario::take_from_sender<CreatorNFT>(scenario_mut);
            creator_nft::update_score(&mut nft, 150, test_scenario::ctx(scenario_mut)); // Should fail
            test_scenario::return_to_sender(scenario_mut, nft);
        };
        
        test_scenario::end(scenario);
    }

    #[test]
    fun test_create_collaboration_success() {
        let scenario = create_test_scenario();
        let scenario_mut = &mut scenario;
        
        // Initialize module
        test_scenario::next_tx(scenario_mut, ADMIN);
        {
            creator_nft::init_for_testing(test_scenario::ctx(scenario_mut));
        };
        
        // Create collaboration
        test_scenario::next_tx(scenario_mut, CREATOR_A);
        {
            creator_nft::create_collaboration(
                b"Epic Collab",
                CREATOR_B,
                b"A collaboration between two amazing creators",
                b"https://example.com/collab.png",
                test_scenario::ctx(scenario_mut)
            );
        };
        
        // Verify collaboration was created
        test_scenario::next_tx(scenario_mut, CREATOR_A);
        {
            let collab = test_scenario::take_from_sender<CollaborationNFT>(scenario_mut);
            let (name, creator_a, creator_b, description, status) = creator_nft::get_collaboration_details(&collab);
            
            assert!(name == string::utf8(b"Epic Collab"), 0);
            assert!(creator_a == CREATOR_A, 1);
            assert!(creator_b == CREATOR_B, 2);
            assert!(description == string::utf8(b"A collaboration between two amazing creators"), 3);
            assert!(status == 0, 4); // Active status
            
            test_scenario::return_to_sender(scenario_mut, collab);
        };
        
        test_scenario::end(scenario);
    }

    #[test]
    fun test_complete_collaboration_by_creator_a() {
        let scenario = create_test_scenario();
        let scenario_mut = &mut scenario;
        
        // Setup collaboration
        test_scenario::next_tx(scenario_mut, ADMIN);
        {
            creator_nft::init_for_testing(test_scenario::ctx(scenario_mut));
        };
        
        test_scenario::next_tx(scenario_mut, CREATOR_A);
        {
            creator_nft::create_collaboration(
                b"Epic Collab",
                CREATOR_B,
                b"A collaboration between two amazing creators",
                b"https://example.com/collab.png",
                test_scenario::ctx(scenario_mut)
            );
        };
        
        // Complete collaboration as creator A
        test_scenario::next_tx(scenario_mut, CREATOR_A);
        {
            let collab = test_scenario::take_from_sender<CollaborationNFT>(scenario_mut);
            creator_nft::complete_collaboration(&mut collab, test_scenario::ctx(scenario_mut));
            
            let (_, _, _, _, status) = creator_nft::get_collaboration_details(&collab);
            assert!(status == 1, 0); // Completed status
            
            test_scenario::return_to_sender(scenario_mut, collab);
        };
        
        test_scenario::end(scenario);
    }

    #[test]
    fun test_complete_collaboration_by_creator_b() {
        let scenario = create_test_scenario();
        let scenario_mut = &mut scenario;
        
        // Setup collaboration
        test_scenario::next_tx(scenario_mut, ADMIN);
        {
            creator_nft::init_for_testing(test_scenario::ctx(scenario_mut));
        };
        
        test_scenario::next_tx(scenario_mut, CREATOR_A);
        {
            creator_nft::create_collaboration(
                b"Epic Collab",
                CREATOR_B,
                b"A collaboration between two amazing creators",
                b"https://example.com/collab.png",
                test_scenario::ctx(scenario_mut)
            );
        };
        
        // Transfer collaboration to creator B for testing
        test_scenario::next_tx(scenario_mut, CREATOR_A);
        {
            let collab = test_scenario::take_from_sender<CollaborationNFT>(scenario_mut);
            sui::transfer::public_transfer(collab, CREATOR_B);
        };
        
        // Complete collaboration as creator B
        test_scenario::next_tx(scenario_mut, CREATOR_B);
        {
            let collab = test_scenario::take_from_sender<CollaborationNFT>(scenario_mut);
            creator_nft::complete_collaboration(&mut collab, test_scenario::ctx(scenario_mut));
            
            let (_, _, _, _, status) = creator_nft::get_collaboration_details(&collab);
            assert!(status == 1, 0); // Completed status
            
            test_scenario::return_to_sender(scenario_mut, collab);
        };
        
        test_scenario::end(scenario);
    }

    #[test]
    #[expected_failure(abort_code = creator_nft::ENotOwner)]
    fun test_complete_collaboration_unauthorized() {
        let scenario = create_test_scenario();
        let scenario_mut = &mut scenario;
        
        // Setup collaboration
        test_scenario::next_tx(scenario_mut, ADMIN);
        {
            creator_nft::init_for_testing(test_scenario::ctx(scenario_mut));
        };
        
        test_scenario::next_tx(scenario_mut, CREATOR_A);
        {
            creator_nft::create_collaboration(
                b"Epic Collab",
                CREATOR_B,
                b"A collaboration between two amazing creators",
                b"https://example.com/collab.png",
                test_scenario::ctx(scenario_mut)
            );
        };
        
        // Transfer to unauthorized user
        test_scenario::next_tx(scenario_mut, CREATOR_A);
        {
            let collab = test_scenario::take_from_sender<CollaborationNFT>(scenario_mut);
            sui::transfer::public_transfer(collab, USER);
        };
        
        // Try to complete as unauthorized user (should fail)
        test_scenario::next_tx(scenario_mut, USER);
        {
            let collab = test_scenario::take_from_sender<CollaborationNFT>(scenario_mut);
            creator_nft::complete_collaboration(&mut collab, test_scenario::ctx(scenario_mut));
            test_scenario::return_to_sender(scenario_mut, collab);
        };
        
        test_scenario::end(scenario);
    }

    #[test]
    fun test_burn_collaboration_success() {
        let scenario = create_test_scenario();
        let scenario_mut = &mut scenario;
        
        // Setup collaboration
        test_scenario::next_tx(scenario_mut, ADMIN);
        {
            creator_nft::init_for_testing(test_scenario::ctx(scenario_mut));
        };
        
        test_scenario::next_tx(scenario_mut, CREATOR_A);
        {
            creator_nft::create_collaboration(
                b"Epic Collab",
                CREATOR_B,
                b"A collaboration between two amazing creators",
                b"https://example.com/collab.png",
                test_scenario::ctx(scenario_mut)
            );
        };
        
        // Burn collaboration
        test_scenario::next_tx(scenario_mut, CREATOR_A);
        {
            let collab = test_scenario::take_from_sender<CollaborationNFT>(scenario_mut);
            creator_nft::burn_collaboration(&mut collab, test_scenario::ctx(scenario_mut));
            
            let (_, _, _, _, status) = creator_nft::get_collaboration_details(&collab);
            assert!(status == 2, 0); // Burned status
            
            test_scenario::return_to_sender(scenario_mut, collab);
        };
        
        test_scenario::end(scenario);
    }

    #[test]
    #[expected_failure(abort_code = creator_nft::ENotOwner)]
    fun test_burn_collaboration_unauthorized() {
        let scenario = create_test_scenario();
        let scenario_mut = &mut scenario;
        
        // Setup collaboration
        test_scenario::next_tx(scenario_mut, ADMIN);
        {
            creator_nft::init_for_testing(test_scenario::ctx(scenario_mut));
        };
        
        test_scenario::next_tx(scenario_mut, CREATOR_A);
        {
            creator_nft::create_collaboration(
                b"Epic Collab",
                CREATOR_B,
                b"A collaboration between two amazing creators",
                b"https://example.com/collab.png",
                test_scenario::ctx(scenario_mut)
            );
        };
        
        // Transfer to unauthorized user
        test_scenario::next_tx(scenario_mut, CREATOR_A);
        {
            let collab = test_scenario::take_from_sender<CollaborationNFT>(scenario_mut);
            sui::transfer::public_transfer(collab, USER);
        };
        
        // Try to burn as unauthorized user (should fail)
        test_scenario::next_tx(scenario_mut, USER);
        {
            let collab = test_scenario::take_from_sender<CollaborationNFT>(scenario_mut);
            creator_nft::burn_collaboration(&mut collab, test_scenario::ctx(scenario_mut));
            test_scenario::return_to_sender(scenario_mut, collab);
        };
        
        test_scenario::end(scenario);
    }

    #[test]
    fun test_view_functions() {
        let scenario = create_test_scenario();
        let scenario_mut = &mut scenario;
        
        // Initialize and create NFTs
        test_scenario::next_tx(scenario_mut, ADMIN);
        {
            creator_nft::init_for_testing(test_scenario::ctx(scenario_mut));
        };
        
        test_scenario::next_tx(scenario_mut, CREATOR_A);
        {
            creator_nft::mint_creator_nft(
                b"ViewTestCreator",
                b"TikTok",
                b"Dance",
                b"https://example.com/dance.png",
                75,
                test_scenario::ctx(scenario_mut)
            );
            
            creator_nft::create_collaboration(
                b"Dance Collab",
                CREATOR_B,
                b"Amazing dance collaboration",
                b"https://example.com/dancecollab.png",
                test_scenario::ctx(scenario_mut)
            );
        };
        
        // Test view functions
        test_scenario::next_tx(scenario_mut, CREATOR_A);
        {
            let creator_nft = test_scenario::take_from_sender<CreatorNFT>(scenario_mut);
            let collab_nft = test_scenario::take_from_sender<CollaborationNFT>(scenario_mut);
            
            // Test creator NFT view function
            let (name, platform, category, creator, score) = creator_nft::get_creator_nft_details(&creator_nft);
            assert!(name == string::utf8(b"ViewTestCreator"), 0);
            assert!(platform == string::utf8(b"TikTok"), 1);
            assert!(category == string::utf8(b"Dance"), 2);
            assert!(creator == CREATOR_A, 3);
            assert!(score == 75, 4);
            
            // Test collaboration NFT view function
            let (collab_name, creator_a, creator_b, description, status) = creator_nft::get_collaboration_details(&collab_nft);
            assert!(collab_name == string::utf8(b"Dance Collab"), 5);
            assert!(creator_a == CREATOR_A, 6);
            assert!(creator_b == CREATOR_B, 7);
            assert!(description == string::utf8(b"Amazing dance collaboration"), 8);
            assert!(status == 0, 9); // Active
            
            test_scenario::return_to_sender(scenario_mut, creator_nft);
            test_scenario::return_to_sender(scenario_mut, collab_nft);
        };
        
        test_scenario::end(scenario);
    }
}