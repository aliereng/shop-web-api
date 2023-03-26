const express = require("express");
const path = require("path")
const router = express.Router();

router.get("/image/:name", function(req, res, next){
    var options = {
        root: path.join(__dirname.slice(0,__dirname.indexOf("routers")),"public/uploads"),
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    }

    const fileName = req.params.name;
    res.sendFile(fileName, options, function(err){
        if(err) {
            next(err)
        }
    })
})

module.exports = router;