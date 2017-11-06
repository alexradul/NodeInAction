const sqlite3 = require('sqlite3').verbose();
const dbName = 'later.sqlite';
const db = new sqlite3.Database(dbName);

db.serialize(() => {
  const sql = `create table if not exists articles
    (id integer primary key, title, content text)
    `;
    db.run(sql)
});

class Article {
  static all(callback) {
    db.all('select * from articles', callback);
  }
  static find(id, callback) {
    db.get('select * from articles where id = ?', id, callback);
  }
  static create(article, callback) {
    const sql = 'insert into articles(title, content) values (?, ?)';
    db.run(sql, article.title, article.content, callback);
  }
  static delete(id, callback) {
    if (!id)
      return callback(new Error('Please provide an id'));
    db.run('delete from articles where id = ?', id, callback);
  }
}

module.exports = db;
module.exports.Article = Article;
