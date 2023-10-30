const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const https = require('https')
const mongoose = require('mongoose')
const passport = require("passport")
const passportLocalMongoose = require("passport-local-mongoose")
const session = require("express-session")
const multer = require("multer");
const fs = require('fs');
var path = require('path');
app.use(bodyParser.urlencoded({
  extended: true
}))

app.set('view engine', 'ejs')
app.use(express.static("public"));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads');
  },
  filename: function (req, file, cb) {
    cb(null,file.originalname)
  },
});
const upload = multer({ storage: storage });

mongoose.connect("mongodb://localhost:27017/shanyraq", { useNewUrlParser: true, useUnifiedTopology: true }, err => {
  console.log('connected')
})



app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}))
// passport
app.use(passport.initialize())
app.use(passport.session())



const userSchema = mongoose.Schema({
  email: String,
  password: String,
})
userSchema.plugin(passportLocalMongoose)
const User = mongoose.model("User", userSchema)

passport.use(User.createStrategy());



passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//model and collectiosn

app.get("/", function(req, res){
  res.render("home")
})

app.route("/register")
.get(function(req, res){
  res.render("register")
})
.post(function(req, res) {
  User.register({
    username: req.body.username,
    email: req.body.username
  }, req.body.password, function(err, user) {
    if (err) {
      console.log(err)
      res.redirect("/register")
    } else {
      passport.authenticate("local")(req, res, function() {
        res.redirect("/account")
      })
    }
  })
})


app.route("/login")
  .get(function(req, res) {
    res.render("login")
  })
  .post(function(req, res) {

    const user = new User({
      username: req.body.username,
      passwrod: req.body.password
    })

    req.login(user, function(err) {
      if (err) {
        res.redirect("/login")

        console.log(err)
      } else {
        passport.authenticate("local")(req, res, function() {
          res.redirect("/culture")
        })
      }
    })
  })


  app.post('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
  });




const shanyraqSchema = mongoose.Schema({
  title:{
    type:String,
    required:true
},
  content:{
    type:String,
    required:true
},
  img:String,
  video:String,
  time:{
    type:String,
    
},
   genre:String,
   category:String,
   year:String,
   username:String,
   id1:String
})

const accountSchema = mongoose.Schema({
  name:String,
  surname:String,
  age:Number,
  number:Number,
  email:String,
  country:String,
  region:String,
  img:String
 })
 

const database = mongoose.model("database",shanyraqSchema)
const saved = mongoose.model("saved",shanyraqSchema)

 



app.post("/saved/:_id",async function(req,res){
 let id = req.params._id
  let music = await database.findOne({_id:id})
  let title1=music.title
  let content1 = music.content
  let img1 = music.img
  let vidio=music.video
  let undefined = await saved.findOne({id1:id})
  if(!undefined){
 const saves = new saved({
    title:title1,
    content:content1,
    img:img1,
    video:vidio,
    username:req.user.username,
    id1:id
  })
  saves.save();
  }
 
  for(var v=0; v<10000;v++){
    console.log(music.title);
    console.log(music.video);
  }
  res.redirect('/music')
  });
  app.get("/tuition", async function(req,res){
    
    let account1 = await account.findOne({email:req.user.username})
       saved.find( {username:req.user.username},function(err, saved){
        if(!err){
          res.render("tuition",{saved:saved,username:req.user.username,account:account1});
          console.log(saved)
       }else {
        console.log('Failed to retrieve the News: ' + err);
    }
     });
    });
  
// const databaseAdd = new database({
//     title:"RaiM",
//     category:"music",
//     content:"Lova Lo",
//     img:"https://lmusic.kz/images/cover/raim-lova-lo.png",
//     video:"muz\raim-lova-lo(mp3gid.me).mp3"
// })
// databaseAdd.save()

app.get("/search", function(req, res){
  res.render('search',{username:req.user.username})
})
app.post("/search", function(req,res){
     database.findOne({title:req.body.keyword}, function(err, search){
      if(!err){
        res.render("searchR",{search:search,username:req.user.username});
        console.log(search)
     }else {
      console.log('Failed to retrieve the News: ' + err);
  }
   });
   
  });

app.get("/watch/:_id",function(req,res){
let id=req.params._id
database.findOne({_id:id}, function(err, search){
  if(!err){
    res.render("watch",{search:search,email:req.user.username});

 }else {
  console.log('Failed to retrieve the News: ' + err);
}
});


})


const account = mongoose.model("account",accountSchema)







app.get("/index", async function(req, res){
  if(req.isAuthenticated()){
    let account1 = await account.findOne({email:req.user.username})
    let cartoon = await database.find({category:"cartoon"})   
    let films = await database.find({category:"film"})
   
  res.render('culture',{cartoon:cartoon,films:films,username:req.user.username,name:account1.name,account:account1})
  }else{
    res.redirect("/home")
  }
})
  app.get("/culture",async function(req, res){
    
    let account1 = await account.findOne({email:req.user.username})
    res.render("culture",{username:req.user.username, account:account1})
  })

  app.get("/id_card", async function(req, res){
    
    let account1 = await account.findOne({email:req.user.username})
   database.find({category:"music"},function(err,music){
      if(!err){
        console.log(music[0]._id);
        res.render('id_card',{music:music,username:req.user.username,account:account1})
        
      }
      else{
        console.log('Failed to retrieve the News: ' + err);
      }
    })
  })
  app.get("/retake",async function(req, res){
    
    let account1 = await account.findOne({email:req.user.username})
    database.find({category:"cartoon"},function(err,cartoon){
      if(!err){
        res.render('retake',{cartoon:cartoon,username:req.user.username,account:account1})
      }
      else{
        console.log('Failed to retrieve the News: ' + err);
      }
    })
  })
  app.get("/dormitory", async function(req, res){
    
    let account1 = await account.findOne({email:req.user.username})
    database.find({category:"film"},function(err,films){
      if(!err){
        res.render('dormitory',{films:films,username:req.user.username,account:account1})
      }
      else{
        console.log('Failed to retrieve the News: ' + err);
      }
    })
  })

  
  


  
 app.get("/account", function(req,res){
    res.render("account",{email:req.user.username})
 })

 app.post("/account", upload.single('image'),function(req,res){
const newImage = new account({
  img: req.file.filename,
  name: req.body.name,
  surname: req.body.surname,
  age:req.body.age,
  country:req.body.country,
  number:req.body.number,
  region:req.body.region,
  email:req.user.username
});
newImage.save(),
 res.redirect('/culture')

 })

 app.get('/editacc',function(req,res){
   account.findOne({email:req.user.username},function(err,account){
     if(!err){
       res.render('editacc',{name:account.name,account:account,email:req.user.username})
       console.log(account.name);
     }
     else{
       console.log(err)
     }
   })
   
 })
app.post('/editacc', upload.single("image"),function(req,res){
  
  account.findOneAndUpdate({email:req.user.username},
     { $set :
         { 
           "img":req.file.filename,
           "name":req.body.name,              
           "surname":req.body.surname,
           "age":req.body.age,
           "number":req.body.number, 
           "country":req.body.country,
           "region":req.body.region
         }},          
           function(err){
               if(err){
                   res.send("error")
                   console.log(err)
                   
               }
               else{
                   res.redirect("/index")
               }
           })
})

app.post('/delete/:id',function(req,res){
  console.log(req.params.id)
  saved.findOneAndRemove({id1:req.params.id}, (err, ) => {
    if (!err) {
        res.redirect('/tuition');
    } else {
        console.log('Failed to Delete news: ' + err);
    }
});
})

app.listen(3000)