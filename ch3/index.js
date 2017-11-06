const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Article = require('./db').Article;

const port = process.env.PORT || 3000;

app.set('port', port);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

/**
* get all articles
*/
app.get('/articles', (req, res, next) => {
  Article.all((err, articles) => {
    if (err)
      return next(err);
    res.send(articles);
  });
});

/**
* creates an article
*/
app.post('/articles', (req, res, next) => {
  const article = {title: req.body.title};
  // articles.push(article);
  res.send(article);
});

/**
* gets a single article
*/
app.get('/articles/:id', (req, res, next) => {
  const id = req.params.id;
  Article.find(id, (err, article) => {
    if (err)
      return next(err);
    res.send(article);
  });
});

/**
* deletes a single article
*/
app.delete('/articles/:id', (req, res, next) => {
  const id = req.params.id;
  Article.delete(id, (err) => {
    if (err)
      return next(err);
    res.send({ message: 'Deleted'});
  })
});

app.listen(app.get('port'), () => {
  console.log(`Express web app available at localhost: ${port}`);
});

module.exports = app;
