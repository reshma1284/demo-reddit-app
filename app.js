var express = require('express');
var app = express();
var mongoose = require('mongoose');
var cors = require('cors');
var bodyParser = require('body-parser');
var User = require('./models/User');
var { check, validationResult } = require('express-validator/check');
var session    = require('express-session');
var Post = require('./models/Post');
const path = require("path");



//mongoose.connect('mongodb://localhost:27017/myreddit');
mongoose.connect('mongodb://test:test@ds247648.mlab.com:47648/reddit');


//app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "frontend", "build")));
// Cross-origin resource sharing - Middelware
app.use(cors({
    origin:['http://localhost:3000'],
    methods:['GET','POST', 'DELETE', 'PUT'],
    credentials: true // enable set cookie
}));

// Session - Middelware
app.use(session({
  resave: true,
  secret: 'Vt9PxTrm~E{4`9]T',
  saveUninitialized:true,
   cookie:{maxAge:16000}
 }));



app.get('/reddit/test',function(req,res){
  res.send('Hello Server');
})

//registration validation///////////////////////////////////////////////////////////////////////////
const arrValidate = [
  check('name', 'Please enter a name').not().isEmpty(),
  check('email', 'Enter a valid email_id').isEmail(),
  check('password', 'Password should contain more than 6 characters').isLength({min:7, max:16}),
  check('confirmPassword', 'Passwords must match').custom((value, {req})=>value === req.body.password),
  check('name','Name should not contain numbers')
  .custom(function (value) {
    var re = /^[A-Za-z]+$/;
    if(re.test(value))
       return true;
    else
        return false;
      }),
  //if it is false it will show the message

  check('email', 'The email already exists').custom(value=>{
    return User.find({'email':value})
    .then(user => {
        if(user.length)
          return false;
          else
          return true;
      })
    })
];

app.post('/reddit/register', arrValidate,function(req,res){
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    //console.log(errors);
    return res.status(422).json({errors: errors.mapped()});
  }

  let newUser = new User({
    "name": req.body.name,
    "email": req.body.email,
    "password": req.body.password
  });

  newUser.save()
    .then(function(record){
      //console.log(record);
    })
    .catch(function(error){
      //console.log(error);
    });

    res.end();
})


//Login validation///////////////////////////////////////////////////////

validateLogin= [
  check('email','You must enter a valid email').isEmail(),
  check('password','Please enter a password ').not().isEmpty(),
]

app.post('/reddit/login',validateLogin,function(req,res){
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    //console.log(errors);
    return res.status(422).json({errors: errors.mapped()});
  }

  User.findOne(req.body)
  .then(function(user){
    if(!user){
      return res.send({status: 'error', message: 'User not found'});
    }
    req.session.userIsLoggedin = user;
  //  console.log(user);
    res.send(user);
  })
  .catch(function(error){
    res.send({error: 'error', message: 'Something went wrong'});
  })
})

//Posting  a message

app.post('/reddit/postMessage', function(req,res){
    //  console.log(req.body);
      Post.create(req.body)
      .then(function(message){
          res.send({status: 'success', message: 'Message posted successfully'});
      })
      .catch(function(error){
      //  console.log(error);
        res.send({error: 'error', message: 'Something went wrong'});
      })
})

//Listing all the messages

app.get('/reddit/listMessage',function(req,res){
  Post.find({}).sort({upVote: -1})
  .then(function(message){
      //console.log(message);

      res.send(message);
  })
  .catch(function(error){
      res.send({status: 'error', message: 'Something went wrong'});
  });
});

//updating the messages

app.post('/reddit/upvote',function(req,res){
  console.log(req.body);
  Post.update({"_id": req.body.messageId},{"upVote": req.body.upvoteCounter},{upsert: true})
  .then(function(message){
    console.log(message);
    res.send(message);
  })
  .catch(function(error){
    res.send({staus: 'error', message: 'something went wrong'});
  })
})





//Log out the user
app.get('/reddit/logout',function(req,res){
  req.session.destroy();
  res.end();
})

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
});

app.listen(process.env.PORT || 8080,function(){
  console.log('listening on port 8080');
})
