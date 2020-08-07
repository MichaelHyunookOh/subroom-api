module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DATABASE_URL: process.env.DATABASE_URL || 'postgres://wkndthntwgbqpx:41ae0ced5d240d704dc8044ad051de9295680bc60f8c903731e2838531d82edf@ec2-18-211-48-247.compute-1.amazonaws.com:5432/dpupdpbos1p3c',
  TEST_DATABASE_URL: process.env.TEST_DATABASE_URL,
  JWT_SECRET: process.env.JWT_SECRET,
}