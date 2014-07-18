var exercise = require('workshopper-exercise')();
var filecheck = require('workshopper-exercise/filecheck');
var execute = require('workshopper-exercise/execute');
var comparestdout = require('workshopper-exercise/comparestdout');

// checks that the submission file actually exists
exercise = filecheck(exercise);

// execute the solution and submission in parallel with spawn()
exercise = execute(exercise);

// set up the data file to be passed to the submission
exercise.addSetup(function(mode, callback) {

    this.submissionArgs = ['This is a source'];
    this.solutionArgs = ['This is a source'];

    process.nextTick(callback);
});

// compare stdout of solution and submission
exercise = comparestdout(exercise)

module.exports = exercise;