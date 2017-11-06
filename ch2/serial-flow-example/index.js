const fs = require('fs');
const request = require('request');
const htmlparser = require('htmlparser');
const configFilename = './rss-feeds.txt';

function checkForRSSConfigFile() {
  fs.exists(configFilename, (exists) => {
    if (!exists) {
      next(new Error(`Missing RSS config file: ${configFilename}`))
    } else {
      next(null, configFilename);
    }
  });
}

function loadRSSFeeds(configFilename) {
  fs.readFile(configFilename, (err, feeds) => {
    if (err) {
      next(err);
    } else {
      const feedList = feeds
        .toString()
        .replace(/^\s+|\s+$/g, '')
        .split('\n');
      const randomIndex = Math.floor(Math.random() * feedList.length);
      next(null, feedList[randomIndex]);
    }
  });
}

function downloadRSSFeed(feedUrl) {
  request({uri: feedUrl }, (err, response, body) => {
    if (err)
      return next(err);
    if (response.statusCode !== 200)
      return next(new Error(`Unexpected response status code: ${response.statusCode}`));
    next(null, body);
  });
}

function parseRSSFeed(rss) {
  const handler = new htmlparser.RssHandler();
  const parser = new htmlparser.Parser(handler);
  parser.parseComplete(rss);
  if (!handler.dom.items.length)
    return next(new Error('No RSS items found'));
  const item = handler.dom.items.shift();
  console.log(item.title);
  console.log(item.link);
}

const tasks = [
  checkForRSSConfigFile,
  loadRSSFeeds,
  downloadRSSFeed,
  parseRSSFeed
];

function next(err, result) {
  if (err) {
    throw err;
  }
  const currentTask = tasks.shift();
  if (currentTask) {
    currentTask(result);
  }
}

next();
