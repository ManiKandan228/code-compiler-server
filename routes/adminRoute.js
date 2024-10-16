const express = require('express');
const {
    addProblem,
    getProblems,
    updateProblem,
    deleteProblem,
    getUserSubmissions
    } = require('../controllers/adminController');
const { protect,isAdmin } = require('../middleware/authMiddleware');

const router = express.Router();
// router.use(protect);
// router.use(isAdmin);

router.post('/problems',addProblem);
router.get('/problems', getProblems);
router.put('/problems/:id', isAdmin, updateProblem);
router.delete('/problems/:id', isAdmin, deleteProblem);
router.get('/submissions', isAdmin, getUserSubmissions);


module.exports = router;
