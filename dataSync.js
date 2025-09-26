// Update and sync game data
async function updateGameData() {
    try {
        await gameDataManager.save();
        updateUI();
    } catch (error) {
        console.error('Failed to update game data:', error);
    }
}

// Save changes to server and local backup
async function saveChanges() {
    try {
        const saved = await gameDataManager.save();
        if (!saved) {
            throw new Error('Failed to save changes');
        }
        updateUI();
        return true;
    } catch (error) {
        console.error('Error saving changes:', error);
        return false;
    }
}

// Load fresh data from server
async function refreshGameData() {
    try {
        await gameDataManager.load();
        updateUI();
        return true;
    } catch (error) {
        console.error('Error refreshing game data:', error);
        return false;
    }
}

// Initialize game data when loading page
document.addEventListener('DOMContentLoaded', async () => {
    try {
        await gameDataManager.initialize();
        updateUI();
    } catch (error) {
        console.error('Failed to initialize game:', error);
    }
});