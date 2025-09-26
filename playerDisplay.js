// Function to fill a position slot with player data
function fillSlotWithPlayer(slot, player, position) {
    if (!slot || !player) return;
    
    slot.classList.add('filled');
    slot.setAttribute('data-player-id', player.id);
    
    // Get current match stats
    const activeRound = getCurrentActiveRound();
    let points = 0;
    if (activeRound) {
        points = getPlayerPointsByCurrentRound(player.id);
    }
    
    // Check if player is captain or vice-captain
    const userTeam = gameData.userTeams[currentUser];
    const isCaptain = userTeam && userTeam.captain === player.id;
    const isViceCaptain = userTeam && userTeam.viceCaptain === player.id;
    
    // Check for triple captain
    const activePowerUp = gameData.activePowerUps[currentUser];
    const isTripleCaptain = isCaptain && activePowerUp && 
                           activePowerUp.tripleCaptain && 
                           activePowerUp.activeRound === (activeRound ? activeRound.id : null);
    
    // Add appropriate classes
    if (isCaptain) slot.classList.add('captain');
    if (isViceCaptain) slot.classList.add('vice-captain');
    if (isTripleCaptain) slot.classList.add('triple-captain');
    
    // Update slot content
    slot.innerHTML = `
        <div class="player-name">${player.name}</div>
        <div class="player-team">${player.team}</div>
        <div class="player-position-tag">${player.position}</div>
        <div class="player-points">${points}</div>
        ${position.startsWith('sub') ? '' : `<button class="delete-player-btn" onclick="handleDeletePlayer('${position}')">🗑️</button>`}
    `;
    
    // Add debug information
    console.log(`Filled slot for ${player.name} in position ${position}`);
    console.log(`Captain: ${isCaptain}, Vice: ${isViceCaptain}, Triple: ${isTripleCaptain}`);
}