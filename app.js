var express = require('express');
var app = express();
app.locals.pretty = true;
app.set('view engine', 'jade');
app.set('views', './views'); //뒤의 뷰즈가 템플릿 코드가 들어갈 폴더 이름

app.use(express.static('public'));
app.get('/template', function(req, res){
  res.render('temp', {time:Date(), mytitle:'Jade'});
});
//public디렉토리를 정적파일이 위치한 곳으로 이용하겠다.
app.get('/', function(req, res){
  res.send('hello home page');
});
app.get('/dynamic', function(req, res){
  var output = `<!DOCTYPE html>
  <html lang="en" dir="ltr">
    <head>
      <meta charset="utf-8">
      <title></title>
    </head>
    <body>
      hello dynamic!
    </body>
  </html>`

  res.send(output);
}); //동적으로 작성되면 요청이 자동으로 리로드되지 않아서 껏다 켜야 수정된 코드가 적용된다.
app.get('/route', function(req, res){
  res.send('hello router, <img src="/image.png">');
});

app.get('/login', function(req, res){
  res.send('login please');
});
app.listen(3000, function(){
  console.log('Connected 3000 port!');
});
