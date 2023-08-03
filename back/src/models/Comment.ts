import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";
import News from "./News";
import User from "./User";

class Comment extends Model {
  declare id: number;
  declare content: string;
}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: "comments",
    sequelize,
  }
);

export default Comment;
