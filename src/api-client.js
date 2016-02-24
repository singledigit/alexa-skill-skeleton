/**
 * Created by ericjohnson on 2/23/16.
 */

let http = require('http');

export function get(url, callback) {
  let data = {
    content: '',
    status: 0
  };

  http.get(url, response => {
    data.status = response.statusCode;

    response.on('data', chunk => {
      data.content += chunk;
    });

    response.on('end', () => {
      data.content = JSON.parse(data.content);
      callback(data);
    });

    response.resume();
  }).on('error', error => {
    context.fail(error);
  });
}