const isNotEmpty = (val) => {
  if (val === undefined || !val || val.trim() === '') return false;
  return true;
};

const isEmpty = (val) => {
  if (!val || !val.length) return true;
};

const isValidID = (val) => {
  if (!val || isNaN(val)) return true;
};

const isValidDate = (val) => {
  const myDate = new Date(val);
  if (!isNaN(myDate.getTime())) return true;
};

module.exports = {
  isNotEmpty,
  isEmpty,
  isValidID,
  isValidDate,
};
