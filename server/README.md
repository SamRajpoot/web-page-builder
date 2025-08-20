# Web Page Builder Backend

## Setup

1. Install dependencies:
   ```sh
   npm install express mongoose cors dotenv bcryptjs jsonwebtoken
   ```
2. Set up MongoDB (local or Atlas) and update `.env` with your connection string.
3. Start the backend:
   ```sh
   node server.js
   ```

- API runs on `http://localhost:5000/api`
- Endpoints: `/api/templates`, `/api/sections`, `/api/auth/login`, `/api/auth/signup`, `/api/export`

## Models
- `Template`: { name, elements[] }
- `Section`: { name, elements[] }
- `User`: { username, password (hashed) }

## Frontend Integration
- The React frontend is preconfigured to use these endpoints.
- No further changes needed for basic CRUD and authentication.
