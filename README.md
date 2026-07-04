# Mini Task Manager

A simple task management application built with Next.js and Express.js.

## Tech Stack

- **Frontend**: Next.js (App Router), TypeScript, TailwindCSS
- **Backend**: Node.js, Express.js, TypeScript
- **Database**: MongoDB with Mongoose

## Project Structure

```
├── client/          # Next.js frontend
│   ├── app/         # App Router pages
│   ├── components/  # React components
│   ├── lib/         # Utility functions
│   └── types/       # TypeScript interfaces
│
├── server/          # Express.js backend
│   └── src/
│       ├── config/      # Database configuration
│       ├── controllers/ # Route handlers
│       ├── middleware/   # Error handling, validation
│       ├── models/      # Mongoose schemas
│       └── routes/      # API routes
```

## Features

- Add new tasks
- View all tasks
- Mark tasks as completed
- Delete tasks

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or Atlas)

### Installation

1. Install client dependencies:
   ```bash
   cd client
   npm install
   ```

2. Install server dependencies:
   ```bash
   cd server
   npm install
   ```

3. Create `.env` file in server directory:
   ```
   MONGODB_URI=mongodb://localhost:27017/taskmanager
   PORT=5000
   ```

4. Start the server:
   ```bash
   cd server
   npm run dev
   ```

5. Start the client:
   ```bash
   cd client
   npm run dev
   ```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/tasks | Get all tasks |
| POST | /api/tasks | Create a task |
| PATCH | /api/tasks/:id | Toggle task completion |
| DELETE | /api/tasks/:id | Delete a task |
