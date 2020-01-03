var express = require("express");
var router = express.Router();
var Sequelize = require('sequelize');

const pg = require("pg");

const connectionString = "postgres://postgres:postgres@localhost:5432/express_psql";
const client = new pg.Client(connectionString);
client.connect();

var sequelize = new Sequelize(connectionString, {
  dialect: 'postgres',
  define: {
    timestamps: false
  }
});

var User = sequelize.define('test_data', {
  id: {
    type: Sequelize.STRING,
    field: 'id',
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
    field: "name",
  }
}, {
  freezeTableName: true // Model tableName will be the same as the model name
});

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

router.post('/user', function(req, res, next) {
  console.log(req.body)
  return User.create({
    name: req.body.name,
  });
});

module.exports = router;
