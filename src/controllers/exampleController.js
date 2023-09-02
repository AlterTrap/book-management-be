const { Example } = require('../models/example');

const find = async (req, res) => {
  const examples = await Example.findAll();

  if (!examples || !examples.length) {
    return res.json('There are no example');
  }

  const name = examples.map((e) => e.name).join(', ');

  return res.json(`List example: ${name}`);
};

const create = async (req, res) => {
  const { name } = req.body;

  if (!name || name.trim() === '') return res.json('Invalid name');

  const example = await Example.create({
    name,
  });

  return res.json(example);
};

module.exports = {
  find,
  create,
};
