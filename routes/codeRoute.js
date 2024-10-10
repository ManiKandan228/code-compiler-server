const express = require('express');
const { submitCode, getUserSubmissions } = require('../controllers/codeController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/submit', protect, submitCode);
router.get('/', protect, getUserSubmissions);

module.exports = router;
