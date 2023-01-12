const joi = require('joi');
const createHttpError = require('http-errors');

const addScoreDTO = joi.object().keys({
  gameId: joi.string().required(),
  userId: joi.string().required(),
  score: joi.number().required(),
});

const deletedScoreDTO = joi.object().keys({
  userId: joi.string().required(),
});

const updatedScoreDTO = joi.object().keys({
  userId: joi.string().required(),
  score: joi.number().required(),
});

const scoreDtoValidator = (validator) => {
  return async function (req, res, next) {
    try {
      const validatedBody = await validator.validateAsync(req.body);
      req.body = validatedBody;
      next();
    } catch (err) {
      if (err.isJoi) {
        return next(createHttpError(422, { message: err.message }));
      }

      next(createHttpError(500));
    }
  };
};

module.exports = {
  addScoreDTO,
  updatedScoreDTO,
  deletedScoreDTO,
  scoreDtoValidator,
};
