const express = require('express');
const router = express.Router();

router.post('/', (req, res, next)=>{
    console.log('logging in user')
    passport.authenticate('local', function (err, user, info) {
        if (err || !user ) { console.log('failure to login'); res.status(400).send('Invalid Login'); return;}
        req.logIn(user, function (err) {
            if (err) { return next(err); }
            console.log('login successful')
            res.status(200).send(user);
            return
        });
      
    })(req, res, next);    
})



module.exports = router;