import { Sequelize } from "sequelize";

if (
  !process.env.DB_HOST ||
  !process.env.DB_NAME ||
  !process.env.DB_USERNAME ||
  !process.env.DB_PASSWORD
) {
  console.error("Please set environment variables correctly.");
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
    logging: false,
  }
);

export default sequelize; // Ensure you are exporting correctly
