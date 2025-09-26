// Function to show team limits modal
function showTeamLimitsModal() {
    const modal = document.getElementById('team-limits-modal');
    const form = document.getElementById('team-limits-form');
    form.innerHTML = '';

    // Create input fields for each team
    gameData.teams.forEach(teamName => {
        const currentLimit = gameData.maxPlayersPerTeam[teamName] || 3;
        const div = document.createElement('div');
        div.className = 'form-group';
        div.innerHTML = `
            <label for="limit-${teamName}">${teamName}</label>
            <input type="number" 
                   id="limit-${teamName}" 
                   value="${currentLimit}" 
                   min="1" 
                   max="11" 
                   class="form-control">
        `;
        form.appendChild(div);
    });

    modal.classList.add('active');
}

// Function to save team limits
async function saveTeamLimits() {
    const newLimits = {};
    gameData.teams.forEach(teamName => {
        const input = document.getElementById(`limit-${teamName}`);
        newLimits[teamName] = parseInt(input.value) || 3;
    });

    try {
        const response = await fetch('/api/admin/max-players', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ maxPlayers: newLimits })
        });

        if (response.ok) {
            const result = await response.json();
            gameData.maxPlayersPerTeam = result.maxPlayersPerTeam;
            alert('تم تحديث حدود الفرق بنجاح');
            closeTeamLimitsModal();
        } else {
            alert('حدث خطأ أثناء تحديث حدود الفرق');
        }
    } catch (error) {
        console.error('Error saving team limits:', error);
        alert('حدث خطأ أثناء حفظ التغييرات');
    }
}

// Function to close team limits modal
function closeTeamLimitsModal() {
    document.getElementById('team-limits-modal').classList.remove('active');
}