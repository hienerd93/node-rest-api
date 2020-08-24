var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});
var User = mongoose.model('User', UserSchema);

var createUser = function(arrayOfUsers, done) {
  User.create(arrayOfUsers, function (err, users) {
    if (err) return console.log(err);
    done(null, users);
  });
};
var getAllUser = function({}, done) {
  User.find({}, function (err, userFound) {
    if (err) return console.log(err);
    done(null, userFound);
  });
};
var getOneUser = function(userId, done) {
  User.findById(userId, function (err, data) {
    if (err) return console.log(err);
    done(null, data);
  });
};
var removeUser = function(userId, done) {
  User.findByIdAndRemove(userId, function (err, data) {
    if (err) return console.log(err);
    done(null, data);
  });
};
var updateUser = function(userId, user, done) {
  User.findByIdAndUpdate(userId, user, {new: true}, function (err, data) {
    if (err) return console.log(err);
    done(null, data);
  }, {new: true});
};
exports.UserModel = User;
exports.createUser = createUser;
exports.getAllUser = getAllUser;
exports.getOneUser = getOneUser;
exports.removeUser = removeUser;
exports.updateUser = updateUser;
