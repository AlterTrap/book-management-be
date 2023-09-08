const { Book } = require('../models/book');
const { Sequelize } = require('sequelize');

const isNameNotEmpty =
  require('../utils/validation/bookValidation').isNameNotEmpty;
const isNotFind = require('../utils/validation/bookValidation').isNotFind;
const isCateNotEmpty =
  require('../utils/validation/bookValidation').isCateNotEmpty;
const isValidID = require('../utils/validation/bookValidation').isValidID;
const isValidDate = require('../utils/validation/bookValidation').isValidDate;

const find = async (req, res) => {
  const { name = '', category = '', createdAt } = req.query;
  const dayWithin = new Date(createdAt);
  const limit = new Date(dayWithin);
  const opts = { where: { [Sequelize.Op.and]: [] } };

  limit.setDate(dayWithin.getDate() + 1);

  if (isNameNotEmpty(name)) {
    opts.where[Sequelize.Op.and].push({
      name: { [Sequelize.Op.like]: `%${name}%` },
    });
  }

  if (isCateNotEmpty(category)) {
    opts.where[Sequelize.Op.and].push({
      category: { [Sequelize.Op.like]: `%${category}%` },
    });
  }

  if (isValidDate(createdAt)) {
    opts.where[Sequelize.Op.and].push({
      createdAt: {
        [Sequelize.Op.and]: [
          { [Sequelize.Op.gte]: dayWithin },
          { [Sequelize.Op.lt]: limit },
        ],
      },
    });
  }

  const finedBooks = await Book.findAll(opts);

  if (isNotFind(finedBooks)) {
    return res.status(404).json('No book to find');
  }

  return res.json(finedBooks);
};

const create = async (req, res) => {
  const { name, category } = req.body;

  if (!isNameNotEmpty(name)) return res.status(400).json('Invalid name');

  if (!isCateNotEmpty(category))
    return res.status(400).json('Plz input category');

  const existBook = await Book.findOne({ where: { name: name } });
  if (existBook) return res.status(409).json(name + ' already exist');

  const book = await Book.create({
    name,
    category,
  });

  return res.status(201).json(book);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name, category } = req.body;

  if (isValidID(id)) {
    return res.json('invalid request');
  }

  const book = await Book.findByPk(id);

  if (!book) return res.status(404).json('Not found');

  if (!isNameNotEmpty(name))
    return res.status(400).json('Name cannot be empty');

  if (!isCateNotEmpty(category))
    return res.status(400).json('Plz Input Category');

  const existBook = await Book.findOne({ where: { name: name } });
  if (existBook) {
    return res
      .status(409)
      .json('Book ' + name + ' already exist check and use other name');
  }

  await Book.update(
    {
      name: name,
      category: category,
    },
    { where: { id: id } }
  );

  const updatedData = await Book.findByPk(id);

  return res.status(200).json(updatedData);
};

const destroy = async (req, res) => {
  const { id } = req.params;
  if (isValidID(id)) {
    return res.status(400).json('invalid request');
  }

  try {
    const book = await Book.findByPk(id);

    if (!book) return res.status(404).json('Not found');

    await book.destroy();
    return res.status(204).json();
  } catch (e) {
    return res.status(500).json('Server error');
  }
};

module.exports = {
  find,
  create,
  update,
  destroy,
};
