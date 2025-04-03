import "dotenv/config";

export default {
  schema: "./utils/schema.jsx", 
  out: "./drizzle",
  dialect: "postgresql", 
  dbCredentials: {
    url:"postgresql://neondb_owner:npg_M0ch6zSfVUej@ep-crimson-hall-a1rlvcnb-pooler.ap-southeast-1.aws.neon.tech/fintrack?sslmode=require",
    connectionString: "postgresql://neondb_owner:npg_M0ch6zSfVUej@ep-crimson-hall-a1rlvcnb-pooler.ap-southeast-1.aws.neon.tech/fintrack?sslmode=require", 
  },
};
