var express = require('express');
const {
  scoreDtoValidator,
  addScoreDTO,
  updatedScoreDTO,
  deletedScoreDTO,
} = require('../../validators/score.validator');
const Score = require('./score.model');
const {
  getScores,
  addScore,
  updateScore,
  deleteScore,
} = require('./score.service');
var router = express.Router();

/* GET home page. */
router.get('/:gameId', async (req, res, next) => {
  const { gameId } = req.params;

  try {
    const scores = await getScores(gameId);
    res.json({ data: scores });
  } catch (error) {
    next(err);
  }
});

router.post('/', scoreDtoValidator(addScoreDTO), async (req, res, next) => {
  const { gameId, userId, score } = req.body;
  try {
    const saveScore = await addScore({ gameId, userId, score });
    res.json({ data: saveScore });
  } catch (err) {
    next(err);
  }
});

router.put(
  '/:gameId',
  scoreDtoValidator(updatedScoreDTO),
  async (req, res, next) => {
    const { gameId } = req.params;
    const { userId, score } = req.body;

    try {
      const updatedScore = await updateScore({ gameId, userId, score });
      if (updatedScore === null) {
        return res.status(404).json({ error: 'Score not found' });
      }
      res.json({ data: updatedScore });
      console.log(res, 'update');
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  '/:gameId',
  scoreDtoValidator(deletedScoreDTO),
  async (req, res, next) => {
    const { gameId } = req.params;
    const { userId } = req.body;
    try {
      const deletedScore = await deleteScore({ gameId, userId });
      if (deletedScore === null) {
        return res.status(404).json({ error: 'Score not found' });
      }
      res.json({ message: deletedScore });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
