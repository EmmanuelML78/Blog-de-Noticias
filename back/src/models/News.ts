import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";
import User from "./User";
import Comment from "./Comment";

class News extends Model {
  declare id: number;
  declare title: string;
  declare content: string;
  declare image: string;
}

News.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "news",
    sequelize,
  }
);

News.hasMany(Comment, { foreignKey: "newsId", sourceKey: "id" });
Comment.belongsTo(News, { foreignKey: "newsId", targetKey: "id" });

export default News;
