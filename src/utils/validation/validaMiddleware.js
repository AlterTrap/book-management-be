const { ZodError } = require('zod');
const { userRegistrationSchema, userLoginSchema } = require('./validation');

const parseError = (error) => {
  const validationErrors = {};

  if (error instanceof ZodError) {
    error.issues.forEach((issue) => {
      const field = issue.path.join('.');
      const errorMessage = issue.message;
      validationErrors[field] = errorMessage;
    });
  } else {
    return res.status(500).json({ msg: 'Server Error' });
  }

  return validationErrors;
};

const validateUserRegistration = async (req, res, next) => {
  const { username, password, passwordCfm } = req.body;

  try {
    await userRegistrationSchema.parse({ username, password, passwordCfm });
    next();
  } catch (error) {
    const validationErrors = parseError(error);
    return res.status(400).json(validationErrors);
  }
};

const validateUserLogin = async (req, res, next) => {
  const { username, password } = req.body;
  const validationErrors = {};

  try {
    await userLoginSchema.parse({ username, password });
    next();
  } catch (error) {
    const validationErrors = parseError(error);
    return res.status(400).json(validationErrors);
  }
};

module.exports = { validateUserRegistration, validateUserLogin };
