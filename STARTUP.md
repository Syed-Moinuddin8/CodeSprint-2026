# Hackathon Master Plan - Startup Guide

## Project Overview
This is a pnpm workspace with a full-stack application consisting of:
- **API Server** (Express + SQLite + Drizzle ORM) - Port 5000
- **Frontend** (React + Vite + TailwindCSS) - Port 5173
- **Mockup Sandbox** - Additional development environment

## Prerequisites
- Node.js 22+
- pnpm package manager
- SQLite database (created automatically at ./data/hackathon.db)

## Quick Start

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Start API Server
```powershell
$env:PORT=5000; $env:DATABASE_PATH='./data/hackathon.db'; pnpm --filter @workspace/api-server run dev
```

### 3. Start Frontend (in a new terminal)
```powershell
$env:PORT=5173; $env:BASE_PATH='/'; pnpm --filter @workspace/hackathon run dev
```

**Note:** The frontend is configured to proxy `/api/*` requests to the backend at `http://localhost:5000`

## Access Points
- **Frontend**: http://localhost:5173/
- **API Server**: http://localhost:5000/

## Environment Variables
- `PORT` - Port number for the server
- `DATABASE_PATH` - Path to SQLite database file (default: ./data/hackathon.db)
- `BASE_PATH` - Base path for frontend routing

## Notes for Windows Development
This project was originally configured for Linux/Replit. Several modifications were made for Windows compatibility:
- Removed Unix shell commands from package.json scripts
- Enabled Windows-specific native dependencies (rollup, lightningcss, tailwindcss)
- Updated pnpm-workspace.yaml to allow Windows platform packages

## Available Commands
- `pnpm run build` - Build all packages
- `pnpm run typecheck` - Type check all packages
- `pnpm --filter @workspace/api-spec run codegen` - Regenerate API schemas
- `pnpm --filter @workspace/db run push` - Push database schema changes
