#!/bin/bash

# E2E Test Runner Script for Todo App
# Run the Playwright E2E tests

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

cd "$PROJECT_DIR"

echo "Running E2E tests..."
node tasks/e2e-test-runner.js

if [ $? -eq 0 ]; then
  echo "All E2E tests passed!"
  exit 0
else
  echo "Some E2E tests failed!"
  exit 1
fi
