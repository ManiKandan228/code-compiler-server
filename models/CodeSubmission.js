// /backend/models/CodeSubmission.js
const mongoose = require('mongoose');

const codeSubmissionSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  code: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  result: {
    type: String,
  },
}, {
  timestamps: true,
});

const CodeSubmission = mongoose.model('CodeSubmission', codeSubmissionSchema);
module.exports = CodeSubmission; 
