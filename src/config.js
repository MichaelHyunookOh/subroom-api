module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DATABASE_URL:
    process.env.DATABASE_URL ||
    'postgres://zoxkclcc:Gta32eD-JVHl-Omj49FHEi1mo-rRye-z@kashin.db.elephantsql.com:5432/zoxkclcc',
  TEST_DATABASE_URL: process.env.TEST_DATABASE_URL,
  JWT_SECRET: process.env.JWT_SECRET || '8cdb63a3-0226-4382-b0cd-3dd96e09fe4c',
};
