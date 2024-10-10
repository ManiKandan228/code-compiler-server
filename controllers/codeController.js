const axios = require('axios');
const CodeSubmission = require('../models/CodeSubmission');

const CLIENT_ID = 'b350f3f49624ef66b964878ee3cc966e';
const CLIENT_SECRET = 'a6a6e4c9317a2746675ac01b8deb4514eec944a85a08978139c67b7b233c9621';
const JDoodle_API_URL = 'https://api.jdoodle.com/v1/execute';

const submitCode = async (req, res) => {
  const { code, language } = req.body;

  const codeSubmission = await CodeSubmission.create({
    userId: req.user._id,
    code,
    language,
  });

  let languageMapping = {
    javascript: 'nodejs',
    python: 'python3',
    c: 'c',
    cpp: 'cpp14', 
    java: 'java',
  };

  // Check if the language supported or not
  const jdoodleLanguage = languageMapping[language.toLowerCase()];
  if (!jdoodleLanguage) {
    return res.status(400).json({ message: 'Unsupported language' });
  }

  const payload = {
    script: code,
    language: jdoodleLanguage,
    versionIndex: '0', // Set to default version
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
  };

  try {
    // Execute code using JDoodle API
    const response = await axios.post(JDoodle_API_URL, payload);
    
    // Save the result to the database
    codeSubmission.result = response.data.output;
    await codeSubmission.save();

    res.status(201).json({
      message: 'Code executed successfully',
      result: codeSubmission.result,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Code execution failed',
      error: error.message,
    });
  }
};

const getUserSubmissions = async (req, res) => {
  const submissions = await CodeSubmission.find({ userId: req.user._id });
  res.json(submissions);
};

module.exports = { submitCode, getUserSubmissions };
