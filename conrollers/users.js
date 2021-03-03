const UserModel = require('../models/user');

const userNotFound = () => {
  const err = new Error('Пользователь не найден');
  err.statusCode = 404;
  throw err;
};

const response = (err, res) => {
  if (err.name === 'ValidationError') {
    res.status(400).send({ message: 'Некорректные данные' });
  }
  if (err.statusCode === 404) {
    res.status(404).send({ message: err.message });
  }
  if (err.kind === 'ObjectId') {
    res.status(400).send({ message: 'Невалидный id' });
  }
  res.status(500).send({ message: 'Ошибка сервера' });
};

const getUsers = (req, res) => UserModel.find({})
  .then((users) => res.status(200).send(users))
  .catch(() => res.status(500).send({ error: 'Ошибка сервера' }));

const getProfile = (req, res) => UserModel.findById(req.params._id)
  .orFail(() => {
    userNotFound();
  })
  .then((user) => res.status(200).send(user))
  .catch((err) => {
    response(err, res);
  });

const createProfile = (req, res) => UserModel.create(req.body)
  .then((user) => res.status(200).send(user))
  .catch((err) => {
    response(err, res);
  });

const updateProfile = (req, res) => UserModel.findByIdAndUpdate(req.user._id, req.body,
  { new: true, runValidators: true })
  .orFail(() => {
    userNotFound();
  })
  .then((user) => res.status(200).send(user))
  .catch((err) => {
    response(err, res);
  });

const updateAvatar = (req, res) => UserModel.findByIdAndUpdate(req.user._id, req.body,
  { new: true, runValidators: true })
  .orFail(() => {
    userNotFound();
  })
  .then((user) => res.status(200).send(user))
  .catch((err) => {
    response(err, res);
  });
module.exports = {
  getUsers, getProfile, createProfile, updateProfile, updateAvatar,
};
