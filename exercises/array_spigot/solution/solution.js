var util = require('util');
var Readable = require('stream').Readable;
util.inherits(Spigot, Readable);

function Spigot(data) {
    this.data = data;
    Readable.call(this);
}

Spigot.prototype._read = function(size) {
    if (this.data) {
        this.push(new Buffer(this.data));
        this.data = null;
    } else {
        this.push(null);
    }
};

var spigot = new Spigot(process.argv[2]);
spigot.pipe(process.stdout);