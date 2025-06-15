require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

const allowedOrigins = process.env.CORS_ORIGINS
  ? process.env.CORS_ORIGINS.split(',')
  : [];
app.use(cors({ origin: allowedOrigins }));

// Access environment variables
const { DATABASE_URL, JWT_SECRET } = process.env;

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
