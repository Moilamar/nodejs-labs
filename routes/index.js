var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("index");
  res.status(200).render('index', { title: 'Nodejs-labs', testData: ["first", "second"] });
});

module.exports = router;
