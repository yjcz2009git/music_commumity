@echo off
echo Starting backend service...
start cmd /k "streamlit run app.py"

echo Waiting for backend to start...
timeout /t 5 /nobreak

echo Starting frontend service...
cd frontend
start cmd /k "npm run dev"

echo Services started. Press Ctrl+C in each window to stop. 