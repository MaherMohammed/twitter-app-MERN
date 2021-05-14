const express = require('express');
const router = express.Router();

router.get('/testTweets', (req,res)=>{
    res.json({
        msg: 'Hello Tweets'
    })
})


module.exports = router;