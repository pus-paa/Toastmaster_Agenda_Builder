require('dotenv').config({ path: '.env' });

module.exports = {
  schema: './src/prisma/schema.prisma',
  datasource: {
    url: process.env.DATABASE_URL,
  },
};
