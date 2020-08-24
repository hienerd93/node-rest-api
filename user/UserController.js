var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var User = require('./User').UserModel;

var createUser = require('./User').createUser;
router.post('/', function (req, res) {
  createUser(
    {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    },
    function (err, user) {
      if (err)
        return res
          .status(500)
          .send('There was a problem adding the information to the database.');
      res.status(200).send(user);
    }
  );
});

var getAllUser = require('./User').getAllUser;
router.get('/', function (req, res) {
  getAllUser({}, function (err, users) {
    if (err)
      return res.status(500).send('There was a problem finding the users.');
    res.status(200).send(users);
  });
});

var getOneUser = require('./User').getOneUser;
router.get('/:id', function(req, res) {
  getOneUser(req.params.id, function (err, user) {
    if (err) return res.status(500).send("There was a problem finding the user.");
    if (!user) return res.status(404).send("No user found.");
    res.status(200).send(user);
  });
});

var removeUser = require('./User').removeUser;
router.delete('/:id', function (req, res) {
  removeUser(req.params.id, function (err, user) {
    if (err) return res.status(500).send("There was a problem deleting the user.");
    res.status(200).send("User "+ user.name +" was deleted.");
  });
});

var updateUser = require('./User').updateUser;
router.put('/:id', function (req, res) {
  updateUser(req.params.id, req.body, function (err, user) {
    if (err) return res.status(500).send("There was a problem updating the user.");
    res.status(200).send(user);
  });
});
module.exports = router;
