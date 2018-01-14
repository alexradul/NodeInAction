

class StringWriter {
    constructor() {
        this.lines = [];
    }

    write(line) {
        this.lines.push(line);
        return this;
    }

    toString() {
        return this.lines.join('\n');
    }
}

exports.StringWriter = StringWriter;