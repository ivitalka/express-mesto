const CardModel = require('../models/card');

const getCards = (req, res) => CardModel.find({})
  .then((cards) => res.status(200).send(cards))
  .catch(() => res.status(500).send({ error: 'Ошибка сервера' }));

const createCard = (req, res) => CardModel.create({ ...req.body, owner: req.user._id })
  .then((card) => res.status(200).send(card))
  .catch((err) => {
    if (err.name === 'ValidationError') {
      res.status(400).send({ message: 'Некорректные данные' });
    }
    res.status(500).send({ message: 'Ошибка сервера' });
  });

const deleteCard = (req, res) => CardModel.findByIdAndRemove(req.params._id, { new: true })
  .then(() => res.status(200).send({ message: 'Карточка удалена' }))
  .catch(() => res.status(500).send({ message: 'Ошибка сервера' }));

const likeCard = (req, res) => CardModel.findByIdAndUpdate(
  req.params._id,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)
  .then((card) => res.status(200).send(card))
  .catch((err) => res.status(500).send(err));

const dislikeCard = (req, res) => CardModel.findByIdAndUpdate(
  req.params._id,
  { $pull: { likes: req.user._id } },
  { new: true },
)
  .then((card) => res.status(200).send(card))
  .catch(() => res.status(500).send({ message: 'Ошибка сервера' }));

module.exports = {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
};
