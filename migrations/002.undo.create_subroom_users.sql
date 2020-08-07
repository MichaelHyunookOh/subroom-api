ALTER TABLE subscription
    DROP COLUMN IF EXISTS user_id;

DROP TABLE IF EXISTS subroom_users;