var express = require('express');
var jwt = require('jsonwebtoken');
var secret = "supersecretstarwars" || process.env.JWT_SECRET;
var User = require('../models/user');
var router = express.Router();

router.route('/')
  .get(function(req, res) {
    console.log("This is the backend yo!");
  })
  .post(function(req, res) {
    // SIGNING UP FOR THE FIRST TIME
    console.log(req.body);
    //find the user first in case the email already exists
    User.findOne({ email: req.body.email }, function(err, user) {
      console.log("done looking for user!");
      if (user) return res.status(400).send({ message: 'Email already exists' });

      User.create(req.body, function(err, user) {
        console.log("tried to create user");
        if (err) {
          console.log("create user err:", err);
          return res.status(500).send(err);
        }

        console.log("created user", user);
        return res.send(user);
      });
    });
  });

router.route('/auth')
  .get(function(req, res) {
    console.log("This is the auth backend yo!");
  })
  .post(function(req, res) {
    //LOGGING IN
    console.log(req.body);
    // find the user first in case the email already exists
    User.findOne({ email: req.body.email }, function(err, user) {
      console.log("found one user");
      
      if (err) {
        console.log("user not found. err:", err);
        return res.status(401).send({message: 'User not found', err: err});
      }

      if (!user) {
        console.log("email not found");
        return res.status(400).send({ message: 'email not found', status: 400 });
      }
      
      console.log("authing");
      if (user.authenticated(req.body.password)) {
        console.log("authed");
        console.log("making token")
        var token = jwt.sign(user, secret);
        console.log("token:", token);
        res.send({user: user, token: token});
      }
      else{
        return res.status(401).send({ message: 'email not found' });
      }
    });
  });

  router.route('/stats')
  .get(function(req, res) {
    //getting the stats for the current user3
    var authHeader = req.headers.authorization;
    var authHeaderParts = authHeader.split(" ");
    var token = authHeaderParts[1];
    jwt.verify(token, secret, function(err, decoded) {
      var userId = decoded._doc._id;
      User.findOne({_id: userId}, function(err, user) {
        if (err) {
          res.send(err);
          return;
        }

        if (!user) {
          res.send(404);
          return;
        }

        console.log("backend get response firing", user);
        res.send(user);
      })
    });
  })
  .put(function(req, res) {
    // header is sending password!!??
    var authHeader = req.headers.authorization;
    var authHeaderParts = authHeader.split(" ");
    var token = authHeaderParts[1];
    jwt.verify(token, secret, function(err, decoded) {
      var userId = decoded._doc._id;
      console.log("put backend", req.body);
      console.log("put backend", req.body.activity);
      // User.findOne({_id: userId}, function(err, user)
      User.findOne({_id: userId}, function(err, user) {
        if (err) {
          res.send(err);
          console.log(err);
          return;
        }
        if (!user) {
          res.send(404);
          console.log(err);
          return;
        }
        var activityId;
        if(req.body.activity){
          if(req.body.activity == 'sleep'){activityId = 0};
          if(req.body.activity == 'feed'){activityId = 1};
          if(req.body.activity == 'exercise'){activityId = 2};
          if(req.body.activity == 'clean'){activityId = 3};
          if(req.body.activity == 'nurse'){activityId = 4};
        }
        // if(req.body.mhi){user.pet.stats[activityId].mhi += req.body.mhi};
        // if(req.body.mmi){user.pet.stats[activityId].mmi += req.body.mmi};
        if(req.body.lastTime) {
          user.pet.stats[activityId].last = req.body.lastTime;
        }
        console.log("req.body", req.body);
        
        if(req.body.health >= 0){
          console.log("updating health");
          user.pet.health = req.body.health
        };
        console.log(req.body.mood);
        
        if(req.body.mood >= 0){
          console.log("updating mood");
          user.pet.mood = req.body.mood
        };
        user.save(function() {
          console.log("saved!!");
        });
      })
    });
  })


module.exports = router;