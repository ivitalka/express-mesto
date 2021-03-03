const CardModel = require('../models/card');

const cardNotFound = () => {
  const err = new Error('Карточка не найдена');
  err.statusCode = 404;
  throw err;
};
const response = (err, res) => {
  if (err.statusCode === 404) {
    res.status(404).send({ message: err.message });
  }
  if (err.kind === 'ObjectId') {
    res.status(400).send({ message: 'Невалидный id' });
  }
  res.status(500).send({ message: 'Ошибка сервера' });
};

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
  .orFail(() => {
    cardNotFound();
  })
  .then(() => res.status(200).send({ message: 'Карточка удалена' }))
  .catch((err) => {
    response(err, res);
  });

const likeCard = (req, res) => CardModel.findByIdAndUpdate(
  req.params._id,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)
  .orFail(() => {
    cardNotFound();
  })
  .then((card) => res.status(200).send(card))
  .catch((err) => {
    response(err, res);
  });

const dislikeCard = (req, res) => CardModel.findByIdAndUpdate(
  req.params._id,
  { $pull: { likes: req.user._id } },
  { new: true },
)
  .orFail(() => {
    cardNotFound();
  })
  .then((card) => res.status(200).send(card))
  .catch((err) => {
    response(err, res);
  });

module.exports = {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
};
