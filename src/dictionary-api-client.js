/**
 * Created by ericjohnson on 2/23/16.
 */

let http = require('http');

export function get(word, callback) {
  let data = {
    content: '',
    status: 0
  };

  http.get(`http://dictionaryapi.net/api/definition/${word}`, function (res) {
    data.status = res.statusCode;

    res.on('data', function (chunk) {
      data.content += chunk;
    });

    res.on('end', function () {
      data.content = JSON.parse(data.content);
      callback(data);
    });

    res.resume();
  }).on('error', function (error) {
    context.fail('There was a problem with the dictionary API')
  });
}