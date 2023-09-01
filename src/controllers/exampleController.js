const getExamples = (req, res) => {
  if (req.query.name) {
    res.json(`Hello world, Mr.${req.query.name}`);
  } else {
    res.json("Hello world");
  }
};

module.exports = {
  getExamples,
};
