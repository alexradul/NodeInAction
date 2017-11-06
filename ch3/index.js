const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const articles = [{ title: 'Example'}];

const port = process.env.PORT || 3000;

app.set('port', port);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

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
  const article = {title: req.body.title};
  articles.push(article);
  res.send(article);
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

app.listen(app.get('port'), () => {
  console.log(`Express web app available at localhost: ${port}`);
})

module.exports = app;
