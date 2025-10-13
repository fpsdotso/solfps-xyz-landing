#!/bin/bash

# Helper script to extract environment variables from Google Service Account JSON file
# Usage: ./extract-credentials.sh path/to/your-service-account-key.json

if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <path-to-json-key-file>"
    echo "Example: $0 ~/Downloads/service-account-key.json"
    exit 1
fi

JSON_FILE=$1

if [ ! -f "$JSON_FILE" ]; then
    echo "Error: File '$JSON_FILE' not found!"
    exit 1
fi

echo "================================================"
echo "Google Sheets Environment Variables"
echo "================================================"
echo ""
echo "Copy these to your .env.local file:"
echo ""

# Check if jq is installed
if command -v jq &> /dev/null; then
    echo "GOOGLE_PROJECT_ID=$(jq -r '.project_id' "$JSON_FILE")"
    echo "GOOGLE_PRIVATE_KEY_ID=$(jq -r '.private_key_id' "$JSON_FILE")"
    echo "GOOGLE_PRIVATE_KEY=\"$(jq -r '.private_key' "$JSON_FILE")\""
    echo "GOOGLE_CLIENT_EMAIL=$(jq -r '.client_email' "$JSON_FILE")"
    echo "GOOGLE_CLIENT_ID=$(jq -r '.client_id' "$JSON_FILE")"
else
    echo "⚠️  jq is not installed. Install it with: brew install jq (macOS) or apt-get install jq (Linux)"
    echo ""
    echo "Alternatively, manually copy these values from your JSON file:"
    echo ""
    echo "GOOGLE_PROJECT_ID=<project_id from JSON>"
    echo "GOOGLE_PRIVATE_KEY_ID=<private_key_id from JSON>"
    echo "GOOGLE_PRIVATE_KEY=<private_key from JSON (keep \\n characters)>"
    echo "GOOGLE_CLIENT_EMAIL=<client_email from JSON>"
    echo "GOOGLE_CLIENT_ID=<client_id from JSON>"
fi

echo ""
echo "================================================"
echo "Don't forget to also add:"
echo "GOOGLE_SHEET_ID=<your-sheet-id>"
echo "SHEET_NAME=Waitlist"
echo "================================================"
