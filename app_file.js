var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();

app.use(bodyParser.urlencoded({ extended: false}));
app.locals.pretty = true;
app.set('views', './views_file');
app.set('view engine', 'jade');

app.get('/topic/new', function(req, res){
  fs.readdir('data', function(err, files){
    if(err){
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
    res.render('new', {topics:files});
  });

})

app.get(['/topic', '/topic/:id'], function(req, res){
  fs.readdir('data', function(err, files){
    if(err){
      console.log(err);
      res.status(500).send('Internal Server Error');
    }

    var id = req.params.id;
    if(id){ //id가 있을 때
        fs.readFile('data/'+id, 'utf8', function(err, data){
          if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
          }
          res.render('view',{topics:files, title:id, description:data});
        })
    }else{
      //id가 없을 떄
        res.render('view', {topics:files, title:'Welcome', description:'chae jeong'}); //view는 views_file폴더안에 있는 파일이름
    }
  })
})

// app.get('/topic/:id', function(req, res){
//   var id = req.params.id;
//   fs.readdir('data', function(err, files){
//     if(err){
//       console.log(err);
//       res.status(500).send('Internal Server Error');
//     }
//     fs.readFile('data/'+id, 'utf8', function(err, data){
//       if(err){
//         console.log(err);
//         res.status(500).send('Internal Server Error');
//       }
//       res.render('view',{topics:files, title:id, description:data});
//     })
//   })
// })


app.post('/topic', function(req, res){
  var title = req.body.title;
  var description = req.body.description;
  fs.writeFile('data/' + title, description, function(err){
    if(err){
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
    res.redirect('/topic/'+title);
  });
})

app.listen(3000, function(res, req){
  console.log('Connected');
})
