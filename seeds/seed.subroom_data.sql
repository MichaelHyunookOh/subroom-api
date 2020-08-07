BEGIN;

TRUNCATE 
  subscription,
  subroom_users
  RESTART IDENTITY CASCADE;

INSERT INTO subroom_users
    (user_name, password)
VALUES
    ('michaeloh', '$2a$12$dbiMeAJsH5F2m4MugRxU/OD9Oo7vFVhBMKYoh1sGdapMt2xWNBmF2'),
    ('miloh', '$2a$12$X2nswNhvY4UCgWHqZ4ijquN.QNT8EdZKBefo2BkygNHrzxAh6LuAO'),
    ('mike', '$2a$12$KlaqMB.9whboT5EA1tCpEesxEgn.ldxORi12szK2gfI069XL3E432');

INSERT INTO subscription
    (subscription_name, subscription_price, user_id,  category, subscription_user_name, subscription_password)
VALUES 
    ('netflix', 5.99, 1, 'Automatic', 'bigtree', 'waterme'),
    ('amazon prime', 6.99, 1, 'Manual', 'chicken', 'donteatme'),
    ('hulu', 10.99, 2, 'Automatic', 'flower', 'dontsteponme');   

COMMIT;