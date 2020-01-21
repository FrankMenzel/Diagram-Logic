let categories = ["A","B","C","D","E","F"];
let diag;
let currentCase = -1;
let currentCaseId = "none";
let numOfCases = document.getElementById("num-cases").innerHTML;
let testName = document.getElementById("test-name").innerHTML;
let complexity = document.getElementById("complexity").innerHTML;
let testCase = [];
let answer = {};
let caseStartTime = 0;
let testTime = 0;
let timeLimit = 60 * 1000;  //per case
let animTime = 2 * 1000; //between cases
let caseTimer = 0;
let loadTimer = 0;
let currentScore = 0;

document.getElementById("current-case").innerHTML = "Case: none / " + numOfCases;

//Populate the menu

for (c of categories) 
  for (let i = 0; i < 4; i++) {
      diag = new Diagram(48);
      diag.addSymbol(c + (i+1).toString());
      document.getElementById(c+(i+1).toString()).appendChild(diag.canvas);
  }

//Populate the test case
testCase = [    [new Diagram(48), new Diagram(48), new Diagram(48)],
                [new Diagram(48), new Diagram(48), new Diagram(48)],
                [new Diagram(48), new Diagram(48), new Diagram(48)]];
answer = testCase[2][2];
  for (let r = 0; r < 3; r++) 
    for (let c = 0; c < 3; c++) {
      document.getElementById("test-elem"+(r+1).toString()+(c+1).toString())
      .appendChild(testCase[r][c].canvas);
    }

function selectShape(shape) {
  
  if (answer.symbols.includes(shape)) {
    document.getElementById(shape).style.borderColor = "green";
    answer.deleteSymbol(shape);
  }     
  else {
    document.getElementById(shape).style.borderColor = "orange";
    answer.addSymbol(shape);
  }
}

function resetCase() {
  for (c of categories) 
    for (let i = 0; i < 4; i++) {
      document.getElementById(c+(i+1).toString()).style.borderColor = "green";
    };
  answer.clearDiagram();
}


function loadNextCase() {

  document.getElementById("loader-icon").style.visibility="hidden";
  document.getElementById("loader-icon").style.zIndex = "0";
  document.getElementById("test-container").style.zIndex = "1";  

  //document.getElementById("test-container").style.display = "flex";
  if (currentCase === -1) {   //First case to be loaded
    document.getElementById("nextcase-btn").style.borderColor = "green";
    document.getElementById("nextcase-btn").style.color = "black";
    document.getElementById("nextcase-btn").innerHTML = "<h3>Next Case</h3";
  }
  else {
    scoreTestCase(currentCaseId, currentCase, encodePicture(answer.symbols));
  };

  resetCase();
  currentCase = currentCase + 1;

  if (currentCase >= numOfCases) {  //It was the last test case
    finishTest();
  }
  else {  
    currentCaseId = document.getElementById("case" + currentCase).innerHTML;
    document.getElementById("current-case").innerHTML = "Case: " + (currentCase + 1) + " / " + numOfCases;
    getTestCase(currentCaseId);  //Promise inside!
  };
  
}

function finishTest() {
const testResult = { 
  userName: "",
  testName: testName,
  complexity: complexity,
  elapsedTime: (testTime/1000).toFixed(1),
  numberOfCases: numOfCases,
  score: currentScore
}

  clearTimeout(caseTimer);
  clearTimeout(loadTimer); 
  //alert ("Test finished! Time elapsed: " + (testTime/1000).toFixed(1) + " seconds" );

  //Send result to the server
  axios.post("/test/storeResult", testResult) 
  .then(fromServer => {  
    console.log("Result stored. Response from server: " + fromServer.data);
  }).catch(err => {
      console.log("Error while storing the test result: ", err);
  });

  location.assign("/results");
  //location.assign("http://localhost:3000/results");
  //location.reload(true); 
  //location.reload(); 
}

function caseTimeout() {
  nextCase();
}

function nextCase() {
  clearTimeout(caseTimer);
  clearTimeout(loadTimer);  
  if (currentCase === -1) {
    loadNextCase();
  }
  else if (currentCase === numOfCases - 1) {
    testTime = testTime + (new Date()).getTime() - caseStartTime;
    loadNextCase();
  }
  else {
    testTime = testTime + (new Date()).getTime() - caseStartTime;
    document.getElementById("loader-icon").style.visibility="visible";
    document.getElementById("loader-icon").style.zIndex = "1";
    document.getElementById("test-container").style.zIndex = "0";  

    loadTimer = setTimeout(loadNextCase, animTime); //Loading animation between cases
  }
}

function getTestCase(caseId) {
  axios.get("/testcase/new/" + caseId) 
  .then(fromServer => {
    clearTestCase();
    //console.log("Received the case: " + JSON.stringify(fromServer.data));

    decodePicture(fromServer.data.line1.arg1).forEach(e => testCase[0][0].addSymbol(e));
    decodePicture(fromServer.data.line1.arg2).forEach(e => testCase[0][1].addSymbol(e));
    decodePicture(fromServer.data.line1.result).forEach(e => testCase[0][2].addSymbol(e));
    decodePicture(fromServer.data.line2.arg1).forEach(e => testCase[1][0].addSymbol(e));
    decodePicture(fromServer.data.line2.arg2).forEach(e => testCase[1][1].addSymbol(e));
    decodePicture(fromServer.data.line2.result).forEach(e => testCase[1][2].addSymbol(e));
    decodePicture(fromServer.data.line3.arg1).forEach(e => testCase[2][0].addSymbol(e));
    decodePicture(fromServer.data.line3.arg2).forEach(e => testCase[2][1].addSymbol(e));
    
    //SETTIMEOUT
    //DO NOT SEND THE ANSWER TO THE BROWSER!!!!!
    //decodePicture(fromServer.data.line3.result).forEach(e => testCase[2][2].addSymbol(e));
   
    caseStartTime = (new Date()).getTime();   
    caseTimer = setTimeout(caseTimeout, timeLimit);

  }).catch(err => {
      console.log("err => ", err);
  });
}

function scoreTestCase(caseId, current, userAnswer) {
  axios.get("/testcase/score/" + caseId + "/" + userAnswer) 
  .then(fromServer => {  //should be true or false
    clearTestCase();
    //console.log("Received the evaluation: " + JSON.stringify(fromServer.data) + " Type " + typeof(fromServer.data));
    document.getElementById("result" + current).innerHTML = "  Result: " + fromServer.data;
    if (fromServer.data) currentScore = currentScore + 1;
    return fromServer.data;
  }).catch(err => {
      console.log("err => ", err);
  });
}

function clearTestCase() {
  for (let i = 0; i < 3; i++)
    for (let j = 0; j < 3; j++)
      testCase[i][j].clearDiagram();
}









