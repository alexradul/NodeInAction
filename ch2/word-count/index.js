const fs = require('fs');
const tasks = [];
const wordCounts = {};

const filesDirectory = './text';
let completedTasks = 0;

function checkIfComplete() {
  completedTasks ++;
  if (completedTasks === tasks.length) {
    for (let word in wordCounts) {
      console.log(`${word}: ${wordCounts[word]}`);
    }
  }
}

function addWordCount(word) {
  wordCounts[word] = (wordCounts[word])? wordCounts[word] + 1 : 1;
}

function countWordsInText(text) {
  const words = text
    .toString()
    .toLowerCase()
    .split(/\W+/)
    .sort();
  words
    .filter(word => word) // retain all non null and non empty values
    .forEach(word => addWordCount(word));
}

fs.readdir(filesDirectory, (err, files) => {
  if (err)
    throw err;
  files.forEach(file => {
    const task = (file => { // remember param file in a closure
      return () => {  // return function to be invoked when task() is executed
        fs.readFile(file, (err, text) => {
          if (err)
            throw err;
          countWordsInText(text);
          checkIfComplete();
        });
      };
    })(`${filesDirectory}/${file}`);
    tasks.push(task);
  });

  tasks.forEach(task => task());
});
