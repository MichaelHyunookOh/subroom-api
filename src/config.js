module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DATABASE_URL:
    process.env.DATABASE_URL ||
    'postgres://idqifucxsjhhoz:a48196bde405e27835cd9d93aa4195e686591b992fca7de6ed58af0f1cf960d7@ec2-3-91-127-228.compute-1.amazonaws.com:5432/d879rgblnafdku',
  TEST_DATABASE_URL: process.env.TEST_DATABASE_URL,
  JWT_SECRET: process.env.JWT_SECRET || '8cdb63a3-0226-4382-b0cd-3dd96e09fe4c',
};
