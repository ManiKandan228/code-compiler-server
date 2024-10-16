const Problem = require('../models/Problem'); 
const CodeSubmission = require('../models/CodeSubmission');

const addProblem = async (req, res) => {
  console.log(req.body);
  try {
      const { title, description, difficulty, acceptance_rate, examples, sample_code } = req.body;
      if (!title || !description || !difficulty || !acceptance_rate || !examples || !sample_code) {
          return res.status(400).json({ message: 'All fields are required' });
      }
      const newProblem = new Problem({ title, description, difficulty, acceptance_rate, examples, sample_code });
      await newProblem.save();
      res.status(201).json(newProblem);
  } catch (error) {
      console.error('Error adding problem:', error);
      res.status(400).json({ message: 'Error adding problem', error: error.message });
  }
};


const getProblems = async (req, res) => {
  try {
    const problems = await Problem.find();
    res.status(200).json(problems);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching problems', error: error.message });
  }
};

const updateProblem = async (req, res) => {
  try {
    const updatedProblem = await Problem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedProblem);
  } catch (error) {
    res.status(400).json({ message: 'Error updating problem', error: error.message });
  }
};

const deleteProblem = async (req, res) => {
  try {
    await Problem.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: 'Error deleting problem', error: error.message });
  }
};

const getUserSubmissions = async (req, res) => {
  try {
    const submissions = await CodeSubmission.find();
    res.status(200).json(submissions);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching submissions', error: error.message });
  }
};

module.exports = { addProblem, getProblems, updateProblem, deleteProblem, getUserSubmissions };
