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
const DORM_ABI = [{
  "inputs": [],
  "stateMutability": "payable",
  "type": "constructor"
},
{
  "inputs": [],
  "name": "checkBalanceofContract",
  "outputs": [
    {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }
  ],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [],
  "name": "checkMyBalance",
  "outputs": [
    {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }
  ],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [],
  "name": "getAllTransactions",
  "outputs": [
    {
      "components": [
        {
          "internalType": "uint256",
          "name": "contract_id",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "student_address",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "student_barcode",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "full_name",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "roomNumber",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "howmanymonths",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "whichmonths",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "comments",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "requiredPrice",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "timestamp",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "paid",
          "type": "bool"
        }
      ],
      "internalType": "struct DormitoryPayment.Dormitory[]",
      "name": "",
      "type": "tuple[]"
    }
  ],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [],
  "name": "getCommission",
  "outputs": [],
  "stateMutability": "payable",
  "type": "function"
},
{
  "inputs": [],
  "name": "getMyTransactions",
  "outputs": [
    {
      "components": [
        {
          "internalType": "uint256",
          "name": "contract_id",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "student_address",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "student_barcode",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "full_name",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "roomNumber",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "howmanymonths",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "whichmonths",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "comments",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "requiredPrice",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "timestamp",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "paid",
          "type": "bool"
        }
      ],
      "internalType": "struct DormitoryPayment.Dormitory[]",
      "name": "",
      "type": "tuple[]"
    }
  ],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "uint256",
      "name": "student_barcode",
      "type": "uint256"
    },
    {
      "internalType": "string",
      "name": "comments",
      "type": "string"
    },
    {
      "internalType": "string",
      "name": "_full_name",
      "type": "string"
    },
    {
      "internalType": "uint256",
      "name": "roomNumber",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "forHowManyMonths",
      "type": "uint256"
    },
    {
      "internalType": "string",
      "name": "whichMonths",
      "type": "string"
    }
  ],
  "name": "makePayment",
  "outputs": [],
  "stateMutability": "payable",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "uint256",
      "name": "required_price",
      "type": "uint256"
    }
  ],
  "name": "setRequiredPrice",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "address",
      "name": "uni_address",
      "type": "address"
    }
  ],
  "name": "setUniversityAddress",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}
];

const web3 = new Web3(process.env.web3);
 

app.post('/dormPayment', async (req, res) => {
    try {
      const contractABI = DORM_ABI;
      const contractAddress = process.env.contractAddress_dorm ; 
      const dormitoryContract = new web3.eth.Contract(contractABI,contractAddress);
      
      console.log(dormitoryContract.methods); 
      let account1 = await account.findOne({email:req.user.username})
      console.log(req.body.userAccount)
           try {
            console.log(req.body.userAccount);
        
            // Construct the transaction object
            const transactionObject = {
              from: req.body.userAccount,
              to:contractAddress, // You need to set an appropriate gas limit based on your contract's complexity
              gasPrice: 1000000000,
              value: web3.utils.toWei((0.0015 * req.body.forHowManyMonths).toString(), 'ether'),
              data: dormitoryContract.methods.makePayment(
                  req.body.studentBarcode, req.body.comments, req.body.fullName, req.body.roomNumber, req.body.forHowManyMonths, req.body.whichMonths
              ).encodeABI(),
              // Add other transaction parameters as needed
          };
          
            // Sign the transaction
            const signedTransaction = await web3.eth.accounts.signTransaction(transactionObject, account1.privateKey);
        
            // Send the raw transaction
            const transactionHash = await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);
        
            // Handle the transactionHash as needed
            console.log('Transaction Hash:', transactionHash);
            res.render('dormitory',{username:req.user.username,account:account1})
          } catch (error) {
            console.log(error)
            if (error.message.includes('insufficient funds')) {
              res.render('error', { errorMessage: 'Not enough cryptocurrency to make the payment' });
          } else if (error.message.includes('max fee per gas less than block base fee')) {
            res.render('error', { errorMessage: 'Gas fee is not suitable' });
        } 
        else if (error.message.includes('must pass "address" validation')) {
          res.render('error', { errorMessage: 'Input is not suitable for Address' });
      } 
        else if (error.message.includes(" Cannot read properties of undefined (reading 'username')")) {
          res.render('error', { errorMessage: 'IYou are not Authorized' });
      } else if (error.message.includes('contract') && error.message.includes('include')) {
          res.render('error', { errorMessage: 'Contract error' });
      } 
      else{
        res.render('error', { errorMessage: error});
      }
          }
        
       
      } catch (error) {
        console.log(error)
        if (error.message.includes('insufficient funds')) {
          res.render('error', { errorMessage: 'Not enough cryptocurrency to make the payment' });
      } else if (error.message.includes('max fee per gas less than block base fee')) {
        res.render('error', { errorMessage: 'Gas fee is not suitable' });
    } 
    else if (error.message.includes('value "aj" at "/0" must pass "address" validation')) {
      res.render('error', { errorMessage: 'Input is not suitable for Address' });
  } 
    else if (error.message.includes(" Cannot read properties of undefined (reading 'username')")) {
      res.render('error', { errorMessage: 'IYou are not Authorized' });
  } else if (error.message.includes('contract') && error.message.includes('include')) {
      res.render('error', { errorMessage: 'Contract error' });
  } 
  else{
    res.render('error', { errorMessage: error});
  }
    }
  });
app.post('/DormTransactionsGet',async(req,res)=>{
      try{      
      const contractABI2 = DORM_ABI;        
      const contractAddress2 = process.env.contractAddress_dorm; 
      const dormitoryContract2 = new web3.eth.Contract(contractABI2, contractAddress2);
    try {
      let account1 = await account.findOne({ email: req.user.username });
      
      const Transactions = await dormitoryContract2.methods.getMyTransactions().call({ from: req.body.userAccount2 });
      // Convert BigInt values to strings before serializing
      // Extracting the actual data using string keys
      const cleanedTransactions = Transactions.map(transaction => ({
        contract_id: transaction.contract_id,
        student_address: transaction.student_address,
        student_barcode: transaction.student_barcode,
        full_name: transaction.full_name,
        roomNumber: transaction.roomNumber,
        howmanymonths: transaction.howmanymonths,
        whichmonths: transaction.whichmonths,
        comments: transaction.comments,
        requiredPrice: transaction.requiredPrice,
        timestamp: transaction.timestamp,
        paid: transaction.paid,
      }));

      console.log('Cleaned Transactions:', cleanedTransactions);
      
      res.render('transactions',{transactions:cleanedTransactions})
    } catch (error) {
      // Log the error for debugging purposes
      if (error.message.includes('insufficient funds')) {
        res.render('error', { errorMessage: 'Not enough cryptocurrency to make the payment' });
    } else if (error.message.includes('max fee per gas less than block base fee')) {
      res.render('error', { errorMessage: 'Gas fee is not suitable' });
  } 
  else if (error.message.includes('value "aj" at "/0" must pass "address" validation')) {
    res.render('error', { errorMessage: 'Input is not suitable for Address' });
} 
  else if (error.message.includes(" Cannot read properties of undefined (reading 'username')")) {
    res.render('error', { errorMessage: 'IYou are not Authorized' });
} else if (error.message.includes('contract') && error.message.includes('include')) {
    res.render('error', { errorMessage: 'Contract error' });
} 
else{
  res.render('error', { errorMessage: error});
}
    }
  } catch (error) {
    // Log the error for debugging purposes
    if (error.message.includes('insufficient funds')) {
      res.render('error', { errorMessage: 'Not enough cryptocurrency to make the payment' });
  } else if (error.message.includes('max fee per gas less than block base fee')) {
    res.render('error', { errorMessage: 'Gas fee is not suitable' });
} 
else if (error.message.includes('value "aj" at "/0" must pass "address" validation')) {
  res.render('error', { errorMessage: 'Input is not suitable for Address' });
} 
else if (error.message.includes(" Cannot read properties of undefined (reading 'username')")) {
  res.render('error', { errorMessage: 'IYou are not Authorized' });
} else if (error.message.includes('contract') && error.message.includes('include')) {
  res.render('error', { errorMessage: 'Contract error' });
} 
else{
res.render('error', { errorMessage: error});
}
  }
});

app.post('/DormTransactionsGetAll',async(req,res)=>{
  try{
  const contractABI2 = DORM_ABI;    
  const contractAddress2 = process.env.contractAddress_dorm; 
  const dormitoryContract2 = new web3.eth.Contract(contractABI2, contractAddress2);
try {
  let account1 = await account.findOne({ email: req.user.username });
  
  const Transactions = await dormitoryContract2.methods.getAllTransactions().call({ from: req.body.userAccount4 });
  // Convert BigInt values to strings before serializing
  // Extracting the actual data using string keys
  const cleanedTransactions = Transactions.map(transaction => ({
    contract_id: transaction.contract_id,
    student_address: transaction.student_address,
    student_barcode: transaction.student_barcode,
    full_name: transaction.full_name,
    roomNumber: transaction.roomNumber,
    howmanymonths: transaction.howmanymonths,
    whichmonths: transaction.whichmonths,
    comments: transaction.comments,
    requiredPrice: transaction.requiredPrice,
    timestamp: transaction.timestamp,
    paid: transaction.paid,
  }));

  console.log('Cleaned Transactions:', cleanedTransactions);

  res.render('transactions',{transactions:cleanedTransactions})

} catch (error) {
  // Log the error for debugging purposes
  if (error.message.includes('insufficient funds')) {
    res.render('error', { errorMessage: 'Not enough cryptocurrency to make the payment' });
} else if (error.message.includes('max fee per gas less than block base fee')) {
  res.render('error', { errorMessage: 'Gas fee is not suitable' });
} 
else if (error.message.includes('value "aj" at "/0" must pass "address" validation')) {
res.render('error', { errorMessage: 'Input is not suitable for Address' });
} 
else if (error.message.includes(" Cannot read properties of undefined (reading 'username')")) {
res.render('error', { errorMessage: 'IYou are not Authorized' });
} else if (error.message.includes('contract') && error.message.includes('include')) {
res.render('error', { errorMessage: 'Contract error' });
} 
else{
res.render('error', { errorMessage: error});
}
}
} catch (error) {
// Log the error for debugging purposes
console.error('Error in /DormTransactionsGet (outer try block):', error);

// Send an error response
res.status(500).send('Internal Server Error');
}
});
app.post('/setUniAddress',async(req,res)=>{
  try{
  const contractABI2 = DORM_ABI;
  const contractAddress2 = process.env.contractAddress_dorm; 
  const dormitoryContract2 = new web3.eth.Contract(contractABI2, contractAddress2);
 
  let account1 = await account.findOne({email:req.user.username})
  const privateKey = account1.privateKey;
console.log(privateKey)
  const gasLimit = 200000;  // Adjust the gas limit according to your contract
  const gasPrice = web3.utils.toWei('50', 'gwei');  // Adjust the gas price accordingly
  
  // Call the contract funct\ // Replace with the desired value
  const data = dormitoryContract2.methods.setUniversityAddress(req.body.uni).encodeABI();
  
  // Send the transaction
  const transactionObject = {
      from: req.body.userAccount5,
      to: contractAddress2,
      gas: gasLimit,
      gasPrice: gasPrice,
      data: data,
  };
  
  web3.eth.accounts.signTransaction(transactionObject, privateKey)
      .then(signedTx => web3.eth.sendSignedTransaction(signedTx.rawTransaction))
      .then(receipt => {
          console.log('Transaction receipt:', receipt);
          res.render('dormitory',{username:req.user.username,account:account1})
      })
      .catch(error => {
        if (error.message.includes('insufficient funds')) {
          res.render('error', { errorMessage: 'Not enough cryptocurrency to make the payment' });
      } else if (error.message.includes('max fee per gas less than block base fee')) {
        res.render('error', { errorMessage: 'Gas fee is not suitable' });
    } 
    else if (error.message.includes('value "aj" at "/0" must pass "address" validation')) {
      res.render('error', { errorMessage: 'Input is not suitable for Address' });
  } 
    else if (error.message.includes(" Cannot read properties of undefined (reading 'username')")) {
      res.render('error', { errorMessage: 'IYou are not Authorized' });
  } else if (error.message.includes('contract') && error.message.includes('include')) {
      res.render('error', { errorMessage: 'Contract error' });
  } 
  else{
    res.render('error', { errorMessage: error});
  }
      });
    
}catch(error){
  if (error.message.includes('insufficient funds')) {
    res.render('error', { errorMessage: 'Not enough cryptocurrency to make the payment' });
} else if (error.message.includes('max fee per gas less than block base fee')) {
  res.render('error', { errorMessage: 'Gas fee is not suitable' });
} 
else if (error.message.includes('must pass "address" validation')) {
res.render('error', { errorMessage: 'Input is not suitable for Address' });
} 
else if (error.message.includes(" Cannot read properties of undefined (reading 'username')")) {
res.render('error', { errorMessage: 'IYou are not Authorized' });
} else if (error.message.includes('contract') && error.message.includes('include')) {
res.render('error', { errorMessage: 'Contract error' });
} 
else{
res.render('error', { errorMessage: error});
}
}
}
);
app.post('/setRequiredPrice',async(req,res)=>{
  try{
  const contractABI2 = DORM_ABI;    
  const contractAddress2 = process.env.contractAddress_dorm; 
  const dormitoryContract2 = new web3.eth.Contract(contractABI2, contractAddress2);
 
  let account1 = await account.findOne({email:req.user.username})
  const privateKey = account1.privateKey;
console.log(privateKey)
  const gasLimit = 200000;  // Adjust the gas limit according to your contract
  const gasPrice = web3.utils.toWei('50', 'gwei');  // Adjust the gas price accordingly
  
  // Call the contract funct\ // Replace with the desired value
  const data = dormitoryContract2.methods.setRequiredPrice(req.body.price).encodeABI();
  
  // Send the transaction
  const transactionObject = {
      from: req.body.userAccount3,
      to: contractAddress2,
      gas: gasLimit,
      gasPrice: gasPrice,
      data: data,
  };
  
  web3.eth.accounts.signTransaction(transactionObject, privateKey)
      .then(signedTx => web3.eth.sendSignedTransaction(signedTx.rawTransaction))
      .then(receipt => {
          console.log('Transaction receipt:', receipt);
          res.render('dormitory',{username:req.user.username,account:account1})
      })
      .catch(error => {
        if (error.message.includes('insufficient funds')) {
          res.render('error', { errorMessage: 'Not enough cryptocurrency to make the payment' });
      } else if (error.message.includes('max fee per gas less than block base fee')) {
        res.render('error', { errorMessage: 'Gas fee is not suitable' });
    } 
    else if (error.message.includes('value "aj" at "/0" must pass "address" validation')) {
      res.render('error', { errorMessage: 'Input is not suitable for Address' });
  } 
    else if (error.message.includes(" Cannot read properties of undefined (reading 'username')")) {
      res.render('error', { errorMessage: 'IYou are not Authorized' });
  } else if (error.message.includes('contract') && error.message.includes('include')) {
      res.render('error', { errorMessage: 'Contract error' });
  } 
  else{
    res.render('error', { errorMessage: error});
  }
      });
    }catch(error){
      if (error.message.includes('insufficient funds')) {
        res.render('error', { errorMessage: 'Not enough cryptocurrency to make the payment' });
    } else if (error.message.includes('max fee per gas less than block base fee')) {
      res.render('error', { errorMessage: 'Gas fee is not suitable' });
  } 
  else if (error.message.includes('value "aj" at "/0" must pass "address" validation')) {
    res.render('error', { errorMessage: 'Input is not suitable for Address' });
} 
  else if (error.message.includes(" Cannot read properties of undefined (reading 'username')")) {
    res.render('error', { errorMessage: 'IYou are not Authorized' });
} else if (error.message.includes('contract') && error.message.includes('include')) {
    res.render('error', { errorMessage: 'Contract error' });
} 
else{
  res.render('error', { errorMessage: error});
}
    }
});



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
      password: req.body.password
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

app.post('/IDcardPayment', async (req, res) => {
          try {
            
            const contractABI = IDCARD_ABI; 
            const contractAddress = process.env.contractAddress_idcard; 
            const IDcardContract = new web3.eth.Contract(contractABI,contractAddress);
            
            console.log(IDcardContract.methods); 
            let account1 = await account.findOne({email:req.user.username})
            console.log(req.body.userAccount)
                 try {
                  console.log(req.body.userAccount);
                  console.log(req.body.photo);
                  // Construct the transaction object
                  const transactionObject = {
                    from: req.body.userAccount,
                    to:contractAddress, // You need to set an appropriate gas limit based on your contract's complexity
                    gasPrice: 100000000000,
                    value: web3.utils.toWei((0.0015).toString(), 'ether'),
                    data: IDcardContract.methods.makePayment(
                        req.body.studentBarcode, req.body.comments,req.body.photo ,req.body.fullName
                    ).encodeABI(),
                    // Add other transaction parameters as needed
                };
                
                  // Sign the transaction
                  const signedTransaction = await web3.eth.accounts.signTransaction(transactionObject, account1.privateKey);
              
                  // Send the raw transaction
                  const transactionHash = await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);
              
                  // Handle the transactionHash as needed
                  console.log('Transaction Hash:', transactionHash);
                } catch (error) {
                  if (error.message.includes('insufficient funds')) {
                    res.render('error', { errorMessage: 'Not enough cryptocurrency to make the payment' });
                } else if (error.message.includes('max fee per gas less than block base fee')) {
                  res.render('error', { errorMessage: 'Gas fee is not suitable' });
              } 
              else if (error.message.includes('value "aj" at "/0" must pass "address" validation')) {
                res.render('error', { errorMessage: 'Input is not suitable for Address' });
            } 
              else if (error.message.includes(" Cannot read properties of undefined (reading 'username')")) {
                res.render('error', { errorMessage: 'IYou are not Authorized' });
            } else if (error.message.includes('contract') && error.message.includes('include')) {
                res.render('error', { errorMessage: 'Contract error' });
            } 
            else{
              res.render('error', { errorMessage: error});
            }
                }
              
              res.render('id_card',{username:req.user.username,account:account1})
            } catch (error) {
              if (error.message.includes('insufficient funds')) {
                res.render('error', { errorMessage: 'Not enough cryptocurrency to make the payment' });
            } else if (error.message.includes('max fee per gas less than block base fee')) {
              res.render('error', { errorMessage: 'Gas fee is not suitable' });
          } 
          else if (error.message.includes('value "aj" at "/0" must pass "address" validation')) {
            res.render('error', { errorMessage: 'Input is not suitable for Address' });
        } 
          else if (error.message.includes(" Cannot read properties of undefined (reading 'username')")) {
            res.render('error', { errorMessage: 'IYou are not Authorized' });
        } else if (error.message.includes('contract') && error.message.includes('include')) {
            res.render('error', { errorMessage: 'Contract error' });
        } 
        else{
          res.render('error', { errorMessage: error});
        }
            }
  });


app.post('/IDTransactionsGetAll',async(req,res)=>{
  try{
  
    const contractABI2 = IDCARD_ABI; 
    const contractAddress2 = process.env.contractAddress_idcard; 
  const IDcardContract = new web3.eth.Contract(contractABI2, contractAddress2);
try {
  let account1 = await account.findOne({ email: req.user.username });
  
  const Transactions = await IDcardContract.methods.getAllTransactions().call({ from: req.body.userAccount4 });
  // Convert BigInt values to strings before serializing
  // Extracting the actual data using string keys
  const cleanedTransactions = Transactions.map(transaction => ({
    contract_id: transaction.contract_id,
    student_address: transaction.student_address,
    student_barcode: transaction.student_barcode,
    comments: transaction.comments,        
    photo: transaction.photo,
    full_name: transaction.full_name,
    requiredPrice: transaction.requiredPrice,
    timestamp: transaction.timestamp,
    paid: transaction.paid,
  }));

  console.log('Cleaned Transactions:', cleanedTransactions);
  
  
  res.render('idcardTransactions',{transactions:cleanedTransactions})
  
} catch (error) {
  // Log the error for debugging purposes
  if (error.message.includes('insufficient funds')) {
    res.render('error', { errorMessage: 'Not enough cryptocurrency to make the payment' });
} else if (error.message.includes('max fee per gas less than block base fee')) {
  res.render('error', { errorMessage: 'Gas fee is not suitable' });
} 
else if (error.message.includes('value "aj" at "/0" must pass "address" validation')) {
res.render('error', { errorMessage: 'Input is not suitable for Address' });
} 
else if (error.message.includes(" Cannot read properties of undefined (reading 'username')")) {
res.render('error', { errorMessage: 'IYou are not Authorized' });
} else if (error.message.includes('contract') && error.message.includes('include')) {
res.render('error', { errorMessage: 'Contract error' });
} 
else{
res.render('error', { errorMessage: error});
}
}
} catch (error) {
// Log the error for debugging purposes
if (error.message.includes('insufficient funds')) {
  res.render('error', { errorMessage: 'Not enough cryptocurrency to make the payment' });
} else if (error.message.includes('max fee per gas less than block base fee')) {
res.render('error', { errorMessage: 'Gas fee is not suitable' });
} 
else if (error.message.includes('value "aj" at "/0" must pass "address" validation')) {
res.render('error', { errorMessage: 'Input is not suitable for Address' });
} 
else if (error.message.includes(" Cannot read properties of undefined (reading 'username')")) {
res.render('error', { errorMessage: 'IYou are not Authorized' });
} else if (error.message.includes('contract') && error.message.includes('include')) {
res.render('error', { errorMessage: 'Contract error' });
} 
else{
res.render('error', { errorMessage: error});
}
}
});


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
