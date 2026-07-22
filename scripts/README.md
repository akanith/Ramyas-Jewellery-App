# Scripts Directory

This directory contains utility scripts for development, CI/CD, and maintenance tasks.

## Planned Scripts

| Script | Purpose |
|---|---|
| `setup.sh` | One-command dev environment setup |
| `check-env.sh` | Verify all required environment variables are set |
| `db-reset.sh` | Reset local Supabase DB with migrations + seed |
| `deploy-functions.sh` | Deploy all Supabase Edge Functions |
| `generate-types.sh` | Generate TypeScript types from Supabase schema |
| `backup-db.sh` | Create a manual database backup |

## Usage

```bash
# Verify environment setup
bash scripts/check-env.sh

# Reset local database
bash scripts/db-reset.sh

# Deploy all edge functions
bash scripts/deploy-functions.sh
```
