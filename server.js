const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With", "Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var tutorials = [
  {
    id: "0",
    title: "C++ Programming Tutorial",
    description: "Learn C++ in just over an hour with this awesome tutorial!",
    iframe: '<div class="container">"<iframe class="video" src="https://www.youtube.com/embed/Rub-JsjMhWY" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe></div>',
    thumbnail: "https://qph.fs.quoracdn.net/main-qimg-bdfa835b90751e141c98005063a96cb7-c",
    comments: [{
      username: "testUserOne",
      comment: "Awesome video, keep it up!"
    },
    {
      username: "testUserTwo",
      comment: "Cool!"
    }]
  },
  {
    id: "1",
    title: "Python Programming Tutorial",
    description: "Learn Python in just over an hour with this awesome tutorial!",
    iframe: '<div class="container">"<iframe class="video" src="https://www.youtube.com/embed/N4mEzFDjqtA" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe></div>',
    thumbnail: "https://www.python.org/static/community_logos/python-logo-master-v3-TM.png",
    comments: [{
      username: "testUserThree",
      comment: "I learned Python!"
    }]
  },
  {
    id: "2",
    title: "Java Programming Tutorial",
    description: "Learn Java in just over an hour with this awesome tutorial!",
    iframe: '<div class="container">"<iframe class="video" src="https://www.youtube.com/embed/WPvGqX-TXP0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe></div>',
    thumbnail: "https://codecondo.com/wp-content/uploads/2015/03/java-logo1.jpg",
    comments: [{
      username: "testUserFour",
      comment: "Java is cool."
    }]
  }
];

app.post('/tutorials', function(req, res) {
  var comment = req.body;
  if (comment) {
    if (comment.username && comment.comment) {
        var tutorialAtIndex = tutorials[comment.id];
        var makeComment = {username: comment.username, comment: comment.comment};
        tutorialAtIndex.comments.push(makeComment);

        console.log("Posted comment!");
        res.send("You successfully posted a comment");
    } else {
      res.send("You posted invalid data");
    }
  } else {
    res.send("Your post has no body!");
  }
});

app.get('/tutorials', function(req, res) {
  console.log("Get from server");
  res.send(tutorials);
});

app.listen(6060);
