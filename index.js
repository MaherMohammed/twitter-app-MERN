//password: A75cQTINGti3rJ7E
// database connection : mongodb+srv://maher:<password>@twitter-app.lsdk0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const users = require('./routes/api/users');
const tweets = require('./routes/api/tweets');

const app = express();
const db = require('./config/keys').mongoURI;

mongoose.connect(db,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=> console.log('CONNECTED TO DATABASE SUCCESSFULLY !'))
.catch(err => console.log(err));


app.use(bodyParser.urlencoded({
    extended:false
}));
app.use(bodyParser.json());

app.use('/api/users',users);
app.use('/api/tweets',tweets);

app.get('/',(req,res)=>{
    res.send('hello world!');
})



const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`SERVER RUNNING ON POSRT ${PORT}`);
})