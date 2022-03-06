// const { size } = require("lodash");

$(document).ready((e) => {
  tournament();
  getMatches();
  submitChallenge();
});
const tournament = () => {
  fetch("/tournament")
    .then((res) => res.json())
    .then((res) => {
      const data = res.tournament[0];
      $("h5.card-title").html(`${data.name}`);
      tournamentWithID(data.id);
    });
};
const tournamentWithID = (idTournament) => {
  fetch("/tournament", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: idTournament }),
  })
    .then((res) => res.json())
    .then((res) => {
      const currentRound = res.tournament["Rounds"][0];
      const roundGroup = $("ul.list-group-flush");
      roundGroup
        .children("li:first")
        .html(`<b>Round: </b>${currentRound["name"]}`);
      $(".card-body")
        .children("button.btn-primary")
        .attr("data-round", currentRound["id"]);
    });
};
const matchOfRound = (idRound) => {
  fetch("/match", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: idRound }),
  })
    .then((res) => res.json())
    .then((res) => {
      const matches = res["Matches"];
      const roundGroup = $("ul.list-group-flush");
      matches.forEach((match) => {
        roundGroup.append(
          `<li class="list-group-item"><b>Match: </b><span class="inline-block">${match["name"]}</span> <button class="btn btn-info" data-match="${match["id_challenge"]}">Go</button></li>`
        );
      });
      challenges();
    });
};
function getMatches() {
  const matchButton = $(".card-body").children("button.btn-primary");
  matchButton.on("click", (e) => {
    e.preventDefault;
    const btnMatch = e.currentTarget;
    const roundID = $(btnMatch).data("round");
    matchOfRound(roundID);
  });
}
function challenges() {
  $("button.btn-info").on("click", (e) => {
    e.preventDefault;
    const currentButton = e.currentTarget;
    const challengeID = $(currentButton).data("match");
    challengesInfo(challengeID);
  });
}
const challengesInfo = (challengeID) => {
  fetch("/challenge", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: challengeID }),
  })
    .then((res) => res.json())
    .then((res) => {
      const challenge = res.challenge;
      const challengeArr = challenge.split("\n");
      const piecesGroup = challengeArr[1].split(" ");
      const stepGroup = challengeArr[2].split(" ");
      const pickAndSwapGroup = challengeArr[3].split(" ");
      const sizeGroupGroup = challengeArr[4].split(" ");
      const pixelSize = challengeArr[5];
      $(".btn-outline-success").attr("data-value", challengeID);
      let shape = { row: piecesGroup[1], col: piecesGroup[2] };
      let size = { height: sizeGroupGroup[1], width: sizeGroupGroup[2] };
      imagesOfChallenge(challengeID, shape, size);

      $("#rowNum").val(piecesGroup[1]);
      $("#colNum").val(piecesGroup[2]);

      $("#stepNum").val(stepGroup[1]);

      $("#pickVal").val(pickAndSwapGroup[1]);
      $("#swapVal").val(pickAndSwapGroup[2]);
      $("#widthVal").val(sizeGroupGroup[0]);
      $("#heightVal").val(sizeGroupGroup[1]);
      $("#pixelVal").val(pixelSize);
      let imageGridContent = imageGrid(piecesGroup[1], piecesGroup[2]);
      $(".image-group").html(imageGridContent);
    });
};
const imagesOfChallenge = (challengeID, shape, size) => {
  $(".btn-outline-success").on("click", (e) => {
    e.preventDefault();
    fetch("/image", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: challengeID, shape: shape, size: size }),
    })
      .then((res) => res.json())
      .then((res) => {
        const imagesGroup = $("img.piece");
        const images = res.images;
        for (let i = 0; i < imagesGroup.length; ++i) {
          $(imagesGroup[i]).attr("src", `data:image/png;base64, ${images[i]}`);
        }
      });
  });
};
const submitChallenge = () => {
  $("#submitMoves").on("click", (e) => {
    e.preventDefault();
    console.log("clicked");
    fetch("/submit/challenge", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      });
  });
};
function imageGrid(row, col) {
  let rows = parseInt(row);
  let cols = parseInt(col);
  let content = "";
  for (let i = 0; i < rows; ++i) {
    content += '<div class="row pb-3">';
    for (let j = 0; j < cols; ++j) {
      content +=
        '<div class="col"><img class="w-100 piece" src="/public/robot.jpg" alt="piece"></div>';
    }
    content += "</div>";
  }
  return content;
}
