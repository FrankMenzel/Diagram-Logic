function generateComponents() {
  console.log("generateComponents was clicked");
  axios.get("/components")
    .then(fromServer => {

      document.getElementById("answer").innerHTML = fromServer.data;
    }).catch(err => {
      console.log("err => ", err);
    });
}

function generateCases() {
  console.log("generateCases was clicked");
  x = document.getElementById("compNumber").value;
  axios.get("/cases/" + x)
    .then(fromServer => {
      document.getElementById("casesAnswer").innerHTML = fromServer.data;
      setTimeout(function () { location.reload() }, 3000);
    }).catch(err => {
      console.log("err => ", err);
    });
}

function generateTests() {
  console.log("generate Tests was clicked");
  axios.get("/tests")
    .then(fromServer => {
      document.getElementById("testsAnswer").innerHTML = fromServer.data;
    }).catch(err => {
      console.log("err => ", err);
    });
}

