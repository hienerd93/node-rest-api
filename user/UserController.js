const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const User = require('./User').UserModel;

const createUser = require('./User').createUser;
const postUserRoute = async (req, res, next) => {
  try {
    const user = await createUser(req.body);
    res.status(201).json(user);
  } catch (e) {
    next(e);
  }
};

const getAllUser = require('./User').getAllUser;
const getAllUserRoute = async (req, res, next) => {
  try {
    const users = await getAllUser();
    if (!users) {
      const err = new Error('User not found');
      err.status = 404;
      throw err;
    }
    res.json(users);
  } catch (e) {
    next(e);
  }
};

const getUser = require('./User').getOneUser;
const getUserRoute = async (req, res, next) => {
  try {
    const user = await getUser(req.params.id);
    if (!user) {
      const err = new Error('User not found');
      err.status = 404;
      throw err;
    }
    res.json(user);
  } catch (e) {
    next(e);
  }
};

var deleteUser = require('./User').removeUser;
const deleteUserRoute = async (req, res, next) => {
  try {
    const user = await deleteUser(req.params.id);
    if (!user) {
      const err = new Error('Player stats not found');
      err.status = 404;
      throw err;
    }
    res.status(200).end();
  } catch (e) {
    next(e);
  }
};

const updateUser = require('./User').updateUser;
const putUserRoute = async (req, res, next) => {
  try {
    const user = await updateUser(req.params.id, req.body);
    if (!user) {
      const err = new Error('Player stats not found');
      err.status = 404;
      throw err;
    }
    res.status(200).json(user);
  } catch (e) {
    next(e);
  }
};

router.route('/:id')
  .get(getUserRoute)
  .delete(deleteUserRoute)
  .put(putUserRoute);

router.route('/')
  .get(getAllUserRoute)
  .post(postUserRoute);
module.exports = router;
