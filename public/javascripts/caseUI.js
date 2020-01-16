class Diagram {
  constructor(size) {
    this.canvas = document.createElement("canvas");
    this.canvas.width = size;
    this.canvas.height = size;
    this.size = size;
    this.bkgd = "white";
    this.color = "black";
    this.ctx = this.canvas.getContext("2d");
    this.ctx.fillStyle = this.bkgd;
    this.ctx.fillRect(0,0,size,size);
    this.ctx.fillStyle = this.color;
    this.ctx.strokeStyle = this.color;
    this.ctx.lineWidth = 1;
    this.symbols = [];
 }
 
  addSymbol(id) {
    if (this.symbols.includes(id)) return;
    this.symbols.push(id);
    this._drawSymbol(id);
  }
 
  deleteSymbol(id) {
    if (!this.symbols.includes(id)) return;
    this.symbols.splice(this.symbols.indexOf(id), 1);
    this._clear();
    this._redraw();
  }

  clearDiagram() {
    this.symbols = [];
    this._clear();
  }    

  _clear() {
    this.ctx.clearRect(0,0,this.size,this.size);
    this.ctx.fillStyle = this.bkgd;
    this.ctx.fillRect(0,0,this.size,this.size);
    this.ctx.fillStyle = this.color;
  }

  _redraw() {
    let s;
    for (s of this.symbols) this._drawSymbol(s);
  }

  _drawSymbol(id) {
    switch (id)  {
      case "A1": drawA1(this); break;
      case "A2": drawA2(this); break;
      case "A3": drawA3(this); break;
      case "A4": drawA4(this); break;
      case "B1": drawB1(this); break;
      case "B2": drawB2(this); break;
      case "B3": drawB3(this); break;
      case "B4": drawB4(this); break;
      case "C1": drawC1(this); break;
      case "C2": drawC2(this); break;
      case "C3": drawC3(this); break;
      case "C4": drawC4(this); break;
      case "D1": drawD1(this); break;
      case "D2": drawD2(this); break;
      case "D3": drawD3(this); break;
      case "D4": drawD4(this); break;
      case "E1": drawE1(this); break;
      case "E2": drawE2(this); break;
      case "E3": drawE3(this); break;
      case "E4": drawE4(this); break;
      case "F1": drawF1(this); break;
      case "F2": drawF2(this); break;
      case "F3": drawF3(this); break;
      case "F4": drawF4(this); break;
      default:
   }         
 }
}

function drawA1(d) {
  //Line vertical
  d.ctx.beginPath();
  d.ctx.moveTo(d.size/2, 0);
  d.ctx.lineTo(d.size/2, d.size);
  d.ctx.stroke();
}

function drawA2(d) {
  //Line horizontal
  d.ctx.beginPath();
  d.ctx.moveTo(0, d.size/2);
  d.ctx.lineTo(d.size, d.size/2);
  d.ctx.stroke();
}

function drawA3(d) {
  //Diagonal left
  d.ctx.beginPath();
  d.ctx.moveTo(0, 0);
  d.ctx.lineTo(d.size, d.size);
  d.ctx.stroke();
}

function drawA4(d) {
  //Diagonal right
  d.ctx.beginPath();
  d.ctx.moveTo(d.size, 0);
  d.ctx.lineTo(0, d.size);
  d.ctx.stroke();
}


function drawB1(d) {
  //Arc top left
  const r = d.size/2 - 6;
  d.ctx.beginPath();
  d.ctx.arc(d.size/2, d.size/2, r, 1*Math.PI, 1.5*Math.PI);
  d.ctx.stroke();
}

function drawB2(d) {
  //Arc top right
  const r = d.size/2 - 6;
  d.ctx.beginPath();
  d.ctx.arc(d.size/2, d.size/2, r, 1.5*Math.PI, 0);
  d.ctx.stroke();
}

function drawB3(d) {
  //Arc bottom left
  const r = d.size/2 - 6;
  d.ctx.beginPath();
  d.ctx.arc(d.size/2, d.size/2, r, 0.5*Math.PI, 1*Math.PI);
  d.ctx.stroke();
}
function drawB4(d) {
  //Arc bottom right
  const r = d.size/2 - 6;
  d.ctx.beginPath();
  d.ctx.arc(d.size/2, d.size/2, r, 0, 0.5*Math.PI);
  d.ctx.stroke();
}

function drawC1(d) {
  //Dot top left
  d.ctx.beginPath();
  d.ctx.arc(4,4, 2.5, 0, 2*Math.PI);
  d.ctx.fill();
}

function drawC2(d) {
  //Dot top right
  d.ctx.beginPath();
  d.ctx.arc(d.size-4,4, 2.5, 0, 2*Math.PI);
  d.ctx.fill();
}

function drawC3(d) {
  //Dot bottom right
  d.ctx.beginPath();
  d.ctx.arc(d.size-4,d.size-4, 2.5, 0, 2*Math.PI);
  d.ctx.fill();
}

function drawC4(d) {
  //Dot bottom left
  d.ctx.beginPath();
  d.ctx.arc(4,d.size-4, 2.5, 0, 2*Math.PI);
  d.ctx.fill();
}

function drawD1(d) {
  //Star small
  const r = 0.09*d.size;
  strokeStar(d.ctx, d.size/2, d.size/2, r, 8, 0.6)
}

function drawD2(d) {
//Star medium
const r = 0.16*d.size;
strokeStar(d.ctx, d.size/2, d.size/2, r, 8, 0.6)
}

function drawD3(d) {
//Star large
const r = 0.22*d.size;
strokeStar(d.ctx, d.size/2, d.size/2, r, 8, 0.6)
}

function drawD4(d) {
//Square
const a = d.size - 4;
d.ctx.beginPath();
d.ctx.moveTo(2, 2);
d.ctx.lineTo(a+2, 2);
d.ctx.lineTo(a+2, a+2);
d.ctx.lineTo(2, a+2);
d.ctx.closePath();
d.ctx.stroke();
}

function drawE1(d) {
  //Arrow up
  d.ctx.beginPath();
  d.ctx.moveTo(d.size/2, d.size/2-8);
  d.ctx.lineTo(d.size/2+6, d.size/2);
  d.ctx.lineTo(d.size/2-6, d.size/2);
  d.ctx.closePath();
  d.ctx.fill();
  d.ctx.lineWidth = 4;
  d.ctx.beginPath();
  d.ctx.moveTo(d.size/2, d.size/2);
  d.ctx.lineTo(d.size/2, d.size/2+8);
  d.ctx.stroke();
  d.ctx.lineWidth = 1;
}

function drawE2(d) {
//Arrow right
d.ctx.beginPath();
d.ctx.moveTo(d.size/2+8, d.size/2);
d.ctx.lineTo(d.size/2, d.size/2+6);
d.ctx.lineTo(d.size/2, d.size/2-6);
d.ctx.closePath();
d.ctx.fill();
d.ctx.lineWidth = 4;
d.ctx.beginPath();
d.ctx.moveTo(d.size/2, d.size/2);
d.ctx.lineTo(d.size/2-8, d.size/2);
d.ctx.stroke();
d.ctx.lineWidth = 1;
}

function drawE3(d) {
//Arrow down
d.ctx.beginPath();
d.ctx.moveTo(d.size/2, d.size/2+8);
d.ctx.lineTo(d.size/2-6, d.size/2);
d.ctx.lineTo(d.size/2+6, d.size/2);
d.ctx.closePath();
d.ctx.fill();
d.ctx.lineWidth = 4;
d.ctx.beginPath();
d.ctx.moveTo(d.size/2, d.size/2);
d.ctx.lineTo(d.size/2, d.size/2-8);
d.ctx.stroke();
d.ctx.lineWidth = 1;
}

function drawE4(d) {
//Arrow left
d.ctx.beginPath();
d.ctx.moveTo(d.size/2-8, d.size/2);
d.ctx.lineTo(d.size/2, d.size/2-6);
d.ctx.lineTo(d.size/2, d.size/2+6);
d.ctx.closePath();
d.ctx.fill();
d.ctx.lineWidth = 4;
d.ctx.beginPath();
d.ctx.moveTo(d.size/2, d.size/2);
d.ctx.lineTo(d.size/2+8, d.size/2);
d.ctx.stroke();
d.ctx.lineWidth = 1;
}

function drawF1(d) {
  //Circle top
  d.ctx.beginPath();
  d.ctx.arc(d.size/2,6, 3, 0, 2*Math.PI);
  d.ctx.stroke();
}

function drawF2(d) {
  //Circle bottom
  d.ctx.beginPath();
  d.ctx.arc(d.size/2,d.size-6, 3, 0, 2*Math.PI);
  d.ctx.stroke();
}

function drawF3(d) {
  //Circle left
  d.ctx.beginPath();
  d.ctx.arc(6,d.size/2, 3, 0, 2*Math.PI);
  d.ctx.stroke();
}

function drawF4(d) {
  //Circle right
  d.ctx.beginPath();
  d.ctx.arc(d.size-6,d.size/2, 3, 0, 2*Math.PI);
  d.ctx.stroke();
}

function strokeStar(ctx, x, y, r, n, inset) {
//Adaptable to any shape with rotational symmetry
//from https://stackoverflow.com/questions/25837158/how-to-draw-a-star-by-using-canvas-html5
ctx.save();
ctx.beginPath();
ctx.translate(x, y);
ctx.moveTo(0,0-r);
for (var i = 0; i < n; i++) {
    ctx.rotate(Math.PI / n);
    ctx.lineTo(0, 0 - (r*inset));
    ctx.rotate(Math.PI / n);
    ctx.lineTo(0, 0 - r);
}
ctx.closePath();
ctx.fill();
ctx.restore();
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
    }
  answer.clearDiagram();
}

function submitAnswer() {
  alert("Answer " + answer.symbols +" to be submitted");
  resetCase();
  getTestCase(5);
}

function decodePicture(hexPic) {
//return array of symbols for display in a diagram
    let categories = ["A","B","C","D","E","F"];
    let res = [];
  
    for (i = 0; i < categories.length; i++)  {
      let catName = categories[i];
      let numCat = parseInt(hexPic.charAt(i), 16);
      let shape1 =  (numCat & 8) >> 3;
      let shape2 =  (numCat & 4) >> 2;
      let shape3 =  (numCat & 2) >> 1;
      let shape4 =  (numCat & 1);
      if (shape1) res.push(catName+"1");  
      if (shape2) res.push(catName+"2");  
      if (shape3) res.push(catName+"3");  
      if (shape4) res.push(catName+"4");  
    } 
    return res;   
  }

function getTestCase(caseId) {
  axios.get("/testcase/new")
  .then(fromServer => {
    console.log("Received the case: " + JSON.stringify(fromServer.data));
    console.log("Type: " + typeof(fromServer.data.line1.arg1));
    // put data in the DOM
    decodePicture(fromServer.data.line1.arg1).forEach(e => testCase[0][0].addSymbol(e));
    decodePicture(fromServer.data.line1.arg2).forEach(e => testCase[0][1].addSymbol(e));
    decodePicture(fromServer.data.line1.result).forEach(e => testCase[0][2].addSymbol(e));
    decodePicture(fromServer.data.line2.arg1).forEach(e => testCase[1][0].addSymbol(e));
    decodePicture(fromServer.data.line2.arg2).forEach(e => testCase[1][1].addSymbol(e));
    decodePicture(fromServer.data.line2.result).forEach(e => testCase[1][2].addSymbol(e));
    decodePicture(fromServer.data.line3.arg1).forEach(e => testCase[2][0].addSymbol(e));
    decodePicture(fromServer.data.line3.arg2).forEach(e => testCase[2][1].addSymbol(e));
    //decodePicture(fromServer.data.line3.result).forEach(e => testCase[2][2].addSymbol(e));

//line1: {arg1: "100000", arg2: "200000", result: "300000"},  //hexadecimal strings of length 6
//line2: {arg1: "400000", arg2: "800000", result: "C00000"},
//line3: {arg1: "010000", arg2: "020000", result: "030000"},
    
  }).catch(err => {
      console.log("err => ", err);
  });
}



//Populate the menu
let categories = ["A","B","C","D","E","F"];
let diag;
for (c of categories) 
  for (let i = 0; i < 4; i++) {
      diag = new Diagram(48);
      diag.addSymbol(c + (i+1).toString());
      document.getElementById(c+(i+1).toString()).appendChild(diag.canvas);
  }

  //Populate the test case
let testCase = [[new Diagram(48), new Diagram(48), new Diagram(48)],
                [new Diagram(48), new Diagram(48), new Diagram(48)],
                [new Diagram(48), new Diagram(48), new Diagram(48)]];
let answer = testCase[2][2];
  for (let r = 0; r < 3; r++) 
    for (let c = 0; c < 3; c++) {
      document.getElementById("test-elem"+(r+1).toString()+(c+1).toString())
      .appendChild(testCase[r][c].canvas);
    }

    //Just testing....

/*
testCase[0][0].addSymbol("C1");
testCase[0][0].addSymbol("C2");
testCase[0][0].addSymbol("C4");
testCase[0][0].addSymbol("D1");

testCase[0][1].addSymbol("C1");
testCase[0][1].addSymbol("C2");
testCase[0][1].addSymbol("A3");

testCase[0][2].addSymbol("A3");
testCase[0][2].addSymbol("C4");

//-------------

testCase[1][0].addSymbol("C3");
testCase[1][0].addSymbol("C4");
testCase[1][0].addSymbol("A3");

testCase[1][1].addSymbol("C4");
testCase[1][1].addSymbol("A3");

testCase[1][2].addSymbol("D1");
testCase[1][2].addSymbol("C3");

//----------------

testCase[2][0].addSymbol("C1");
testCase[2][0].addSymbol("C2");
testCase[2][0].addSymbol("C3");
testCase[2][0].addSymbol("C4");
testCase[2][0].addSymbol("A3");

testCase[2][1].addSymbol("C1");
testCase[2][1].addSymbol("C3");
testCase[2][1].addSymbol("C4");
testCase[2][1].addSymbol("D1");

*/


