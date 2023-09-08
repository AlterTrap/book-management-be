const isNameNotEmpty = (val) => {
  if (!val || val.trim() === '') return false;
  return true;
};

const isNotFind = (val) => {
  if (!val || !val.length) return true;
};

const isCateNotEmpty = (val) => {
  if (!val || val.trim() === '') return false;
  return true;
};

const isValidID = (val) => {
  if (!val || isNaN(val)) return true;
};

const isValidDate = (val) => {
  const myDate = new Date(val);
  if (!isNaN(myDate.getTime())) return true;
};

module.exports = {
  isNameNotEmpty,
  isNotFind,
  isCateNotEmpty,
  isValidID,
  isValidDate,
};
