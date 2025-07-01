import express from "express";

import sequelize from "./configs/database.config";
import { globalErrorHandler } from "./middlewares/global-exception.middleware";
import morganMiddleware from "./middlewares/mogan.middleware";

require('dotenv').config()

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morganMiddleware)

app.get("/logger", (_, res) => {
  
  res.send("Hello world");
});

app.use(globalErrorHandler);


async function start() {
  try {
    await sequelize.authenticate();
    console.log('Database connected.');

    await sequelize.sync({ alter: true }); 
    console.log('Database synced.');

    app.listen(process.env.PORT, () => {
      console.log(`Server running at http://localhost:${process.env.PORT}`);
    });

  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

start();