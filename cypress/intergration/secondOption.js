const express = require('express');
const { exec } = require('child_process');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/cypressResults', { useNewUrlParser: true, useUnifiedTopology: true });

const resultSchema = new mongoose.Schema({
  testName: String,
  status: String,
  duration: Number,
  // Add other fields as needed
});

const Result = mongoose.model('Result', resultSchema);

app.post('/run-tests', (req, res) => {
  exec('npx cypress run', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return res.status(500).send('Error running tests');
    }
    if (stderr) {
      console.error(`Stderr: ${stderr}`);
      return res.status(500).send('Error running tests');
    }

    // Parse the stdout to extract test results
    const results = parseTestResults(stdout);

    // Save results to MongoDB
    Result.insertMany(results, (err, docs) => {
      if (err) {
        console.error(`Error saving results: ${err}`);
        return res.status(500).send('Error saving results');
      }
      res.status(200).send('Tests run successfully and results saved');
    });
  });
});

function parseTestResults(stdout) {
  // Implement parsing logic based on Cypress output format
  // Return an array of result objects
  return [];
}

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
