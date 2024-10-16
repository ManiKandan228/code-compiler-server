require('dotenv').config();
const express = require('express');
const session = require('express-session');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoute');
const adminRoutes = require('./routes/adminRoute');

const cors = require('cors');
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET || 'defaultsecret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }, 
}));

app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
