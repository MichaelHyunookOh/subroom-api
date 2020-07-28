TRUNCATE subscription RESTART IDENTITY CASCADE;

INSERT INTO subscription
    (subscription_name, subscription_price, category, payment_date)
VALUES 
    ('netflix', 5.99, 'Automatic', '2020-07-31'),
    ('amazon prime', 6.99, 'Manual', '2020-07-30'),
    ('hulu', 10.99, 'Automatic', '2020-07-29')