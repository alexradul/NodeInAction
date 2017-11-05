const fs = require('fs');
const Watcher = require('./file-watcher');

const watcher = new Watcher('c:/temp/source', 'c:/temp/destination');
watcher.on('process', filename => {
  const sourceFile = `${watcher.watchDir}/${filename}`;
  const targetFile = `${watcher.targetDir}/${filename.toLowerCase()}`;
  console.log(`processing ${sourceFile}`);
  fs.rename(sourceFile, targetFile, err => {
    if (err) {
      throw err;
    }
  })
});

watcher.start();
console.log('Watching directory changes');
