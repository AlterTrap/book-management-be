const isNotEmpty = (val) => {
  if (val === undefined || !val || val.trim() === '') return false;
  return true;
};

const isArrayEmpty = (val) => {
  if (!val || !val.length) return true;
};

const isValidID = (val) => {
  if (isNaN(val)) return false;
  return true;
};

const isValidDate = (val) => {
  const myDate = new Date(val);
  if (!isNaN(myDate.getTime())) return true;
};

module.exports = {
  isNotEmpty,
  isArrayEmpty,
  isValidID,
  isValidDate,
};
