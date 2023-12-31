const { z } = require('zod');

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
  if (val !== undefined && val.replace(/\s/g, '').length >= 6) {
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

const usernameRegex = /^[a-zA-Z0-9]{6,}$/;
const passwordRegex = /^(?=.*[A-Z])[a-zA-Z0-9]{6,}$/;

const userRegistrationSchema = z
  .object({
    username: z.string(),
    password: z.string(),
    passwordCfm: z.string(),
  })
  .refine((data) => data.password === data.passwordCfm, {
    message: 'Password and Password Confirm do not match',
  })
  .refine((data) => usernameRegex.test(data.username), {
    message:
      'Username must have at least 6 characters and without special character',
    path: ['username'],
  })
  .refine((data) => passwordRegex.test(data.password), {
    message:
      'Password must be at least 6 characters, contain at least 1 uppercase letter and no special characters',
    path: ['password'],
  })
  .refine((data) => data.password === data.passwordCfm, {
    message: 'Password and Password Confirm do not match',
    path: ['undefined'],
  })
  .refine((data) => usernameRegex.test(data.username), {
    message:
      'Username must have at least 6 characters and without special character',
    path: ['username'],
  })
  .refine((data) => passwordRegex.test(data.passwordCfm), {
    message:
      'Password confirm must be at least 6 characters, contain at least 1 uppercase letter and no special characters',
    path: ['passwordCfm'],
  });

const userLoginSchema = z
  .object({
    username: z.string(),
    password: z.string(),
  })
  .refine((data) => usernameRegex.test(data.username), {
    message:
      'Username must have at least 6 characters and without special character',
    path: ['username'],
  })
  .refine((data) => passwordRegex.test(data.password), {
    message:
      'Password must be at least 6 characters, contain at least 1 uppercase letter and no special characters',
    path: ['password'],
  });

module.exports = {
  isNotEmpty,
  isArrayEmpty,
  isValidID,
  isValidDate,
  isEnoughLength,
  isOneUpscalePass,
  userRegistrationSchema,
  userLoginSchema,
};
