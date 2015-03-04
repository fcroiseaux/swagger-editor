var express = require('express')
var app = express();
var util = require('util');
var bodyparser = require('body-parser');
var fs = require('fs');


app.use('/', express.static('swagger-ui'));

app.use('/editor/', express.static('.tmp'));
app.use('/editor/', express.static('app'));
app.use(bodyparser.text());

app.get('/backend', function (req, res) {
  res.sendFile(__dirname + '/app/postsafe.yaml')
})

app.put('/backend', function (req, res) {
  //console.log(util.inspect(req.body));
  fs.writeFile(__dirname + '/app/postsafe.yaml', req.body, function(err) {
    if(err) {
      console.log(err);
    }
  });
  res.send('OK')
})

app.put('/jsonbackend', function (req, res) {
  //console.log(util.inspect(req.body));
  fs.writeFile(__dirname + '/app/postsafe.json', req.body, function(err) {
    if(err) {
      console.log(err);
    }
  });
  res.send('OK')
})


var server = app.listen(80, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('PostSafe API documentation manager listening at http://%s:%s', host, port)

})
