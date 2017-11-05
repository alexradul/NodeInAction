const fs = require('fs');
const events = require('events');

class Watcher extends events.EventEmitter {
  constructor(watchDir, targetDir) {
    super();
    this.watchDir = watchDir;
    this.targetDir = targetDir;
  }
  watch() {
    fs.readdir(this.watchDir, (err, files) => {
      if (err) {
        throw err;
      }
      files.forEach(filename => this.emit('process', filename));
    });
  }
  start() {
    fs.watchFile(this.watchDir, () => this.watch());
  }
}

module.exports = Watcher;
