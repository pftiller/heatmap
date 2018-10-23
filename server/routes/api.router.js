const express = require('express');
const router = express.Router();

router.get('/googlemaps', (request, response, next)=>{
  var payload = {
    key: process.env.KEY
  };
  response.send(payload)
  .end();
})

module.exports = router