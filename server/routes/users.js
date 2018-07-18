const express = require('express');
const controller = require('../controller');
const router = express.Router();

router.post('/', (req, res)=>{
    console.log('adding user')
    controller.addUser(req.body)
        .then((result) => { console.log("success"); return res.send(result) })
        .catch((err) => { console.log(err); return res.send(false) });
});

router.get('/', (req, res)=>{
    console.log('fetching users')
    controller
        .getUsers()
        .then(result => {
            console.log("success");
            return res.send(result);
        })
    .catch(err => {
        console.log(err);
        return res.send(false);
    });
})

router.put('/', (req, res)=>{
    console.log('updating user')
    controller.updateUser(req.body)
        .then((result) => { console.log("success"); return res.send(result) })
        .catch((err) => { console.log(err); return res.send(false) });
})

module.exports = router;