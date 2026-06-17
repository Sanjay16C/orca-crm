# Orca CRM

Orca CRM is a full-stack CRM app for managing customers, workspaces, team members, and follow-up reminders. It has a React frontend, an Express API, MongoDB for data storage, Redis for caching and background jobs, and a separate worker process for scheduled follow-up tasks.

The app is built as a practical SaaS-style CRM project, with authentication, customer tracking, role-based workspace collaboration, and a Docker Compose setup for local development.

## Features

- User signup, login, logout, refresh tokens, and protected routes
- Google OAuth support
- Workspace creation and member management
- Customer CRUD operations
- Customer status, priority, contact details, and assignment tracking
- Follow-up reminder queue using BullMQ and Redis
- Background worker process for reminder jobs
- Redis-backed caching for customers and workspace members
- Email support through Resend/Nodemailer utilities
- Cloudinary upload support
- React dashboard UI with routed pages and reusable components

## Tech Stack

**Frontend**

- React
- React Router
- Axios
- Lottie React
- CSS

**Backend**

- Node.js
- Express
- MongoDB Atlas
- Mongoose
- Redis
- BullMQ
- Passport Google OAuth
- JWT
- bcrypt
- Winston and Morgan logging

**Development**

- Docker
- Docker Compose
- Nodemon

## Project Structure

```text
orca-crm/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   ├── Dockerfile
│   ├── package.json
│   └── package-lock.json
├── server/                 # Express API and worker
│   ├── src/
│   ├── Dockerfile
│   ├── package.json
│   └── package-lock.json
├── docker-compose.yaml
├── .gitignore
└── README.md
```

## Requirements

- Node.js 22 or compatible recent Node version
- npm
- Docker and Docker Compose
- MongoDB Atlas database
- Redis, provided locally through Docker Compose

## Environment Variables

Create these files locally:

```text
client/.env
server/.env
```

Do not commit `.env` files. They are already ignored by Git.

### `client/.env`

```env
REACT_APP_API_URL=http://localhost:8000
```

### `server/.env`

```env
PORT=8000
NODE_ENV=development

MONGODB_URI=your_mongodb_atlas_connection_string

JWT_SECRET=your_jwt_secret
REFRESH_SECRET=your_refresh_token_secret

ORIGIN_URL=http://localhost:3000
SERVER_URL=http://localhost:8000

REDIS_URL=redis://redis:6379
REDIS_HOST=redis
REDIS_PORT=6379

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret

RESEND_API_KEY=your_resend_api_key
```

## Running With Docker Compose

From the project root:

```bash
docker compose up --build
```

This starts:

- React client on `http://localhost:3000`
- Express API on `http://localhost:8000`
- Redis container for cache and queue jobs
- Worker process for follow-up reminders

Stop the stack:

```bash
docker compose down
```

Validate the Compose file:

```bash
docker compose config --quiet
```

View logs:

```bash
docker compose logs orca-crm-server
docker compose logs orca-crm-worker
docker compose logs redis
```

## Running Without Docker

Start Redis separately first, then run the frontend and backend.

Install backend dependencies:

```bash
cd server
npm install
```

Start the API:

```bash
npm run dev
```

Start the worker in another terminal:

```bash
npm run worker
```

Install frontend dependencies:

```bash
cd client
npm install
```

Start the React app:

```bash
npm start
```

## Useful Commands

Build Docker images:

```bash
docker compose build
```

Rebuild without cache:

```bash
docker compose build --no-cache
```

Show running containers:

```bash
docker compose ps
```

Stop and remove containers:

```bash
docker compose down
```

## Notes

- MongoDB is expected to run on Atlas.
- Redis is expected to run through Docker Compose during local development.
- The backend and worker both need Redis connection variables because the API uses Redis caching and BullMQ uses Redis for jobs.
- The frontend calls the API through `REACT_APP_API_URL`.
- Keep secrets in local `.env` files only.
