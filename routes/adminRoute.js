// /backend/routes/adminRoutes.js
const express = require('express');
const { getAllUsers, getAllSubmissions } = require('../controllers/adminController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/users', protect, admin, getAllUsers);
router.get('/submissions', protect, admin, getAllSubmissions);

module.exports = router;
