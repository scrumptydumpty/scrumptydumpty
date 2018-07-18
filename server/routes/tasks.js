const express = require('express');
const controller = require('../controller');
const router = express.Router();


router.post('/', (req, res)=>{
    console.log('adding task')
    controller.addTask(req.body)
        .then((result)=>{console.log('success'); return res.send(result)})
        .catch((err)=>{console.log(err); return res.send(false)});
})

router.get('/', (req, res)=>{
    console.log('fetching tasks')
    controller.getTasks()
        .then((result) => { console.log('success'); return res.send(result) })
        .catch((err) => { console.log(err); return res.send(false) });
})

router.put('/', (req, res)=>{
    console.log('updating task')
    controller.updateTask(req.body)
      .then((result) => { console.log("success"); return res.send(result) })
      .catch((err) => { console.log(err); return res.send(false) });
})

module.exports = router;