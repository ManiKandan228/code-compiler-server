const mongoose = require('mongoose');

const exampleSchema = new mongoose.Schema({
  input: { type: [mongoose.Schema.Types.Mixed], required: true },
  output: { type: [mongoose.Schema.Types.Mixed], required: true },
});

const problemSchema = new mongoose.Schema(
  {
    title: { 
      type: String, 
      required: true 
    },
    difficulty: { 
      type: String, 
      required: true 
    },
    acceptance_rate: { 
      type: String, 
      required: true 
    },
    description: { 
      type: String, 
      required: true 
    },
    examples: [exampleSchema],
    sample_code: { 
      type: String, 
      required: true 
    },
});

const Problem = mongoose.model('Problem', problemSchema);
module.exports = Problem;
