const { Book } = require('../models/book');
const { Sequelize } = require('sequelize');

const nameNotEmpty = require('../utils/validation/bookValidation').nameNotEmpty;
const isNotFind = require('../utils/validation/bookValidation').isNotFind;
const cateNotEmpty = require('../utils/validation/bookValidation').cateNotEmpty;
const validID = require('../utils/validation/bookValidation').validID;

const find = async (req, res) => {
  const { name, category, createdAt } = req.query;
  const dayWithin = createdAt === undefined ? new Date(createdAt) : new Date();
  const limit = new Date(dayWithin);
  limit.setDate(dayWithin.getDate() + 1);

  if (
    (!name && !category && !createdAt) ||
    (name && category && createdAt === '')
  ) {
    const books = await Book.findAll();

    if (isNotFind(books)) {
      return res.json('No book');
    }

    return res.json(books);
  } else {
    const finedBooks = await Book.findAll({
      where: {
        [Sequelize.Op.or]: [
          { name: { [Sequelize.Op.like]: `%${name}%` } },
          { category: { [Sequelize.Op.like]: `%${category}%` } },
          {
            createdAt: {
              [Sequelize.Op.and]: [
                { [Sequelize.Op.gte]: dayWithin },
                { [Sequelize.Op.lt]: limit },
              ],
            },
          },
        ],
      },
    });

    if (isNotFind(finedBooks)) {
      return res.json('No book to find');
    }

    return res.json(finedBooks);
  }
};

const create = async (req, res) => {
  const { name, category } = req.body;

  if (!nameNotEmpty(name)) return res.json('Invalid name');

  if (!cateNotEmpty(category)) return res.json('Plz input category');

  const existBook = await Book.findOne({ where: { name: name } });
  if (existBook) return res.json('already exist');

  const book = await Book.create({
    name,
    category,
  });

  return res.status(201).json(book);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name, category } = req.body;

  if (validID(id)) {
    return res.json('invalid request');
  }

  const book = await Book.findByPk(id);

  if (!book) return res.status(404).json('Not found');

  if (!nameNotEmpty(name)) return res.status(422).json('Name cannot be empty');

  if (!cateNotEmpty(category))
    return res.status(422).json('Plz Input Category');

  const existBook = await Book.findOne({ where: { name: name } });
  if (existBook) {
    return res.json('Book already exist check and use other name');
  }

  await Book.update(
    {
      name: name,
      category: category,
    },
    { where: { id: id } }
  );

  const updatedData = await Book.findByPk(id);

  return res.json(updatedData);
};

const destroy = async (req, res) => {
  const { id } = req.params;
  if (validID(id)) {
    return res.json('invalid request');
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
