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
        // تحديث حدود الفريق للجولة القادمة
        let nextRound = null;
        const now = new Date();
        for (let i = 0; i < gameData.rounds.length; i++) {
            const r = gameData.rounds[i];
            if (!r.startTime || !r.endTime) continue;
            const start = new Date(r.startTime);
            if (now < start) {
                nextRound = r;
                break;
            }
        }

        if (nextRound) {
            // تحديث الحد الأقصى للجولة القادمة
            nextRound.maxFromTeam = Math.max(...Object.values(newLimits));
            // حفظ التغييرات في gameData
            await saveGameData();
            console.log(`Updated maxFromTeam for round ${nextRound.name} to: ${nextRound.maxFromTeam}`);
            alert(`تم تحديث حد اللاعبين في الجولة ${nextRound.name} إلى ${nextRound.maxFromTeam}`);
            closeTeamLimitsModal();
        } else {
            alert('لم يتم العثور على جولة قادمة لتحديث الحدود');
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