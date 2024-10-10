// /backend/controllers/adminController.js
const User = require('../models/User');
const CodeSubmission =require('../models/CodeSubmission');

// Get all users
const getAllUsers = async (req, res) => {
  const users = await User.find({});
  res.json(users);
};

// Get all code submissions
const getAllSubmissions = async (req, res) => {
  const submissions = await CodeSubmission.find({}).populate('userId', 'username');
  res.json(submissions);
};

module.exports = { getAllUsers, getAllSubmissions }; 