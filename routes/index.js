var express = require("express");
var router = express.Router();

const pg = require("pg");

const connectionString = "postgres://postgres:postgres@localhost:5432/express_psql";
const client = new pg.Client(connectionString);
client.connect();

/* GET home page. */
router.get("/", function(req, res, next) {
  const query = client.query("SELECT * FROM test_data LIMIT 30;");
  query.then((result) => {
    //console.log(result);
  });

  const rows = [];
  query.on("row", (result) => {
    console.log(result);
    rows.push(result);
  });

  query.on("end", () => {
    res.status(200).render("index", { title: "Nodejs-labs", testData: rows, rows: [] });
  });
});

router.get('/user', function(req, res, next) {
  const query = client.query("SELECT * FROM users;");
  const rows = [];
  query.on("row", (result) => {
    console.log(result);
    rows.push(result);
  });
  res.send(rows);
});

module.exports = router;
