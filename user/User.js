const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model('User', UserSchema);

const createUser = (users) => User.create(users);

const getAllUser = () => User.find({}).exec();

const getOneUser = (userId) => User.findById(userId).exec();

const removeUser = (userId) => User.findByIdAndRemove(userId).exec();

const updateUser = (userId, user) => User.findByIdAndUpdate(userId, user).exec();

exports.UserModel = User;
exports.createUser = createUser;
exports.getAllUser = getAllUser;
exports.getOneUser = getOneUser;
exports.removeUser = removeUser;
exports.updateUser = updateUser;
