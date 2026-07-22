#!/usr/bin/env bash
# ============================================================
# check-env.sh — Verify required environment variables
# ============================================================
set -euo pipefail

REQUIRED_VARS=(
  "NEXT_PUBLIC_SUPABASE_URL"
  "NEXT_PUBLIC_SUPABASE_ANON_KEY"
  "SUPABASE_SERVICE_ROLE_KEY"
  "NEXT_PUBLIC_FIREBASE_API_KEY"
  "NEXT_PUBLIC_FIREBASE_PROJECT_ID"
  "FCM_SERVER_KEY"
)

echo "🔍 Checking required environment variables..."
MISSING=0

for var in "${REQUIRED_VARS[@]}"; do
  if [ -z "${!var:-}" ]; then
    echo "  ❌ Missing: $var"
    MISSING=$((MISSING + 1))
  else
    echo "  ✅ Found:   $var"
  fi
done

if [ "$MISSING" -gt 0 ]; then
  echo ""
  echo "⚠️  $MISSING environment variable(s) are missing."
  echo "   Copy apps/admin-dashboard/.env.example to .env.local and fill in values."
  exit 1
else
  echo ""
  echo "✅ All environment variables are set."
fi
