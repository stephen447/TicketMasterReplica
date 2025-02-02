import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../db.js";

const Event = sequelize.define("Event", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  venueId: { type: DataTypes.INTEGER, allowNull: false },
  time: { type: DataTypes.STRING, allowNull: false },
  city: { type: DataTypes.STRING, allowNull: false },
  region: { type: DataTypes.STRING, allowNull: false },
  date: { type: DataTypes.STRING, allowNull: false },
  tickets: { type: DataTypes.JSONB, allowNull: false },
});

export default sequelize;
export { Event };
