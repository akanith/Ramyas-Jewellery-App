#!/usr/bin/env bash
# ============================================================
# deploy-functions.sh — Deploy all Supabase Edge Functions
# ============================================================
set -euo pipefail

FUNCTIONS_DIR="$(dirname "$0")/../supabase/functions"

echo "🚀 Deploying Supabase Edge Functions..."

for func_dir in "$FUNCTIONS_DIR"/*/; do
  func_name=$(basename "$func_dir")
  echo "  📦 Deploying: $func_name"
  supabase functions deploy "$func_name"
done

echo ""
echo "✅ All Edge Functions deployed successfully."
