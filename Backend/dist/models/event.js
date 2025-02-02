"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
const sequelize_1 = require("sequelize");
const db_js_1 = __importDefault(require("../db.js"));
const Event = db_js_1.default.define("Event", {
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    description: { type: sequelize_1.DataTypes.TEXT, allowNull: false },
    venueId: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
    time: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    city: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    region: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    date: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    tickets: { type: sequelize_1.DataTypes.JSONB, allowNull: false },
});
exports.Event = Event;
exports.default = db_js_1.default;
