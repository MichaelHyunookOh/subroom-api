module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DATABASE_URL:
    process.env.DATABASE_URL ||
    'postgres://muzrktxcgpmhbw:21a6805f206eb52c4f2941af58b3163efcb6ab66a5da33c50b6586ce542c9941@ec2-54-159-175-113.compute-1.amazonaws.com:5432/dfjg9v491j1uhd',
  TEST_DATABASE_URL: process.env.TEST_DATABASE_URL,
  JWT_SECRET: process.env.JWT_SECRET || '8cdb63a3-0226-4382-b0cd-3dd96e09fe4c',
};
