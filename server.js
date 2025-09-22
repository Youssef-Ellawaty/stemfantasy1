const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = 'your-secret-key-change-this-in-production';

// Middleware
app.use(cors());
app.use(express.json());

// Data file path
const DATA_FILE = path.join(__dirname, 'data.json');

// Initialize data file if it doesn't exist
async function initializeData() {
    try {
        await fs.access(DATA_FILE);
    } catch (error) {
        // File doesn't exist, create it with initial data
        const initialData = {
            users: [],
            gameData: {
                users: [],
                teams: ['7enkesh FC', 'ZD Manga United', 'Settak El- 3ay2a', 'Uncle Bahgat', '5altak El-Ray2a', 'Goal Hunters', 'Goal poachers', 'Koom El-Zawany'],
                players: [
                    { id: 'p1', name: 'Ziad Abdelkarem', team: '7enkesh FC', position: 'forward', price: 10.0, points: 0, goals: 0, assists: 0, saves: 0, cleanSheets: 0, yellowCards: 0, redCards: 0 },
                    { id: 'p2', name: 'M3z', team: '7enkesh FC', position: 'midfielder', price: 8.0, points: 0, goals: 0, assists: 0, saves: 0, cleanSheets: 0, yellowCards: 0, redCards: 0 },
                    { id: 'p3', name: 'Abdulhameed', team: '7enkesh FC', position: 'defender', price: 5.5, points: 0, goals: 0, assists: 0, saves: 0, cleanSheets: 0, yellowCards: 0, redCards: 0 },
                    { id: 'p4', name: 'Osama', team: '7enkesh FC', position: 'midfielder', price: 4.0, points: 0, goals: 0, assists: 0, saves: 0, cleanSheets: 0, yellowCards: 0, redCards: 0 },
                    { id: 'p5', name: 'Sharkawy', team: '7enkesh FC', position: 'goalkeeper', price: 5.5, points: 0, goals: 0, assists: 0, saves: 0, cleanSheets: 0, yellowCards: 0, redCards: 0 },

                    { id: 'p6', name: 'El-Masry', team: 'ZD Manga United', position: 'forward', price: 9.5, points: 0, goals: 0, assists: 0, saves: 0, cleanSheets: 0, yellowCards: 0, redCards: 0 },
                    { id: 'p7', name: 'A.Ayman', team: 'ZD Manga United', position: 'forward', price: 8.0, points: 0, goals: 0, assists: 0, saves: 0, cleanSheets: 0, yellowCards: 0, redCards: 0 },
                    { id: 'p8', name: 'El-Lawaty', team: 'ZD Manga United', position: 'defender', price: 6.0, points: 0, goals: 0, assists: 0, saves: 0, cleanSheets: 0, yellowCards: 0, redCards: 0 },
                    { id: 'p9', name: 'Hanafy', team: 'ZD Manga United', position: 'forward', price: 4.5, points: 0, goals: 0, assists: 0, saves: 0, cleanSheets: 0, yellowCards: 0, redCards: 0 },
                    { id: 'p10', name: 'Hommos', team: 'ZD Manga United', position: 'goalkeeper', price: 4.5, points: 0, goals: 0, assists: 0, saves: 0, cleanSheets: 0, yellowCards: 0, redCards: 0 },

                    { id: 'p11', name: 'Maher', team: 'Settak El- 3ay2a', position: 'forward', price: 10.5, points: 0, goals: 0, assists: 0, saves: 0, cleanSheets: 0, yellowCards: 0, redCards: 0 },
                    { id: 'p12', name: 'Bavly', team: 'Settak El- 3ay2a', position: 'midfielder', price: 8.5, points: 0, goals: 0, assists: 0, saves: 0, cleanSheets: 0, yellowCards: 0, redCards: 0 },
                    { id: 'p13', name: 'Abdulkareem', team: 'Settak El- 3ay2a', position: 'midfielder', price: 5.5, points: 0, goals: 0, assists: 0, saves: 0, cleanSheets: 0, yellowCards: 0, redCards: 0 },
                    { id: 'p14', name: 'Saber', team: 'Settak El- 3ay2a', position: 'defender', price: 4.0, points: 0, goals: 0, assists: 0, saves: 0, cleanSheets: 0, yellowCards: 0, redCards: 0 },
                    { id: 'p15', name: 'Ammar', team: 'Settak El- 3ay2a', position: 'goalkeeper', price: 5.0, points: 0, goals: 0, assists: 0, saves: 0, cleanSheets: 0, yellowCards: 0, redCards: 0 },

                    { id: 'p16', name: 'Danaf', team: 'Uncle Bahgat', position: 'midfielder', price: 11.0, points: 0, goals: 0, assists: 0, saves: 0, cleanSheets: 0, yellowCards: 0, redCards: 0 },
                    { id: 'p17', name: 'Ayyad', team: 'Uncle Bahgat', position: 'midfielder', price: 7.5, points: 0, goals: 0, assists: 0, saves: 0, cleanSheets: 0, yellowCards: 0, redCards: 0 },
                    { id: 'p18', name: 'Bonna', team: 'Uncle Bahgat', position: 'midfielder', price: 5.0, points: 0, goals: 0, assists: 0, saves: 0, cleanSheets: 0, yellowCards: 0, redCards: 0 },
                    { id: 'p19', name: 'Nasef', team: 'Uncle Bahgat', position: 'defender', price: 4.0, points: 0, goals: 0, assists: 0, saves: 0, cleanSheets: 0, yellowCards: 0, redCards: 0 },
                    { id: 'p20', name: 'O.kamal', team: 'Uncle Bahgat', position: 'goalkeeper', price: 4.0, points: 0, goals: 0, assists: 0, saves: 0, cleanSheets: 0, yellowCards: 0, redCards: 0 },

                    { id: 'p21', name: 'Yasser', team: '5altak El-Ray2a', position: 'midfielder', price: 12.5, points: 0, goals: 0, assists: 0, saves: 0, cleanSheets: 0, yellowCards: 0, redCards: 0 },
                    { id: 'p22', name: 'Seif', team: '5altak El-Ray2a', position: 'midfielder', price: 7.5, points: 0, goals: 0, assists: 0, saves: 0, cleanSheets: 0, yellowCards: 0, redCards: 0 },
                    { id: 'p23', name: 'Hazem', team: '5altak El-Ray2a', position: 'forward', price: 6.5, points: 0, goals: 0, assists: 0, saves: 0, cleanSheets: 0, yellowCards: 0, redCards: 0 },
                    { id: 'p24', name: 'Y.Gaber', team: '5altak El-Ray2a', position: 'defender', price: 4.5, points: 0, goals: 0, assists: 0, saves: 0, cleanSheets: 0, yellowCards: 0, redCards: 0 },
                    { id: 'p25', name: 'El-Degwey', team: '5altak El-Ray2a', position: 'goalkeeper', price: 5.0, points: 0, goals: 0, assists: 0, saves: 0, cleanSheets: 0, yellowCards: 0, redCards: 0 },

                    { id: 'p26', name: 'Eyad', team: 'Goal Hunters', position: 'midfielder', price: 12.0, points: 0, goals: 0, assists: 0, saves: 0, cleanSheets: 0, yellowCards: 0, redCards: 0 },
                    { id: 'p27', name: 'Amr', team: 'Goal Hunters', position: 'forward', price: 8.5, points: 0, goals: 0, assists: 0, saves: 0, cleanSheets: 0, yellowCards: 0, redCards: 0 },
                    { id: 'p28', name: 'Tharwat', team: 'Goal Hunters', position: 'midfielder', price: 5.0, points: 0, goals: 0, assists: 0, saves: 0, cleanSheets: 0, yellowCards: 0, redCards: 0 },
                    { id: 'p29', name: 'Mo Ayman', team: 'Goal Hunters', position: 'midfielder', price: 4.5, points: 0, goals: 0, assists: 0, saves: 0, cleanSheets: 0, yellowCards: 0, redCards: 0 },
                    { id: 'p30', name: 'Y.mus3ad', team: 'Goal Hunters', position: 'goalkeeper', price: 4.0, points: 0, goals: 0, assists: 0, saves: 0, cleanSheets: 0, yellowCards: 0, redCards: 0 },

                    { id: 'p31', name: 'Bedewy', team: 'Goal poachers', position: 'midfielder', price: 11.5, points: 0, goals: 0, assists: 0, saves: 0, cleanSheets: 0, yellowCards: 0, redCards: 0 },
                    { id: 'p32', name: 'Yassin', team: 'Goal poachers', position: 'forward', price: 7.0, points: 0, goals: 0, assists: 0, saves: 0, cleanSheets: 0, yellowCards: 0, redCards: 0 },
                    { id: 'p33', name: 'Salem', team: 'Goal poachers', position: 'midfielder', price: 6.5, points: 0, goals: 0, assists: 0, saves: 0, cleanSheets: 0, yellowCards: 0, redCards: 0 },
                    { id: 'p34', name: 'Mowafi', team: 'Goal poachers', position: 'forward', price: 4.5, points: 0, goals: 0, assists: 0, saves: 0, cleanSheets: 0, yellowCards: 0, redCards: 0 },
                    { id: 'p35', name: 'Ba7rawy', team: 'Goal poachers', position: 'goalkeeper', price: 4.5, points: 0, goals: 0, assists: 0, saves: 0, cleanSheets: 0, yellowCards: 0, redCards: 0 },

                    { id: 'p36', name: 'M. A4raf', team: 'Koom El-Zawany', position: 'forward', price: 10.0, points: 0, goals: 0, assists: 0, saves: 0, cleanSheets: 0, yellowCards: 0, redCards: 0 },
                    { id: 'p37', name: 'Sherbo', team: 'Koom El-Zawany', position: 'midfielder', price: 9.0, points: 0, goals: 0, assists: 0, saves: 0, cleanSheets: 0, yellowCards: 0, redCards: 0 },
                    { id: 'p38', name: 'O.Salah', team: 'Koom El-Zawany', position: 'defender', price: 6.0, points: 0, goals: 0, assists: 0, saves: 0, cleanSheets: 0, yellowCards: 0, redCards: 0 },
                    { id: 'p39', name: 'Ali 2arada', team: 'Koom El-Zawany', position: 'defender', price: 4.0, points: 0, goals: 0, assists: 0, saves: 0, cleanSheets: 0, yellowCards: 0, redCards: 0 },
                    { id: 'p40', name: 'Y.Ragab', team: 'Koom El-Zawany', position: 'goalkeeper', price: 4.5, points: 0, goals: 0, assists: 0, saves: 0, cleanSheets: 0, yellowCards: 0, redCards: 0 }
                ],
                rounds: [
                    { id: 1, name: 'الجولة الأولى', start: '2025-09-16T18:00', end: '2025-09-23T23:59' }
                ],
                matches: [],
                currentRound: 1,
                userTeams: {},
                transfersUsed: {},
                powerUpsUsed: {},
                activePowerUps: {}
            }
        };
        await fs.writeFile(DATA_FILE, JSON.stringify(initialData, null, 2));
    }
}

// Read data from file
async function readData() {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading data:', error);
        return null;
    }
}

// Write data to file
async function writeData(data) {
    try {
        await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
        return true;
    } catch (error) {
        console.error('Error writing data:', error);
        return false;
    }
}

// Middleware to verify JWT token
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Access token required' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid token' });
        }
        req.user = user;
        next();
    });
}

// Routes

// Register new user
app.post('/api/register', async (req, res) => {
    try {
        const { username, password, email } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }

        const data = await readData();
        if (!data) {
            return res.status(500).json({ error: 'Server error' });
        }

        // Check if user already exists
        const existingUser = data.users.find(user => user.username === username);
        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = {
            id: Date.now().toString(),
            username,
            password: hashedPassword,
            email: email || '',
            createdAt: new Date().toISOString()
        };

        data.users.push(newUser);

        // Initialize user team data
        data.gameData.userTeams[username] = {
            players: {},
            captain: null,
            viceCaptain: null,
            budget: 100.0
        };
        data.gameData.transfersUsed[username] = 0;
        data.gameData.powerUpsUsed[username] = {
            tripleCaptain: false,
            benchBoost: false
        };
        data.gameData.activePowerUps[username] = {
            tripleCaptain: false,
            benchBoost: false,
            activeRound: null
        };

        await writeData(data);

        // Generate JWT token
        const token = jwt.sign({ username, id: newUser.id }, JWT_SECRET, { expiresIn: '24h' });

        res.status(201).json({
            message: 'User registered successfully',
            token,
            user: { username, email: newUser.email }
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Login user
app.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }

        const data = await readData();
        if (!data) {
            return res.status(500).json({ error: 'Server error' });
        }

        // Find user
        const user = data.users.find(u => u.username === username);
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Check password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ username, id: user.id }, JWT_SECRET, { expiresIn: '24h' });

        res.json({
            message: 'Login successful',
            token,
            user: { username, email: user.email }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Get game data
app.get('/api/game-data', authenticateToken, async (req, res) => {
    try {
        const data = await readData();
        if (!data) {
            return res.status(500).json({ error: 'Server error' });
        }

        res.json(data.gameData);
    } catch (error) {
        console.error('Get game data error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Update game data
app.post('/api/game-data', authenticateToken, async (req, res) => {
    try {
        const { gameData } = req.body;

        if (!gameData) {
            return res.status(400).json({ error: 'Game data is required' });
        }

        const data = await readData();
        if (!data) {
            return res.status(500).json({ error: 'Server error' });
        }

        data.gameData = gameData;
        await writeData(data);

        res.json({ message: 'Game data updated successfully' });
    } catch (error) {
        console.error('Update game data error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Get user profile
app.get('/api/profile', authenticateToken, async (req, res) => {
    try {
        const data = await readData();
        if (!data) {
            return res.status(500).json({ error: 'Server error' });
        }

        const user = data.users.find(u => u.username === req.user.username);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({
            username: user.username,
            email: user.email,
            createdAt: user.createdAt
        });
    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'stemfantasy.html'));
});
// Serve static files
app.use(express.static('.'));

// Start server
async function startServer() {
    await initializeData();
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

startServer().catch(console.error);
