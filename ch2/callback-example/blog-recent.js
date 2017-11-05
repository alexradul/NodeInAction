const http = require('http');
const fs = require('fs');

http.createServer((req, resp) => {
  if (req.url === '/') {
    fs.readFile('./titles.json', (err, data) => {
      if (err) {
        console.error(err);
        resp.end('Server Error');
      } else {
        const titles = JSON.parse(data.toString());
        fs.readFile('./template.html', (err, data) => {
          if (err) {
            console.error(err);
            resp.end('Server Error');
          } else {
            const template = data.toString();
            const html = template.replace('%', titles.join('</li><li>'));
            resp.writeHead(200, {'Content-Type': 'text/html'})
            resp.end(html);
          }
        })
      }
    })
  }
}).listen(8000, 'localhost');
