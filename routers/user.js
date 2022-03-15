const express = require("express");
const router = express.Router();
const {
  index,
  imageOfChallenge,
  getInfoTournament,
  getInfoTournamentWithId,
  getMatchOfRound,
  challengeInfo,
  submitChallenge,
  findSolve
} = require("../controllers/main");
router.route("/").get(index);
router.post("/image", imageOfChallenge);
router
  .route("/tournament")
  .get(getInfoTournament)
  .post(getInfoTournamentWithId);
router.post("/match", getMatchOfRound);
router.post("/challenge", challengeInfo);
router.post("/submit/challenge",submitChallenge);
router.post("/solver", findSolve)
module.exports = router;
