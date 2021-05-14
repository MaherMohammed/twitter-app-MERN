const express = require('express');
const router = express.Router();

router.get('/testUsers', (req,res)=>{
    res.json({
        msg: 'Hello Users'
    })
})


module.exports = router;