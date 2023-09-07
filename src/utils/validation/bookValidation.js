const nameNotEmpty = (val) => {
  if (!val || val.trim() === '') return false;
  return true;
};

const isNotFind = (val) => {
  if (!val || !val.length) return true;
};

const cateNotEmpty = (val) => {
  if (!val || val.trim() === '') return false;
  return true;
};

const validID = (val) => {
  if (!val || isNaN(val)) return true;
};

module.exports = { nameNotEmpty, isNotFind, cateNotEmpty, validID };
