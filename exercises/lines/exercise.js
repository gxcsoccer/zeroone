var fs = require('fs'),
    path = require('path'),
    os = require('os'),
    exercise = require('workshopper-exercise')(),
    filecheck = require('workshopper-exercise/filecheck'),
    execute = require('workshopper-exercise/execute'),
    comparestdout = require('workshopper-exercise/comparestdout'),
    through2 = require('through2'),
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
        })

    // file with random text
    fs.writeFile(testFile, txt, 'utf8', callback)
})

// add a processor for both run and verify calls, added *before*
// the comparestdout processor so we can mess with the stdouts
exercise.addProcessor(function(mode, callback) {

    setTimeout(query.bind(this, mode), 250)

    process.nextTick(function() {
        callback(null, true)
    })
});

// compare stdout of solution and submission
exercise = comparestdout(exercise)

// delayed for 500ms to wait for servers to start so we can start
// playing with them
function query(mode) {
    var exercise = this

    function send(stream) {
        var input = through2()
        fs.createReadStream(testFile)
            .pipe(input)
            // input
            .pipe(stream)
            .on('error', function(err) {
                exercise.emit(
                    'fail',
                    'Submission never read from process.stdin'
                )
            })
            // input.write('wow. such wow.\n');
            // input.write('wow. SUs wow.\n');
            // input.end();
    }

    send(exercise.submissionChild.stdin)

    if (mode == 'verify')
        send(exercise.solutionChild.stdin)
}

exercise.addCleanup(function(mode, passed, callback) {
    // mode == 'run' || 'verify'

    fs.unlink(testFile, callback)
})

module.exports = exercise