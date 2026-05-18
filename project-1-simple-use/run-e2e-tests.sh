#!/bin/bash
# E2E Test Runner for Todo App
# This script runs Playwright E2E tests against the Todo App

# Start the server in the background
node e2e-test-runner.js &
SERVER_PID=$!

# Wait for server to start
sleep 2

# Run E2E tests using Playwright
npx playwright test

# Cleanup: kill server process
kill $SERVER_PID 2>/dev/null

echo "E2E tests completed."
