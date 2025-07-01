import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  host: process.env.DB_HOST,
  dialect: 'mysql',
  password: process.env.DB_PASSWORD,
  username: process.env.DB_USER,
  database: process.env.DB_NAME,
  logging: true,
  port: parseInt(process.env.DB_PORT as string, 10),
});

// Test the database connection
sequelize
  .authenticate()
  .then(() => {
    console.log(
      'Connection to the database has been established successfully.',
    );
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log('Database & tables created!');
  })
  .catch((error) => {
    console.error('Error creating database & tables:', error);
  });

export default sequelize;
