-- =============================================================================
-- @dreamplay/emailer schema for the Belgium concert Supabase project.
--
-- Composed from `dreamplay-email-2/supabase/schema.sql` (the closest canonical
-- source) plus the post-extraction additions the package and `dreamplay-email-3`
-- require but never made it into a migration file:
--   - sent_history          (per-recipient send rows; written by send-server.ts)
--   - send_logs             (durable send-log per campaign run)
--   - campaigns.email_type           ("campaign" | "automated")
--   - campaigns.total_audience_size  (recipients.length at send-time)
--   - subscriber_events.ip_address   (added 2026-05-02 in email-3)
--   - subscriber_events.user_agent   (same)
--
-- NOTE: 002_emailer_schema_fixes.sql adds further columns the package writes
-- (subscribers.city / ip_address / gdpr_consent / consent_timestamp /
-- temp_session_id / metadata, and tag_definitions.workspace + composite
-- unique). Run 002 after 001 on every fresh install.
--
-- Run in the Supabase SQL editor for this project, OR `psql -f` against the
-- pooler URL. Idempotent — safe to re-run.
-- =============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================================================
-- WORKSPACE TYPE ENUM
-- =============================================================================

DO $$ BEGIN
    CREATE TYPE workspace_type AS ENUM (
        'dreamplay_marketing',
        'dreamplay_support',
        'musicalbasics',
        'crossover',
        'concert_marketing'
    );
EXCEPTION
    WHEN duplicate_object THEN NULL;
END $$;


-- =============================================================================
-- 1. TAG DEFINITIONS
-- =============================================================================

CREATE TABLE IF NOT EXISTS tag_definitions (
    id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name        TEXT NOT NULL UNIQUE,
    color       TEXT NOT NULL DEFAULT '#6b7280',
    created_at  TIMESTAMPTZ DEFAULT NOW(),
    updated_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_tag_definitions_name ON tag_definitions(name);

ALTER TABLE tag_definitions ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
    CREATE POLICY "Allow authenticated read tag_definitions"
        ON tag_definitions FOR SELECT TO authenticated USING (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN
    CREATE POLICY "Allow authenticated insert tag_definitions"
        ON tag_definitions FOR INSERT TO authenticated WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN
    CREATE POLICY "Allow authenticated update tag_definitions"
        ON tag_definitions FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN
    CREATE POLICY "Allow authenticated delete tag_definitions"
        ON tag_definitions FOR DELETE TO authenticated USING (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;


-- =============================================================================
-- 2. SUBSCRIBERS
-- =============================================================================

CREATE TABLE IF NOT EXISTS subscribers (
    id                  UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email               TEXT NOT NULL,
    first_name          TEXT DEFAULT '',
    last_name           TEXT DEFAULT '',

    status              TEXT DEFAULT 'active'
                            CHECK (status IN ('active', 'unsubscribed', 'bounced', 'deleted')),

    tags                TEXT[] DEFAULT '{}',
    smart_tags          JSONB DEFAULT '{}',

    country             TEXT DEFAULT '',
    country_code        TEXT DEFAULT '',
    phone_code          TEXT DEFAULT '',
    phone_number        TEXT DEFAULT '',

    shipping_address1   TEXT DEFAULT '',
    shipping_address2   TEXT DEFAULT '',
    shipping_city       TEXT DEFAULT '',
    shipping_zip        TEXT DEFAULT '',
    shipping_province   TEXT DEFAULT '',

    workspace           TEXT DEFAULT 'dreamplay_marketing',

    shopify_customer_id TEXT,
    klaviyo_profile_id  TEXT,

    created_at          TIMESTAMPTZ DEFAULT NOW(),
    updated_at          TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS subscribers_email_idx       ON subscribers(email);
CREATE INDEX IF NOT EXISTS subscribers_workspace_idx   ON subscribers(workspace);
CREATE INDEX IF NOT EXISTS subscribers_status_idx      ON subscribers(status);

DO $$ BEGIN
    ALTER TABLE subscribers ADD CONSTRAINT subscribers_email_workspace_unique
        UNIQUE (email, workspace);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;


-- =============================================================================
-- 3. SUBSCRIBER EVENTS  (open/click/bounce/complaint/unsubscribe)
-- =============================================================================

CREATE TABLE IF NOT EXISTS subscriber_events (
    id              UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    subscriber_id   UUID REFERENCES subscribers(id) ON DELETE CASCADE,
    campaign_id     UUID,
    event_type      TEXT NOT NULL,
    metadata        JSONB DEFAULT '{}',
    occurred_at     TIMESTAMPTZ DEFAULT NOW(),
    -- Added 2026-05-02 for bot/scanner filtering at read time:
    ip_address      TEXT,
    user_agent      TEXT
);

CREATE INDEX IF NOT EXISTS subscriber_events_subscriber_idx ON subscriber_events(subscriber_id);
CREATE INDEX IF NOT EXISTS subscriber_events_campaign_idx   ON subscriber_events(campaign_id);
CREATE INDEX IF NOT EXISTS subscriber_events_type_idx       ON subscriber_events(event_type);


-- =============================================================================
-- 4. APP SETTINGS
-- =============================================================================

CREATE TABLE IF NOT EXISTS app_settings (
    id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    workspace   TEXT NOT NULL DEFAULT 'dreamplay_marketing',
    key         TEXT NOT NULL,
    value       JSONB NOT NULL DEFAULT '{}',
    created_at  TIMESTAMPTZ DEFAULT NOW(),
    updated_at  TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (workspace, key)
);

CREATE INDEX IF NOT EXISTS app_settings_workspace_key_idx ON app_settings(workspace, key);


-- =============================================================================
-- 5. TEMPLATE FOLDERS
-- =============================================================================

CREATE TABLE IF NOT EXISTS template_folders (
    id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name        TEXT NOT NULL,
    sort_order  INT DEFAULT 0,
    created_at  TIMESTAMPTZ DEFAULT NOW(),
    updated_at  TIMESTAMPTZ DEFAULT NOW()
);


-- =============================================================================
-- 6. ROTATIONS
-- =============================================================================

CREATE TABLE IF NOT EXISTS rotations (
    id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name            TEXT NOT NULL,
    campaign_ids    UUID[] NOT NULL,
    cursor_position INTEGER DEFAULT 0,
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW()
);


-- =============================================================================
-- 7. CHAIN ROTATIONS  (defined before campaigns so the FK resolves cleanly)
-- =============================================================================

CREATE TABLE IF NOT EXISTS chain_rotations (
    id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name            TEXT NOT NULL,
    chain_ids       UUID[] NOT NULL,
    cursor_position INTEGER DEFAULT 0,
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW()
);


-- =============================================================================
-- 8. CAMPAIGNS
-- =============================================================================

CREATE TABLE IF NOT EXISTS campaigns (
    id                  UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name                TEXT NOT NULL,
    subject_line        TEXT,
    preview_text        TEXT,
    html_content        TEXT,
    variable_values     JSONB DEFAULT '{}',

    status              TEXT CHECK (status IN ('draft', 'scheduled', 'sending', 'completed', 'deleted'))
                            DEFAULT 'draft',

    is_template         BOOLEAN DEFAULT FALSE,
    is_ready            BOOLEAN DEFAULT FALSE,
    is_starred_template BOOLEAN DEFAULT FALSE,

    -- "campaign" | "automated" — required by send-server's child-campaign clone
    email_type          TEXT DEFAULT 'campaign',

    category            TEXT DEFAULT NULL,
    template_folder_id  UUID REFERENCES template_folders(id) ON DELETE SET NULL,

    rotation_id         UUID REFERENCES rotations(id) DEFAULT NULL,
    chain_rotation_id   UUID REFERENCES chain_rotations(id) DEFAULT NULL,

    parent_template_id  UUID DEFAULT NULL,

    -- Aggregates updated post-send by send-server.ts:
    total_recipients    INTEGER DEFAULT 0,
    total_audience_size INTEGER DEFAULT 0,
    total_opens         INTEGER DEFAULT 0,
    total_clicks        INTEGER DEFAULT 0,
    total_conversions   INTEGER DEFAULT 0,
    average_read_time   NUMERIC DEFAULT 0,
    revenue_attributed  NUMERIC DEFAULT 0,

    attribution_window_days  INTEGER DEFAULT 7,
    conversion_event         TEXT DEFAULT NULL,

    from_name           TEXT,
    from_email          TEXT,
    sent_from_email     TEXT,
    sent_to_emails      TEXT[] DEFAULT '{}',
    resend_email_id     TEXT,

    scheduled_at        TIMESTAMPTZ DEFAULT NULL,
    scheduled_status    TEXT DEFAULT NULL,
    sent_at             TIMESTAMPTZ DEFAULT NULL,

    workspace           TEXT DEFAULT 'dreamplay_marketing',

    created_at          TIMESTAMPTZ DEFAULT NOW(),
    updated_at          TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS campaigns_sent_at_idx        ON campaigns(sent_at DESC);
CREATE INDEX IF NOT EXISTS campaigns_workspace_idx      ON campaigns(workspace);
CREATE INDEX IF NOT EXISTS campaigns_status_idx         ON campaigns(status);
CREATE INDEX IF NOT EXISTS campaigns_is_template_idx    ON campaigns(is_template) WHERE is_template = TRUE;


-- =============================================================================
-- 9. CAMPAIGN VERSIONS
-- =============================================================================

CREATE TABLE IF NOT EXISTS campaign_versions (
    id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE,
    html_content TEXT,
    version_num  INTEGER DEFAULT 1,
    snapshot_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS campaign_versions_campaign_idx ON campaign_versions(campaign_id);


-- =============================================================================
-- 10. MEDIA ASSETS
-- =============================================================================

CREATE TABLE IF NOT EXISTS media_assets (
    id           UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    filename     TEXT NOT NULL,
    folder_path  TEXT DEFAULT '',
    storage_hash TEXT NOT NULL,
    public_url   TEXT NOT NULL,
    size         INTEGER,
    is_deleted   BOOLEAN DEFAULT FALSE,
    created_at   TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_media_assets_folder ON media_assets(folder_path) WHERE is_deleted = FALSE;
CREATE INDEX IF NOT EXISTS idx_media_assets_hash   ON media_assets(storage_hash);

ALTER TABLE media_assets ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
    CREATE POLICY "Allow authenticated select media_assets"
        ON media_assets FOR SELECT TO authenticated USING (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN
    CREATE POLICY "Allow authenticated insert media_assets"
        ON media_assets FOR INSERT TO authenticated WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN
    CREATE POLICY "Allow authenticated update media_assets"
        ON media_assets FOR UPDATE TO authenticated USING (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN
    CREATE POLICY "Allow authenticated delete media_assets"
        ON media_assets FOR DELETE TO authenticated USING (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;


-- =============================================================================
-- 11. DISCOUNT PRESETS
-- =============================================================================

CREATE TABLE IF NOT EXISTS discount_presets (
    id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name            TEXT NOT NULL,
    type            TEXT NOT NULL DEFAULT 'percentage',
    value           NUMERIC NOT NULL DEFAULT 5,
    duration_days   INT NOT NULL DEFAULT 2,
    code_prefix     TEXT NOT NULL DEFAULT 'VIP',
    target_url_key  TEXT NOT NULL DEFAULT 'main_cta_url',
    usage_limit     INT NOT NULL DEFAULT 1,
    is_active       BOOLEAN NOT NULL DEFAULT TRUE,
    code_mode       TEXT NOT NULL DEFAULT 'all_users',
    expiry_mode     TEXT NOT NULL DEFAULT 'duration',
    expires_on      DATE,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);


-- =============================================================================
-- 12. EMAIL CHAINS
-- =============================================================================

CREATE TABLE IF NOT EXISTS email_chains (
    id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name            TEXT NOT NULL,
    workspace       TEXT DEFAULT 'dreamplay_marketing',
    steps           JSONB DEFAULT '[]',
    branches        JSONB DEFAULT '[]',
    subscriber_id   UUID REFERENCES subscribers(id) ON DELETE SET NULL,
    is_snapshot     BOOLEAN DEFAULT FALSE,
    status          TEXT DEFAULT 'draft',
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS email_chains_workspace_idx     ON email_chains(workspace);
CREATE INDEX IF NOT EXISTS email_chains_subscriber_idx    ON email_chains(subscriber_id) WHERE subscriber_id IS NOT NULL;


-- =============================================================================
-- 13. CHAIN PROCESSES
-- =============================================================================

CREATE TABLE IF NOT EXISTS chain_processes (
    id                  UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    chain_id            UUID REFERENCES email_chains(id) ON DELETE CASCADE,
    subscriber_id       UUID REFERENCES subscribers(id) ON DELETE CASCADE,
    status              TEXT DEFAULT 'active'
                            CHECK (status IN ('active', 'paused', 'cancelled', 'completed')),
    current_step_index  INTEGER DEFAULT 0,
    next_step_at        TIMESTAMPTZ,
    history             JSONB DEFAULT '[]',
    inngest_event_id    TEXT,
    chain_rotation_id   UUID REFERENCES chain_rotations(id),
    original_chain_id   UUID REFERENCES email_chains(id) ON DELETE SET NULL,
    created_at          TIMESTAMPTZ DEFAULT NOW(),
    updated_at          TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS chain_processes_chain_idx       ON chain_processes(chain_id);
CREATE INDEX IF NOT EXISTS chain_processes_subscriber_idx  ON chain_processes(subscriber_id);
CREATE INDEX IF NOT EXISTS chain_processes_status_idx      ON chain_processes(status);


-- =============================================================================
-- 14. TRIGGER LOGS
-- =============================================================================

CREATE TABLE IF NOT EXISTS trigger_logs (
    id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    trigger_type    TEXT NOT NULL,
    subscriber_id   UUID REFERENCES subscribers(id) ON DELETE SET NULL,
    chain_id        UUID REFERENCES email_chains(id) ON DELETE SET NULL,
    payload         JSONB DEFAULT '{}',
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS trigger_logs_subscriber_idx ON trigger_logs(subscriber_id);
CREATE INDEX IF NOT EXISTS trigger_logs_type_idx       ON trigger_logs(trigger_type);


-- =============================================================================
-- 15. SENT HISTORY  (per-recipient send rows, written by send-server.ts)
-- =============================================================================

CREATE TABLE IF NOT EXISTS sent_history (
    id             UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    campaign_id    UUID REFERENCES campaigns(id) ON DELETE CASCADE,
    subscriber_id  UUID REFERENCES subscribers(id) ON DELETE SET NULL,
    sent_at        TIMESTAMPTZ DEFAULT NOW(),
    variant_sent   TEXT,
    merge_tag_log  JSONB DEFAULT '{}',
    created_at     TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS sent_history_campaign_idx   ON sent_history(campaign_id);
CREATE INDEX IF NOT EXISTS sent_history_subscriber_idx ON sent_history(subscriber_id);
CREATE INDEX IF NOT EXISTS sent_history_sent_at_idx    ON sent_history(sent_at DESC);


-- =============================================================================
-- 16. SEND LOGS  (durable per-run send log, written by send-server.ts)
-- =============================================================================

CREATE TABLE IF NOT EXISTS send_logs (
    id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    campaign_id   UUID REFERENCES campaigns(id) ON DELETE CASCADE,
    triggered_by  TEXT,
    status        TEXT NOT NULL DEFAULT 'pending'
                      CHECK (status IN ('pending', 'success', 'error')),
    summary       JSONB,
    raw_log       TEXT,
    image_logs    JSONB,
    created_at    TIMESTAMPTZ DEFAULT NOW(),
    updated_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS send_logs_campaign_idx ON send_logs(campaign_id);
CREATE INDEX IF NOT EXISTS send_logs_status_idx   ON send_logs(status);


-- =============================================================================
-- 17. LATE FK: subscriber_events → campaigns
-- =============================================================================

DO $$ BEGIN
    ALTER TABLE subscriber_events
        ADD CONSTRAINT subscriber_events_campaign_id_fkey
        FOREIGN KEY (campaign_id) REFERENCES campaigns(id) ON DELETE SET NULL;
EXCEPTION WHEN duplicate_object THEN NULL; END $$;


-- =============================================================================
-- STORAGE BUCKETS (must be created via the Supabase Dashboard if needed):
--   - email-assets   (public)   -- only required if uploading images to media_assets
--   - sent-emails    (private)
-- The package itself does not strictly require these for send/track/subscribe
-- to work — only for the optional media-assets upload UI.
-- =============================================================================

-- Sanity check after running:
-- select table_name from information_schema.tables
-- where table_schema = 'public'
--   and table_name in (
--     'tag_definitions','subscribers','subscriber_events','app_settings',
--     'template_folders','rotations','chain_rotations','campaigns',
--     'campaign_versions','media_assets','discount_presets','email_chains',
--     'chain_processes','trigger_logs','sent_history','send_logs')
-- order by table_name;
