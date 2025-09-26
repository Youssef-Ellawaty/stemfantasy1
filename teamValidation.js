// Function to check if adding a player would exceed team limits
function checkTeamLimits(playerId, gameData, username) {
    const player = gameData.players.find(p => p.id === playerId);
    if (!player) return false;

    const userTeam = gameData.userTeams[username];
    if (!userTeam) return false;

    // حساب عدد اللاعبين الحاليين من نفس الفريق
    const teamPlayers = Object.values(userTeam.players).filter(p => {
        const playerData = gameData.players.find(gp => gp.id === p.id);
        return playerData && playerData.team === player.team;
    });

    // البحث عن الجولة القادمة
    let round;
    for (let i = 0; i < gameData.rounds.length; i++) {
        const r = gameData.rounds[i];
        if (!r.startTime || !r.endTime) continue;
        const now = new Date();
        const start = new Date(r.startTime);
        const end = new Date(r.endTime);
        if (now < start) {
            round = r;
            break;
        }
    }

    // استخدام حد الجولة القادمة أو القيمة الافتراضية (3)
    const maxAllowed = round ? round.maxFromTeam : 3;
    const currentCount = teamPlayers.length;
    
    // تسجيل المعلومات للتصحيح
    console.log(`
        Team: ${player.team}
        Current players: ${currentCount}
        Max allowed: ${maxAllowed}
        Round: ${round ? round.name : 'No upcoming round'}
        Round maxFromTeam: ${round ? round.maxFromTeam : 'N/A'}
    `);
    
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