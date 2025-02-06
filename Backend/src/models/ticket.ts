import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import sequelize from "../db";

class Ticket extends Model<
  InferAttributes<Ticket>,
  InferCreationAttributes<Ticket>
> {
  declare id: number;
  declare type: string;
  declare eventId: number;
  declare price: number;
  declare status: "Available" | "Reserved" | "Sold";
  declare userId: number | null;
}

Ticket.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    type: { type: DataTypes.STRING, allowNull: false },
    eventId: { type: DataTypes.INTEGER, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false },
    status: {
      type: DataTypes.ENUM("Available", "Reserved", "Sold"),
      allowNull: false,
      defaultValue: "Available",
    },
    userId: { type: DataTypes.INTEGER, allowNull: true },
  },
  {
    sequelize,
    modelName: "Ticket",
    tableName: "tickets",
    timestamps: true,
  }
);

export { Ticket };
