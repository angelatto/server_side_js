var express = require('express');
var app = express();

app.use(express.static('public'));
//public디렉토리를 정적파일이 위치한 곳으로 이용하겠다.


app.get('/', function(req, res){
  res.send('hello home page');
});

app.get('/route', function(req, res){
  res.send('hello router, <img src="/image.png">');
});

app.get('/login', function(req, res){
  res.send('login please');
});
app.listen(3000, function(){
  console.log('Connected 3000 port!');
});
