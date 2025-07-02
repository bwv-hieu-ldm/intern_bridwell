import express from "express";
import dotenv from 'dotenv'
dotenv.config();
import "reflect-metadata";
import sequelize from "./configs/database.config";
import { globalErrorHandler } from "./middlewares/global-exception.middleware";
import morganMiddleware from "./middlewares/mogan.middleware";
import routers from "./controllers";
import yup from "yup"

import './models'; 
import session from "express-session";
import passport from "./configs/passport.config";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morganMiddleware)

app.get("/logger", (_, res) => {
  res.send("Hello world");
});

app.use(passport.initialize());

app.use('/api',routers);
app.use(globalErrorHandler);

async function start() {
  try {
    await sequelize.authenticate();
    console.log('Database connected.');

    await sequelize.sync({force: false}); 
    console.log('Database synced.');

    app.listen(process.env.PORT, () => {
      console.log(`Server running at http://localhost:${process.env.PORT}`);
    });

  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

start();