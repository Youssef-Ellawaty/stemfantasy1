// Helper functions for managing game state and display

// Save current team state
function saveCurrentTeamState() {
    const userTeam = gameData.userTeams[currentUser];
    if (!userTeam) return;
    
    localStorage.setItem('lastTeamState', JSON.stringify({
        players: userTeam.players,
        formation: userTeam.formation,
        captain: userTeam.captain,
        viceCaptain: userTeam.viceCaptain
    }));
}

// Restore team state if needed
function restoreTeamState() {
    const savedState = localStorage.getItem('lastTeamState');
    if (!savedState) return;
    
    try {
        const state = JSON.parse(savedState);
        const userTeam = gameData.userTeams[currentUser];
        if (!userTeam) return;
        
        userTeam.players = state.players;
        userTeam.formation = state.formation;
        userTeam.captain = state.captain;
        userTeam.viceCaptain = state.viceCaptain;
        
        console.log('Team state restored:', state);
    } catch (error) {
        console.error('Error restoring team state:', error);
    }
}

// Update formation display with proper error handling
function updateFormationDisplay() {
    const userTeam = gameData.userTeams[currentUser];
    if (!userTeam || !userTeam.players) {
        console.error('No user team data found');
        return;
    }
    
    // Save current state before any updates
    saveCurrentTeamState();
    
    // Update the formation display
    try {
        updateFormation();
    } catch (error) {
        console.error('Error updating formation:', error);
        // Try to restore previous state if update fails
        restoreTeamState();
    }
}

// Validate and ensure player data is complete
function validatePlayerData(players) {
    return players.every(player => 
        player && 
        player.id && 
        player.name && 
        player.team && 
        player.position
    );
}