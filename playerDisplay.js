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
        // مضاعفة نقاط الكابتن حسب القوة المفعلة
        const userTeam = gameData.userTeams[currentUser];
        const activePowerUp = gameData.activePowerUps[currentUser];
        if (userTeam && userTeam.captain === player.id) {
            const isTripleCaptainActive = activePowerUp && activePowerUp.tripleCaptainRound === activeRound.id;
            if (isTripleCaptainActive) {
                points = points * 3; // تفعيل التريبل كابتن يضاعف النقاط 3 مرات في الجولة المفعل فيها
            } else {
                points = points * 2; // الكابتن العادي يضاعف النقاط مرتين
            }
        }
    }
    const userTeam = gameData.userTeams[currentUser];
    const isCaptain = userTeam && userTeam.captain === player.id;
    const isViceCaptain = userTeam && userTeam.viceCaptain === player.id;
    const activePowerUp = gameData.activePowerUps[currentUser];
    const isTripleCaptain = isCaptain && activePowerUp && activePowerUp.tripleCaptainRound === (activeRound ? activeRound.id : null);
    if (isCaptain) slot.classList.add('captain');
    if (isViceCaptain) slot.classList.add('vice-captain');
    if (isTripleCaptain) slot.classList.add('triple-captain');
    slot.innerHTML = `
        <div class="player-name">${player.name}</div>
        <div class="player-team">${player.team}</div>
        <div class="player-position-tag">${player.position}</div>
        <div class="player-points">${points}</div>
        ${position.startsWith('sub') ? '' : `<button class="delete-player-btn" onclick="handleDeletePlayer('${position}')">🗑️</button>`}
    `;
    console.log(`Filled slot for ${player.name} in position ${position}`);
    console.log(`Captain: ${isCaptain}, Vice: ${isViceCaptain}, Triple: ${isTripleCaptain}`);
}