import dotenv from "dotenv";
import { sequelize } from "./config/db";
import app from "./config/express";

dotenv.config();

console.log(process.env.SECRET_KEY);

const port = process.env.PORT || 3001;

sequelize
  .sync({ force: false })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server listening at ${port}`);
    });
  })
  .catch((error) => {
    console.error("Error while syncing the database:", error);
  });
