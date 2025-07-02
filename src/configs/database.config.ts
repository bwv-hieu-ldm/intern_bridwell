import { Sequelize } from 'sequelize';
const sequelize = new Sequelize({
  host: process.env.DB_HOST ,
  dialect: 'mysql',
  password: "123",
  username: process.env.DB_USER,
  database: "intern_briswell_database",
  logging: true,
  port: 3306,
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
