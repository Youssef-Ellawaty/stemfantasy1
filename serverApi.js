// Server communication functions
const serverApi = {
    async loadGameData(authToken) {
        if (!authToken) return null;
        
        try {
            const response = await fetch('/api/game-data', {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            });
            
            if (response.ok) {
                return await response.json();
            }
            console.error('Failed to load game data:', response.status);
            return null;
        } catch (error) {
            console.error('Error loading game data:', error);
            return null;
        }
    },
    
    async saveGameData(authToken, gameData) {
        if (!authToken) return false;
        
        try {
            const response = await fetch('/api/game-data', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ gameData })
            });
            
            if (response.ok) {
                console.log('Game data saved successfully');
                return true;
            }
            console.error('Failed to save game data:', response.status);
            return false;
        } catch (error) {
            console.error('Error saving game data:', error);
            return false;
        }
    }
};