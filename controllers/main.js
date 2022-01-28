const axios = require("axios");
const https = require("https");
const instance = axios.create({
  baseURL: "https://procon2021.duckdns.org/procon2021/",
  headers: { Authorization: "Bearer " + process.env.TOKEN },
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});
const index = (req, res) => {
  res.render("index");
};
const getInfoTournamentWithId = (req, res) => {
  const { id } = req.body;
  instance.get(`/tournament/${id}`).then((response) => {
    res.status(200).json({ tournament: response.data });
  });
};
const getInfoTournament = (req, res) => {
  instance.get(`/tournament`).then((response) => {
    res.status(200).json({ tournament: response.data });
  });
};
const getMatchOfRound = (req, res) => {
  const { id } = req.body;
  instance.get(`/round/${id}`).then((response) => {
    res.status(200).json(response.data);
  });
};
const imageOfChallenge = (req, res) => {
  const { id } = req.body;
  instance.get(`/challenge/image/${id}`).then((response) => {
    res.status(200).json({ images: response.data });
  });
};
const challengeInfo = (req, res) => {
  const { id } = req.body;
  instance.get(`/challenge/raw/${id}`).then((response) => {
    res.status(200).json({ challenge: response.data });
  });
};
module.exports = {
  index,
  imageOfChallenge,
  getInfoTournament,
  getInfoTournamentWithId,
  getMatchOfRound,
  challengeInfo,
};
