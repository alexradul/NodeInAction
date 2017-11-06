const express = require('express');
const app = express();
const articles = [{ title: 'Example'}];

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello world');
});

/**
* get all articles
*/
app.get('/articles', (req, res, next) => {
  res.send(articles);
});

/**
* creates an article
*/
app.post('/articles', (req, res, next) => {
  res.send('OK');
});

/**
* gets a single article
*/
app.get('/articles/:id', (req, res, next) => {
  const id = req.params.id;
  console.log('Fetching article: ', id);
  res.send(articles[id]);
});

/**
* gets a single article
*/
app.delete('/articles/:id', (req, res, next) => {
  const id = req.params.id;
  console.log('Deleting article: ', id);
  delete articles[id];
  res.send({ message: 'Deleted'});
});

app.listen(port, () => {
  console.log(`Express web app available at localhost: ${port}`);
})
