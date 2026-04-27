const app = require('./app');
const { initDB } = require('./db');

const PORT = process.env.PORT || 3000;

const start = async () => {
  await initDB();       // Step 1: create tables if not exist
  app.listen(PORT, () => {  // Step 2: start the server
    console.log(`Notes API running on port ${PORT}`);
  });
};

start();
