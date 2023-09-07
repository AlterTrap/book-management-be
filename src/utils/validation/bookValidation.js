const nameNotEmpty = (val) => {
  if (!val || val.trim() === '') return true;
};

const isNotFind = (val) => {
  if (!books || !books.length) return true;
};

const cateNotEmpty = (val) => {
  if (category.trim() === '' || category === undefined) return true;
};

const validID = (val) => {
  if (!id || isNaN(id)) return true;
};

module.exports = { nameNotEmpty, isNotFind, cateNotEmpty, validID };
