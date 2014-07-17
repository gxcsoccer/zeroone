#!/usr/bin/env node

const workshopper = require('workshopper'),
    path = require('path');

function fpath(f) {
    return path.join(__dirname, f)
}

workshopper({
    name: 'zeroone',
    title: 'Buffer & Stream',
    subtitle: 'Learn how to work with Buffer & Stream in Node',
    appDir: fpath('../'),
    menuItems: [],
    exerciseDir: fpath('../exercises/')
});