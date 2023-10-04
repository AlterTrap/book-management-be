const isNotEmpty = (val) => {
  if (val === undefined || !val || val.trim() === '') return false;
  return true;
};

const isArrayEmpty = (val) => {
  if (!val || !val.length) return true;
};

const isValidID = (val) => {
  return !isNaN(val);
};

const isValidDate = (val) => {
  const myDate = new Date(val);
  if (!isNaN(myDate.getTime())) return true;
};

const isEnoughLength = (val) => {
  // Check length in Username, Password and Password Comfirm
  if (val !== undefined && val.length >= 6) {
    return true;
  }
  return false;
};

const isOneUpscalePass = (val) => {
  // Check if there is a uppscale letter in password
  if (val !== undefined && val.search(/[A-Z]/) < 0) {
    return true;
  }
  return false;
};

module.exports = {
  isNotEmpty,
  isArrayEmpty,
  isValidID,
  isValidDate,
  isEnoughLength,
  isOneUpscalePass,
};
