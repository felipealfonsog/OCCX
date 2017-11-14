/*
 * Module dependencies
 */


 var express = require('express')
  , stylus = require('stylus')
  , nib = require('nib')
  , http = require('http');


  const port = process.env.PORT || 3000;
  var app = express();
  var server = http.createServer(app);

function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib());
}

app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
app.use(express.logger('dev'))
app.use(stylus.middleware(
  { src: __dirname + '/public'
  , compile: compile
  }
))
app.use(express.static(__dirname + '/public'))

app.get('/', function (req, res) {
  res.render('index',
  { title : 'Home' }
  )
})

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
