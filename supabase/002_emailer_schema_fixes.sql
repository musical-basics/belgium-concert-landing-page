-- =============================================================================
-- Delta migration: columns the @dreamplay/emailer package writes/reads but
-- the email-2 base schema (001) doesn't include.
--
-- Run after 001_emailer_schema.sql. Idempotent — safe to re-run.
-- =============================================================================

-- subscribers: package's createEmailSubscribeHandler writes these columns
ALTER TABLE subscribers
  ADD COLUMN IF NOT EXISTS city              TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS ip_address        TEXT,
  ADD COLUMN IF NOT EXISTS gdpr_consent      BOOLEAN,
  ADD COLUMN IF NOT EXISTS consent_timestamp TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS temp_session_id   TEXT,
  ADD COLUMN IF NOT EXISTS metadata          JSONB DEFAULT '{}'::jsonb;

-- tag_definitions: package scopes tags per workspace and upserts on (name, workspace)
ALTER TABLE tag_definitions
  ADD COLUMN IF NOT EXISTS workspace TEXT NOT NULL DEFAULT 'dreamplay_marketing';

-- The default-constrained unique on `name` was global; the package wants per-workspace.
ALTER TABLE tag_definitions DROP CONSTRAINT IF EXISTS tag_definitions_name_key;

DO $$ BEGIN
  ALTER TABLE tag_definitions
    ADD CONSTRAINT tag_definitions_name_workspace_unique UNIQUE (name, workspace);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

CREATE INDEX IF NOT EXISTS tag_definitions_workspace_idx ON tag_definitions(workspace);
