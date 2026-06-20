#!/bin/bash

# Initialize database for Render deployment
echo "Initializing CodeSprint 2026 database..."

# Create data directory if it doesn't exist
mkdir -p /opt/render/project/src/data

# Set database path
export DATABASE_PATH=/opt/render/project/src/data/hackathon.db

# Run database migrations
echo "Running database migrations..."
cd /opt/render/project/src/lib/db
pnpm run db:push

# Create admin user
echo "Creating admin user..."
node create-admin.mjs

echo "Database initialization complete!"
echo "Admin credentials: admin / admin123"
