const { Book } = require('../models/book');

const find = async (req, res) => {
  const book = await Book.findAll();

  if (!book || !book.length) {
    return res.json('No book');
  }

  const name = book.map((e) => e.name).join(', ');

  return res.json(`List book: ${name}`);
};

const create = async (req, res) => {
  const { name, id, category } = req.body;
  const checkedId = '';
  if (id === undefined || id === '') {
    checkedId;
  }
  if (isNaN(checkedId)) return res.json('Invalid');
  if (!name || name.trim() === '') return res.json('Invalid name');
  if (category === '' || category === undefined)
    return res.json('Plz input category');

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

  console.log(id);

  if (!id || isNaN(id)) {
    return res.json('invalid request');
  }

  const book = await Book.findByPk(id);

  if (!book) return res.status(404).json('Not found');

  const { name, createdAt, category } = req.body;

  if (!name || name.trim() === '')
    return res.status(422).json('Name cannot be empty');

  const existBook = await Book.findOne({ where: { name: name } });

  if (category.trim() === '') return res.status(422).json('Plz Input Category');

  if (existBook) {
    return res.json('Book already exist check and use other name');
  }
  if (createdAt === undefined || createdAt === '') {
    await Book.update(
      {
        name: name,
        category: category,
      },
      { where: { id: id } }
    );
  } else {
    await Book.update(
      {
        name: name,
        createdAt: new Date(createdAt),
        category: category,
      },
      { where: { id: id } }
    );
  }

  const updatedData = await Book.findByPk(id);

  return res.json(updatedData);
};

const destroy = async (req, res) => {
  const { id } = req.params;
  if (!id || isNaN(id)) {
    return res.json('invalid request');
  }

  try {
    const book = await Book.findByPk(id);

    if (!book) return res.status(404).json('Not found');

    await book.destroy();
    return res.status(204).json();
  } catch (e) {
    console.log('🚀 ~ Error: ', e);
    return res.status(500).json('Server error');
  }
};

module.exports = {
  find,
  create,
  update,
  destroy,
};
