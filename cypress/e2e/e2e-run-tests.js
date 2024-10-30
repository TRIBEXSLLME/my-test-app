// e2e-run-tests.js
const cypress = require("cypress")

let result // Declare a variable to store the result

cypress
  .run({
    reporter: "junit",
    browser: "chrome",
    // the path is relative to the current working directory
    spec: './cypress/e2e/smpt.cy.ts',
  })
  .then((results) => {
    result = results // Store the result in the variable
    console.log(result)
    // store in db
  })
  .catch((err) => {
    console.error(err)
  })

// GET /history
// pulls data from db
