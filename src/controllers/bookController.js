const { Book } = require('../models/book');
const { Sequelize } = require('sequelize');

const {
  isNotEmpty,
  isArrayEmpty,
  isValidID,
  isValidDate,
} = require('../utils/validation/validation');

const find = async (req, res) => {
  const { name, category, createdAt, id } = req.query;
  const opts = {};
  const page = parseInt(req.query.page) || 1;
  const pageSize = 5;
  const startIndex = (page - 1) * pageSize;

  if (isValidID(id)) {
    opts.id = id;
  }

  if (isNotEmpty(name)) {
    opts.name = { [Sequelize.Op.like]: `%${name}%` };
  }

  if (isNotEmpty(category)) {
    opts.category = { [Sequelize.Op.like]: `%${category}%` };
  }

  if (isValidDate(createdAt)) {
    const dayFrom = new Date(createdAt);
    const dayTo = new Date(dayFrom);
    dayTo.setDate(dayFrom.getDate() + 1);
    opts.createdAt = {
      [Sequelize.Op.and]: [
        { [Sequelize.Op.gte]: dayFrom },
        { [Sequelize.Op.lt]: dayTo },
      ],
    };
  }

  const result = await Book.findAndCountAll({
    where: opts,
    limit: pageSize,
    offset: startIndex,
  });

  if (result.count === 0) {
    return res.json({
      list: null,
    });
  }

  const { count, rows } = result;
  const totalPages = Math.ceil(count / pageSize);

  return res.json({
    list: rows,
    currentPage: page,
    totalPages: totalPages,
  });
};

const create = async (req, res) => {
  const { name, category } = req.body;

  if (!isNotEmpty(name)) return res.status(400).json('Invalid name');

  if (!isNotEmpty(category)) return res.status(400).json('Plz input category');

  const existBook = await Book.findOne({ where: { name } });
  if (existBook) return res.status(409).json(`${name} already exist`);

  const book = await Book.create({
    name,
    category,
  });

  return res.status(201).json(book);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name, category } = req.body;
  const updatedVal = {};

  if (!isValidID(id)) {
    return res.status(400).json('invalid request');
  }

  const book = await Book.findByPk(id);

  if (!book) return res.status(404).json();

  if (isNotEmpty(name)) {
    const foundBook = await Book.findOne({ where: { name } });
    if (foundBook && String(foundBook.id) !== String(id)) {
      return res.status(409).json(`Book ${name} already exist`);
    }
    updatedVal.name = name;
  }

  if (isNotEmpty(category)) {
    updatedVal.category = category;
  }

  await Book.update(updatedVal, { where: { id } });

  const updatedData = await Book.findByPk(id);

  return res.status(200).json(updatedData);
};

const destroy = async (req, res) => {
  const { id } = req.params;
  if (!isValidID(id)) {
    return res.status(400).json('invalid request');
  }

  try {
    const book = await Book.findByPk(id);

    if (!book) return res.status(404).json();

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
