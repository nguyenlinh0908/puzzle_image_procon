const axios = require("axios");
const https = require("https");
const { PythonShell } = require("python-shell");
const instance = axios.create({
  baseURL: "http://112.137.129.202:8004",
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
  const { id, shape, size } = req.body;
  instance.get(`/challenge/image/${id}`).then((response) => {
    const images = response.data;
    // findSolve(images, shape, size);
    res.status(200).json({ images: images });
  });
};
const findSolve = (images, shape, size) => {
  const options = {
    mode: "json",
    pythonPath: "/usr/bin/python3.8",
    pythonOptions: ["-u"],
    // make sure you use an absolute path for scriptPath
    scriptPath: "/home/nguyenling/procon/puzzle_man/image_puzzle/",
    args: [JSON.stringify(images), JSON.stringify(shape), JSON.stringify(size)],
  };
  PythonShell.run("main.py", options, function (err, results) {
    if (err) throw err;
    // results is an array consisting of messages collected during execution
    console.log(results);
  });
};
const submitChallenge = (req, res) => {
  const { id, moves } = req.body;
  // axios
  //   .post(`http://112.137.129.202:8004/solution/submit/${id}`, moves, {
  //     headers: {
  //       Authorization: "Bearer " + process.env.TOKEN,
  //       "Content-Type": "text/plain",
  //     },
  //   })
  //   .then((response) => {
  //     console.log(response);
  //     res.status(200).json({ status: response.data });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
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
  submitChallenge,
};
