import "dotenv/config";

export default {
  schema: "./utils/schema.jsx", 
  out: "./drizzle",
  dialect: "postgresql", 
  dbCredentials: {
    url:"postgresql://neondb_owner:npg_vqig8c4mnOAI@ep-long-cloud-a7d50w8w-pooler.ap-southeast-2.aws.neon.tech/neondb?sslmode=require", 
    connectionString: "postgresql://neondb_owner:npg_vqig8c4mnOAI@ep-long-cloud-a7d50w8w-pooler.ap-southeast-2.aws.neon.tech/neondb?sslmode=require"
  },
};
