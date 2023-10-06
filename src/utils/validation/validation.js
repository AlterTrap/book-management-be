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

const userRegistrationSchema = z
  .object({
    username: z
      .string({ required_error: 'Username required' })
      .min(6, { message: 'Username not enough 6 letters' })
      .regex(/^[a-zA-Z0-9_-]+$/, { message: 'Username is Valid' }),
    password: z
      .string({ required_error: 'Password required' })
      .min(6, { message: 'Password not enough 6 letters' })
      .regex(/^[a-zA-Z0-9_-]+$/, { message: 'password is Valid' })
      .regex(new RegExp('.*[A-Z].*'), {
        message: 'Password require 1 upscale letter',
      }),
    passwordCfm: z
      .string({ required_error: 'Password confirm required' })
      .min(6, { message: 'Password confirm not enough 6 letters' })
      .regex(/^[a-zA-Z0-9_-]+$/, { message: 'password confirm is Valid' })
      .regex(new RegExp('.*[A-Z].*'), {
        message: 'Password confirm require 1 upscale letter',
      }),
  })
  .refine((data) => data.password === data.passwordCfm, {
    message: 'Password and Password Confirm do not match',
  });

const userLoginSchema = z.object({
  username: z
    .string({ required_error: 'Username required' })
    .min(6, { message: 'Username not enough 6 letters' })
    .regex(/^[a-zA-Z0-9_-]+$/, { message: 'Username is Valid' }),
  password: z
    .string({ required_error: 'Password required' })
    .min(6, { message: 'Password not enough 6 letters' })
    .regex(/^[a-zA-Z0-9_-]+$/, { message: 'password is Valid' })
    .regex(new RegExp('.*[A-Z].*'), {
      message: 'Password require 1 upscale letter',
    }),
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
