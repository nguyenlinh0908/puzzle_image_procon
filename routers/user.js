const express = require("express");
const router = express.Router();
const {
  index,
  imageOfChallenge,
  getInfoTournament,
  getInfoTournamentWithId,
  getMatchOfRound,
  challengeInfo,
} = require("../controllers/main");
router.route("/").get(index);
router.post("/image", imageOfChallenge);
router
  .route("/tournament")
  .get(getInfoTournament)
  .post(getInfoTournamentWithId);
router.post("/match", getMatchOfRound);
router.post("/challenge", challengeInfo);
module.exports = router;
