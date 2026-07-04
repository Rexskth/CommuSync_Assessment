# Mini Task Manager

A full-stack task management application built with Next.js, Express.js, and MongoDB.

## Live Demo

- **Frontend**: https://commu-sync-assessment.vercel.app/
- **Backend API**: https://commusync-api.onrender.com

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript, TailwindCSS
- **Backend**: Node.js, Express.js, TypeScript
- **Database**: MongoDB with Mongoose ODM

## Architecture Decisions

### Why Separate Client/Server?

The requirement specified both Next.js and Node.js + Express as separate technologies. Rather than using Next.js API routes, I chose a monorepo structure with separate client and server applications. This clearly demonstrates:

- RESTful API design with Express
- Frontend-backend separation of concerns
- CORS configuration between services
- Independent deployment capability

### Why Mongoose over native MongoDB driver?

Mongoose provides:
- Schema validation at the database level
- TypeScript integration via interfaces
- Middleware hooks for timestamps
- Query building convenience

### Validation Strategy

Validation happens at three levels:
1. **Frontend**: Immediate user feedback via form validation
2. **API Middleware**: Request validation before reaching controllers
3. **Mongoose Schema**: Database-level constraints as safety net

## Project Structure

```
├── client/                  # Next.js frontend
│   ├── app/                 # App Router pages
│   │   ├── layout.tsx       # Root layout with fonts
│   │   ├── page.tsx         # Home page with state management
│   │   └── globals.css      # Tailwind imports
│   ├── components/          # React components
│   │   ├── TaskForm.tsx     # Task creation form
│   │   ├── TaskList.tsx     # Task list container
│   │   └── TaskItem.tsx     # Individual task card
│   ├── lib/                 # Utility functions
│   │   └── api.ts           # API client functions
│   └── types/               # TypeScript interfaces
│       └── task.ts          # Task-related types
│
├── server/                  # Express.js backend
│   └── src/
│       ├── config/          # Configuration
│       │   └── db.ts        # MongoDB connection
│       ├── controllers/     # Route handlers
│       │   └── taskController.ts
│       ├── middleware/       # Middleware
│       │   ├── errorHandler.ts  # Centralized error handling
│       │   └── validate.ts      # Input validation
│       ├── models/          # Mongoose schemas
│       │   └── Task.ts      # Task model
│       ├── routes/          # API routes
│       │   └── taskRoutes.ts
│       └── app.ts           # Express server setup
```

## Features

- **Add Task**: Create tasks with title (required) and description (optional)
- **View Tasks**: See all tasks sorted by newest first
- **Complete Task**: Toggle task completion status with checkbox
- **Delete Task**: Remove tasks with confirmation prompt

## Input Validation

| Field | Rules |
|-------|-------|
| title | Required, 1-100 characters, trimmed |
| description | Optional, max 500 characters |
| task id | Must be valid MongoDB ObjectId |

## Error Handling

- Frontend displays user-friendly error messages
- API returns consistent `{ success, data?, error? }` format
- Backend handles MongoDB errors (duplicates, validation, cast errors)
- 404 handler for undefined routes

## Deployment

| Component | Platform | URL |
|-----------|----------|-----|
| Frontend | Vercel | [commu-sync-assessment.vercel.app](https://commu-sync-assessment.vercel.app/) |
| Backend | Render | [commusync-api.onrender.com](https://commusync-api.onrender.com) |
| Database | MongoDB Atlas | Cloud-hosted |

### Free Tier Notes

- **Render**: Backend spins down after 15min inactivity. First request may take 30-60 seconds to wake up.
- **Vercel**: No limitations for personal use.
- **MongoDB Atlas**: Free tier with 512MB storage.

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local installation or Atlas cluster)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Rexskth/CommuSync_Assessment.git
   cd CommuSync_Assessment
   ```

2. Install server dependencies:
   ```bash
   cd server
   npm install
   ```

3. Install client dependencies:
   ```bash
   cd ../client
   npm install
   ```

### Configuration

1. Create server environment file:
   ```bash
   cp server/.env.example server/.env
   ```

2. (Optional) Create client environment file:
   ```bash
   cp client/.env.local.example client/.env.local
   ```

### Running the Application

1. Start MongoDB (if running locally)

2. Start the backend server:
   ```bash
   cd server
   npm run dev
   ```

3. Start the frontend (in a new terminal):
   ```bash
   cd client
   npm run dev
   ```

4. Open http://localhost:3000 in your browser

## API Endpoints

| Method | Endpoint | Body | Description |
|--------|----------|------|-------------|
| GET | /api/tasks | - | Get all tasks |
| POST | /api/tasks | `{ title, description? }` | Create a task |
| PATCH | /api/tasks/:id | - | Toggle completion status |
| DELETE | /api/tasks/:id | - | Delete a task |

### Response Format

```json
{
  "success": true,
  "data": { ... }
}
```

```json
{
  "success": false,
  "error": "Error message"
}
```

## Links

- [GitHub Repository](https://github.com/Rexskth/CommuSync_Assessment)
- [Live Frontend](https://commu-sync-assessment.vercel.app/)
- [Live API](https://commusync-api.onrender.com/api/tasks)
