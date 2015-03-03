var express = require('express')
var app = express();
var util = require('util');
var bodyparser = require('body-parser');
var fs = require('fs');


app.use('/', express.static('.tmp'));
app.use('/', express.static('app'));
app.use(bodyparser.text());

app.get('/backend', function (req, res) {
  res.sendFile(__dirname + '/app/swagger.yaml')
})

app.put('/backend', function (req, res) {
  //console.log(util.inspect(req.body));
  fs.writeFile(__dirname + '/app/swagger.yaml', req.body, function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log("The file was saved!");
    }
  });
  res.send('OK')
})

app.put('/jsonbackend', function (req, res) {
  //console.log(util.inspect(req.body));
  fs.writeFile(__dirname + '/app/swagger.json', req.body, function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log("The file was saved!");
    }
  });
  res.send('OK')
})


var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

})
