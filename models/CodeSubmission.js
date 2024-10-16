const mongoose = require('mongoose');

const CodeSubmissionSchema = new mongoose.Schema(
  {
    
    userId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    code: { 
      type: String, 
      required: true 
    },
    result: { 
      type: String 
    },
    createdAt: { 
      type: Date, 
      default: Date.now 
    }
  }
);

module.exports = mongoose.model('CodeSubmission', CodeSubmissionSchema);
