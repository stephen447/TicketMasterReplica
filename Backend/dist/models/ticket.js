"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ticket = void 0;
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../db"));
class Ticket extends sequelize_1.Model {
}
exports.Ticket = Ticket;
Ticket.init({
    id: { type: sequelize_1.DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    type: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    eventId: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
    price: { type: sequelize_1.DataTypes.FLOAT, allowNull: false },
    status: {
        type: sequelize_1.DataTypes.ENUM("Available", "Reserved", "Sold"),
        allowNull: false,
        defaultValue: "Available",
    },
    userId: { type: sequelize_1.DataTypes.INTEGER, allowNull: true },
}, {
    sequelize: db_1.default,
    modelName: "Ticket",
    tableName: "tickets",
    timestamps: true,
});
