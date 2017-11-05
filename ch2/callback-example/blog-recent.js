const http = require('http');
const fs = require('fs');

http.createServer((request, response) => {
  if (request.url === '/') {
      getTitles(response);
  }
}).listen(8000, 'localhost');

function getTitles(response) {
  fs.readFile('./titles.json', (err, data) => {
    if (err) {
      handleError(response, err);
    } else {
      getTemplate(response, JSON.parse(data.toString()));
    }
  });
}

function getTemplate(response, titles) {
  fs.readFile('./template.html', (err, data) => {
    if (err) {
      handleError(response, err)
    } else {
      htmlResponse(response, data.toString(), titles);
    }
  });
}

function htmlResponse(response, template, titles) {
  const html = template.replace('%', titles.join('</li><li>'));
  response.writeHead(200, {'Content-Type': 'text/html'})
  response.end(html);
}

function handleError(response, err) {
  console.error(err);
  response.end('Server Error');
}
