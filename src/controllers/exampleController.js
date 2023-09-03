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

  return res.status(201).json(example);
};

const update = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.json('invalid request');
  }

  const example = await Example.findByPk(id);

  if (!example) return res.status(404).json('Not found');

  const { name } = req.body;

  if (!name || name.trim() === '')
    return res.status(422).json('Name cannot be empty');

  example.name = name;
  await example.save();

  return res.json(example);
};

const destroy = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.json('invalid request');
  }

  try {
    const example = await Example.findByPk(id);

    if (!example) return res.status(404).json('Not found');

    await example.destroy();
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
