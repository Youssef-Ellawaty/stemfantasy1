// Game data management functions
const gameDataManager = {
    async initialize() {
        try {
            await this.load();
            this.setupAutoSave();
        } catch (error) {
            console.error('Failed to initialize game data:', error);
            this.restoreFromBackup();
        }
    },

    async load() {
        if (!window.authToken) {
            this.restoreFromBackup();
            return;
        }

        try {
            const response = await fetch('/api/game-data', {
                headers: {
                    'Authorization': `Bearer ${window.authToken}`
                }
            });

            if (!response.ok) {
                throw new Error(`Failed to load game data: ${response.status}`);
            }

            const data = await response.json();
            if (data && typeof data === 'object') {
                window.gameData = data;
                this.createBackup();
                return true;
            }
            throw new Error('Invalid game data format');
        } catch (error) {
            console.error('Error loading game data:', error);
            this.restoreFromBackup();
            return false;
        }
    },

    async save() {
        if (!window.authToken || !window.gameData) return false;

        try {
            const response = await fetch('/api/game-data', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${window.authToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ gameData: window.gameData })
            });

            if (!response.ok) {
                throw new Error(`Failed to save game data: ${response.status}`);
            }

            this.createBackup();
            return true;
        } catch (error) {
            console.error('Error saving game data:', error);
            return false;
        }
    },

    createBackup() {
        if (window.gameData) {
            const backup = {
                timestamp: new Date().toISOString(),
                data: JSON.parse(JSON.stringify(window.gameData))
            };
            localStorage.setItem('gameDataBackup', JSON.stringify(backup));
        }
    },

    restoreFromBackup() {
        try {
            const backupStr = localStorage.getItem('gameDataBackup');
            if (backupStr) {
                const backup = JSON.parse(backupStr);
                if (backup.data) {
                    window.gameData = backup.data;
                    console.log('Restored game data from backup');
                    return true;
                }
            }
        } catch (error) {
            console.error('Failed to restore from backup:', error);
        }
        return false;
    },

    setupAutoSave() {
        // Auto-save every 5 minutes
        setInterval(() => this.save(), 5 * 60 * 1000);
    }
};