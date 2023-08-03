import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";
import News from "./News";
import Comment from "./Comment";

class User extends Model {
  declare id: number;
  declare name: string;
  declare lastName: string;
  declare email: string;
  declare password: string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "user",
    sequelize,
  }
);

User.hasMany(News, { foreignKey: "userId", sourceKey: "id" });
News.belongsTo(User, { foreignKey: "userId", targetKey: "id" });
User.hasMany(Comment, { foreignKey: "userId", sourceKey: "id" });
Comment.belongsTo(User, { foreignKey: "userId", targetKey: "id" });

export default User;
