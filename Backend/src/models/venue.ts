import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import sequelize from "../db";

class Venue extends Model<
  InferAttributes<Venue>,
  InferCreationAttributes<Venue>
> {
  declare id: number;
  declare name: string;
  declare city: string;
  declare capacity: number;
  declare venueType: string;
  declare tickets: {
    name: string;
    price: number;
    total: number;
  }[];
}

Venue.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    city: { type: DataTypes.STRING, allowNull: false },
    capacity: { type: DataTypes.INTEGER, allowNull: false },
    venueType: { type: DataTypes.STRING, allowNull: false },
    tickets: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: [],
    },
  },
  {
    sequelize,
    modelName: "Venue",
    tableName: "venues",
    timestamps: true,
  }
);

export { Venue };
