const UserModel = require('../models/user');

const getUsers = (req, res) => UserModel.find({})
  .then((users) => res.status(200).send(users))
  .catch(() => res.status(500).send({ error: 'Ошибка сервера' }));

const getProfile = (req, res) => UserModel.findById(req.params._id)
  .then((user) => res.status(200).send(user))
  .catch((err) => {
    if (err.name === 'CastError') {
      res.status(404).send({ message: 'Пользователь не найден' });
    }
    res.status(500).send({ message: 'Ошибка сервера' });
  });

const createProfile = (req, res) => UserModel.create(req.body)
  .then((user) => res.status(200).send(user))
  .catch((err) => {
    if (err.name === 'ValidationError') {
      res.status(400).send({ message: 'Некорректные данные' });
    }
    res.status(500).send({ message: 'Ошибка сервера' });
  });

const updateProfile = (req, res) => UserModel.findByIdAndUpdate(req.user._id, req.body,
  { new: true, runValidators: true })
  .then((user) => res.status(200).send(user))
  .catch((err) => {
    if (err.name === 'ValidationError') {
      res.status(400).send({ message: 'Некорректные данные' });
    } else if (err.name === 'CastError') {
      res.status(404).send({ message: 'Пользователь не найден' });
    }
    res.status(500).send({ message: 'Ошибка сервера' });
  });

const updateAvatar = (req, res) => UserModel.findByIdAndUpdate(req.user._id, req.body,
  { new: true, runValidators: true })
  .then((user) => res.status(200).send(user))
  .catch((err) => {
    if (err.name === 'ValidationError') {
      res.status(400).send({ message: 'Некорректные данные' });
    } else if (err.name === 'CastError') {
      res.status(404).send({ message: 'Пользователь не найден' });
    }
    res.status(500).send({ message: 'Ошибка сервера' });
  });

module.exports = {
  getUsers, getProfile, createProfile, updateProfile, updateAvatar,
};
