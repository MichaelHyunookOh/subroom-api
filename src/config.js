module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DATABASE_URL: process.env.DATABASE_URL || 'postgres://cowpkyawklzqmv:2567010323e7fa26aa9e14bc580a059d5c7a217aa13b652db2fd4f3198368c72@ec2-52-22-216-69.compute-1.amazonaws.com:5432/d6or5lo3gikbkc',
  TEST_DATABASE_URL: process.env.TEST_DATABASE_URL,
  JWT_SECRET: process.env.JWT_SECRET || '8cdb63a3-0226-4382-b0cd-3dd96e09fe4c'
}