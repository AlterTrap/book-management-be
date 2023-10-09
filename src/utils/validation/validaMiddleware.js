const { ZodError } = require('zod');
const { userRegistrationSchema, userLoginSchema } = require('./validation');

const validateUserRegistration = async (req, res, next) => {
  const { username, password, passwordCfm } = req.body;
  try {
    await userRegistrationSchema.parse({ username, password, passwordCfm });
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      const validationErrors = error.issues.map((issue) => issue.message);
      return res.status(400).json(validationErrors);
    }
  }
};

const validateUserLogin = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    await userLoginSchema.parse({ username, password });
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      const validationErrors = error.issues.map((issue) => issue.message);
      return res.status(400).json(validationErrors);
    }
  }
};

module.exports = { validateUserRegistration, validateUserLogin };
