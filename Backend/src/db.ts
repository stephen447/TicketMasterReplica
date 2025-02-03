import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config(); // Load .env variables

// Validate required environment variables
if (
  !process.env.DB_HOST ||
  !process.env.DB_NAME ||
  !process.env.DB_USERNAME ||
  !process.env.DB_PASSWORD
) {
  console.error("❌ Missing required environment variables. Check .env file.");
  process.exit(1);
}

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    logging: console.log, // Log all SQL queries
  }
);

export default sequelize;
