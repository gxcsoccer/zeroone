var fs = require('fs'),
    path = require('path'),
    os = require('os'),
    exercise = require('workshopper-exercise')(),
    filecheck = require('workshopper-exercise/filecheck'),
    execute = require('workshopper-exercise/execute'),
    comparestdout = require('workshopper-exercise/comparestdout'),
    boganipsum = require('boganipsum'),
    testFile = path.join(os.tmpDir(), '_learnyounode_' + process.pid + '.txt')

exercise.longCompareOutput = true;
// checks that the submission file actually exists
exercise = filecheck(exercise)

// execute the solution and submission in parallel with spawn()
exercise = execute(exercise)

exercise.addSetup(function(mode, callback) {
    var lines = Math.ceil(Math.random() * 10),
        txt = boganipsum({
            paragraphs: lines
        });

    this.submissionArgs = [testFile];
    this.solutionArgs = [testFile];

    fs.writeFile(testFile, txt, 'utf8', callback)
})

// compare stdout of solution and submission
exercise = comparestdout(exercise)

exercise.addCleanup(function(mode, passed, callback) {
    // mode == 'run' || 'verify'

    fs.unlink(testFile, callback)
})

module.exports = exercise