const scoreRouter = require('./scores/score.route');

module.exports = (app) => {
  app.use('/score', scoreRouter);
};
