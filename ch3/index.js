const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Article = require('./db').Article;
const read = require('node-readability');

const port = process.env.PORT || 3000;

app.set('port', port);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.use(
  '/css/bootstrap.css',
  express.static('node_modules/bootstrap/dist/css/bootstrap.css')
);

/**
* get all articles
*/
app.get('/articles', (req, res, next) => {
  Article.all((err, articles) => {
    if (err)
      return next(err);
    res.format({
      html: () => {
        res.render('articles.ejs', {articles: articles});
      },
      json: () => {
        res.send(articles);
      }
    });
  });
});

/**
* creates an article
*/
app.post('/articles', (req, res, next) => {
  const url = req.body.url;
  // articles.push(article);
  read(url, (err, result) => {
    if(err || !result)
      res.status(500).send('Error downloading article');
    Article.create(
      { title: result.title, content: result.content},
      (err, article) => {
        if (err)
          return next(err);
        res.send('OK');
    });
  });
});

/**
* gets a single article
*/
app.get('/articles/:id', (req, res, next) => {
  const id = req.params.id;
  Article.find(id, (err, article) => {
    if (err)
      return next(err);
    res.format({
      html: () => {
        res.render('article.ejs', {article: article});
      },
      json: () => {
        res.send(article);
      }
    });
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
