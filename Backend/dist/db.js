"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
if (!process.env.DB_HOST ||
    !process.env.DB_NAME ||
    !process.env.DB_USERNAME ||
    !process.env.DB_PASSWORD) {
    console.error("Please set environment variables correctly.");
    process.exit(1);
}
const sequelize = new sequelize_1.Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: "postgres",
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
    logging: false,
});
exports.default = sequelize; // Ensure you are exporting correctly
