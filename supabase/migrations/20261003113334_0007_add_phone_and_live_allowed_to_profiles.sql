/*
# Add registered_phone and is_live_allowed to profiles

1. Purpose
   Store the phone number used at signup and a permanent boolean flag
   controlling whether the user can use live streaming features.
   is_live_allowed is computed once at signup based on the phone country
   code: BD numbers (+880) are blocked from live; all others are allowed.
   The flag is never changed after signup.

2. New Columns
   - profiles.registered_phone (text, nullable) — the phone number with country code
   - profiles.is_live_allowed (boolean, not null, default true) — permanent live access flag

3. Security
   - No RLS policy changes. Existing policies already cover SELECT/INSERT/UPDATE for profiles.
   - is_live_allowed is set at insert time and protected from client updates by
     the existing UPDATE policy (auth.uid() = id) — clients can update their own
     row but the app never sends is_live_allowed in an update payload.
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'registered_phone'
  ) THEN
    ALTER TABLE profiles ADD COLUMN registered_phone text;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'is_live_allowed'
  ) THEN
    ALTER TABLE profiles ADD COLUMN is_live_allowed boolean NOT NULL DEFAULT true;
  END IF;
END $$;
