const express = require('express');
const router = express.Router();

router.post('/', (req, res)=>{
    console.log('adding blocker')
    controller.addBlocker(req.body)
      .then((result) => { console.log("success"); return res.send(result) })
      .catch((err) => { console.log(err); return res.send(false) });
})

router.get('/', (req, res)=>{
    console.log('fetching blockers')
    controller.getBlockers(req.query.id)
      .then((result) => { console.log("success"); return res.send(result) })
      .catch((err) => { console.log(err); return res.send(false) });
})

router.put('/', (req, res)=>{
    console.log('updating blocker')
    controller.updateBlocker(req.body)
      .then((result) => { console.log("success"); return res.send(result) })
      .catch((err) => { console.log(err); return res.send(false) });
})