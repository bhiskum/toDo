var express = require('express');
var router = express.Router();
var Login = require('../models/Login');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const { options } = require('../app');
var auth = require('../middleware/auth');

router.post('/login',  function (req, res, next) {
  Login.login(req.body, function (err, result) {
    if (err) {
      res.json(err);

    }
    if (result.length >0){
      bcrypt.compare(req.body.password, result[0].password, (err, response) => {
        if (response) {
            const token = jwt.sign({userId :result[0].userId},'privateKey');

            res.cookie('jwt', token,{
              httpOnly:true,
              maxAge: 24 * 60 * 60 * 1000
            });
            res.json({message:"Login Success"})
        } else {
            res.status(400).json({ message: 'wrong credentials' })
        } 
    }) 
    } else {
      res.status(404).json({ token: null, msg: 'User not found !' });
    }
  });
});

router.post('/register', async function (req, res, next) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password,salt);
const user = {
  name : req.body.name,
  email : req.body.email,
  password : hashedPassword
};
  Login.addUser(user, function (err, result) {
      if (err) {
          res.json(err);
      }
      else {
        
        res.json({message:"User Created"});
         
      }
  });
});

router.get('/user', auth, async function (req, res, next) {
  Login.getUser(req.userId, function (err, result) {
      if (err) {
          res.json(err);
      }
      else {
      const {password, ...data} = result[0];
       res.json(data);
         
      }
  });

  
  
});
router.post('/logout', async function (req, res) {
  
  res.cookie('jwt', 'none',{
    maxAge: 0,
    httpOnly: true,
  });
  res.json({
    message:"Logout Success",
    status : true
})

})
module.exports = router;


