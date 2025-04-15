#!/bin/bash

# Start the backend service
echo "Starting backend service..."
streamlit run app.py &

# Wait for backend to start
echo "Waiting for backend to start..."
sleep 5

# Start the frontend service
echo "Starting frontend service..."
cd frontend
npm run dev

# This script will keep running until you press Ctrl+C
# When you do, it will kill both processes
trap "trap - SIGTERM && kill -- -$$" SIGINT SIGTERM EXIT 