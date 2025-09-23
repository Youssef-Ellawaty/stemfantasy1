# STEM Fantasy Football Game

A fantasy football management game built with HTML, CSS, JavaScript, and Node.js.

## Features

- **Team Management**: Create and manage your fantasy football team
- **Player Transfers**: Make transfers between players with timing restrictions
- **Power-ups**: Use Triple Captain and Bench Boost strategically
- **Matches**: View match results and statistics
- **Statistics**: Track player performance including goals, assists, cards, etc.
- **Rankings**: See how you compare with other players
- **Admin Panel**: Manage the game with password protection
- **User Authentication**: Register and login system with Node.js backend

## Installation

### Prerequisites
- Node.js (version 14 or higher)
- npm (Node Package Manager)

### Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the server:**
   ```bash
   npm start
   ```

3. **Open the game:**
   - Navigate to `http://localhost:3000` in your web browser
   - The game will load with the HTML interface

### Development Mode

For development with auto-restart:
```bash
npm run dev
```

## Game Features

### Team Formation
- 1 Goalkeeper
- 1 Defender
- 2 Midfielders
- 1 Forward
- 2 Substitutes

### Transfers
- Limited transfers per game week
- Can only make transfers when no active round is running
- Visual feedback for pending changes
- Save button to confirm all changes at once

### Power-ups
- **Triple Captain**: 3x points for your captain
- **Bench Boost**: Points from all substitute players
- Confirmation required before activation
- Can only use each power-up once per season

### Admin Features
- Password-protected admin panel
- Manage rounds, matches, teams, and players
- Update player statistics and points
- View all registered users

## API Endpoints

- `POST /api/register` - Register new user
- `POST /api/login` - Login user
- `GET /api/game-data` - Get game data (requires authentication)
- `POST /api/game-data` - Update game data (requires authentication)
- `GET /api/profile` - Get user profile (requires authentication)

## Security

- Passwords are hashed using bcrypt
- JWT tokens for authentication
- Admin panel protected with password
- CORS enabled for cross-origin requests

## Data Storage

Game data is stored in `data.json` file on the server. This includes:
- User accounts
- Player statistics
- Match results
- Team formations
- Rankings

## Customization

### Admin Password
Change the admin password in `server.js`:
```javascript
const ADMIN_PASSWORD = 'your-secure-password';
```

### JWT Secret
Change the JWT secret in `server.js`:
```javascript
const JWT_SECRET = 'your-secret-key-change-this-in-production';
```

## Browser Compatibility

The game works on modern browsers that support:
- ES6+ JavaScript features
- CSS Grid and Flexbox
- Local Storage API

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details.
