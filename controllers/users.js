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
      
      if (user) return res.status(400).send({ message: 'Email already exists' });

      User.create(req.body, function(err, user) {
        
        if (err) {
          
          return res.status(500).send(err);
        }

        // var authHeader = req.headers.authorization;
        // var authHeaderParts = authHeader.split(" ");
        // var token = authHeaderParts[1];

        return res.send(user);
        
        return res.send(user);
      });
    });
  });

router.route('/auth')
  .get(function(req, res) {
    
  })
  .post(function(req, res) {
    //LOGGING IN
    
    // find the user first in case the email already exists
    User.findOne({ email: req.body.email }, function(err, user) {
      
      if (err) {
        console.log("user not found. err:", err);
        return res.status(401).send({message: 'User not found', err: err});
      }

      if (!user) {
        console.log("email not found");
        return res.status(400).send({ message: 'email not found', status: 400 });
      }
      
      if (user.authenticated(req.body.password)) {
        
       
        var token = jwt.sign(user, secret);
        
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
        
        
        if(req.body.health >= 0){
          user.pet.health = req.body.health
        };
        
        
        if(req.body.mood >= 0){
          user.pet.mood = req.body.mood
        };
        user.save(function() {
          
        });
      })
    });
  })


module.exports = router;