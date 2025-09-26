// Function to check if adding a player would exceed team limits
function checkTeamLimits(playerId, gameData, username) {
    const player = gameData.players.find(p => p.id === playerId);
    if (!player) return false;

    const userTeam = gameData.userTeams[username];
    if (!userTeam) return false;

    const teamPlayers = Object.values(userTeam.players).filter(p => {
        const playerData = gameData.players.find(gp => gp.id === p.id);
        return playerData && playerData.team === player.team;
    });

    const maxAllowed = gameData.maxPlayersPerTeam[player.team] || 3;
    // Check if adding this player would exceed the limit
    const currentCount = teamPlayers.length;
    console.log(`Current players from ${player.team}: ${currentCount}, Max allowed: ${maxAllowed}`);
    return currentCount < maxAllowed;
}

// Function to get current team count for a specific team
function getTeamPlayerCount(teamName, gameData, username) {
    const userTeam = gameData.userTeams[username];
    if (!userTeam) return 0;
    
    console.log(`Checking team count for ${teamName}`);

    return Object.values(userTeam.players).filter(p => {
        const playerData = gameData.players.find(gp => gp.id === p.id);
        return playerData && playerData.team === teamName;
    }).length;
}

// Function to get remaining slots for a team
function getRemainingTeamSlots(teamName, gameData, username) {
    const maxAllowed = gameData.maxPlayersPerTeam[teamName] || 3;
    const currentCount = getTeamPlayerCount(teamName, gameData, username);
    return maxAllowed - currentCount;
}