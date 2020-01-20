const mongoose = require('mongoose');
const TestCase = require('../models/testCases');
const TestComponent = require('../models/testComponents');

const dbName = 'diagram-logic';
mongoose.connect(`mongodb://localhost/${dbName}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


//=====================================================

const numOfCycles = 1;  //number of generator cycles (INPUT), 1 cycle = test 1 case
const numOfComponents = 4;   //number of test components per case (INPUT)

const testCase = {   
  catOps: [{catName: "", opName: ""}],    
  complexity: "",
  line1: {arg1: "", arg2: "", result: ""}, //hexadecimal strings of length 6
  line2: {arg1: "", arg2: "", result: ""},
  line3: {arg1: "", arg2: "", result: ""}
};

let countCases = 0; 

const categories = [
  {name: "A", desc: "Line"},
  {name: "B", desc: "Arc"},
  {name: "C", desc: "Dot"},
  {name: "D", desc: "Centric"},
  {name: "E", desc: "Arrow"},
  {name: "F", desc: "Circle"}    
];
      
const operations = [
  {name: "AND",  desc: "Intersect of"},
  {name: "NAND", desc: "Negative intersect of"},
  {name: "OR",   desc: "Union of"},
  {name: "NOR",  desc: "Negative union of"},
  {name: "XOR",  desc: "Exclusive union of"},
  //{name: "CW",   desc: "Clockwise rotation of"},
  //{name: "CCW",  desc: "Counter-clockwise rotation of"}
]; 

console.log("*********************************************************************");

//select categories
let selectedCats = [];
while (selectedCats.length < numOfComponents) {
  n = Math.floor(Math.random() * categories.length);
  cat = categories[n].name;
  if (selectedCats.includes(cat)) continue;
  selectedCats.push(cat);
}
console.log("categories selected: " + selectedCats);
//Retrieve all components

const allComponents = [];

TestComponent.find()
.then(docs => {
    mongoose.connection.close();
    createTestCases(docs);
});   

function createTestCases(comps) {
  let numOfComponentsFromDB = comps.length;
  let selectedComps = [];
  console.log("Number of components: " + numOfComponentsFromDB);  
  for (i = 0; i < selectedCats.length; i++) {
    let cat = selectedCats[i];
    let compsWithCategory = [];
    comps.reduce((acc, e) => {
      if (e.catName === cat) compsWithCategory.push(e);
    }, 0);
    //console.log("Components with category: " + cat)
    console.log ("Components with category " + cat + ": " + compsWithCategory.length);
    
    let n = Math.floor(Math.random() * compsWithCategory.length);
    selectedComps.push(compsWithCategory[n]);
        
  }

  console.log("Selected Components: ")
  for (c of selectedComps) console.log ("Category: " + c.catName + " ID: " + c._id );

  //combine cases in one testCase object


  //and then send it to the DB


}





/*
for (cat of selectedCats) {
  console.log("category: " + cat);
  TestComponent.countDocuments({catName:cat})
  .then(docCount => {
    //console.log("Number of components for cat: " + cat + " is " + docCount);

      TestComponent.find({catName:cat}).limit(1).skip(Math.floor(Math.random() * docCount))
      .then(doc => {
        console.log("component: " + doc[0]._id + " catName: " + doc[0].catName);
      
      mongoose.connection.close();
    });   
  })
}
*/

/*

for (let i = 0; i < numOfCycles; i++) {
  for (let k = 0; k < numOfComponents; k++) {
 
    TestCase.create(testCase, (err) => {
      if (err) { throw (err) }
      //console.log(`Created ${testcases.length} testcases`)
      mongoose.connection.close();
    });    


        
        //Write to the DB
        
        TestCase.create(testCase, (err) => {
          if (err) { throw (err) }
          //console.log(`Created ${testcases.length} testcases`)
          mongoose.connection.close();
        });
        
      
   

  }  //end of component processing
}  //end of cycle

console.log("Generated: " + countCases + " test cases");

//Functions

function validate(catname, opResults) {
  let uniqueRes = opResults.map((e,i,a) => {
    return (a.indexOf(e) === a.lastIndexOf(e)) ? e : -1;
  });
  let valid = uniqueRes.map((e,i,a) => {
    return (["NAND","NOR"].includes(operations[i].name) && ["D","E"].includes(catname)) ? -1 : e;
  });
  return valid;
}

function removeDuplicates(arr) {
  return arr.map((e,i,a) => {
    return (a.indexOf(e) === a.lastIndexOf(e)) ? e : -1;
  });
}

function bitwise(op, arg1, arg2) {
  switch (op) {
    case "AND": return arg1 & arg2;
    case "NAND": return (~(arg1 & arg2)) & 15;
    case "OR": return arg1 | arg2;
    case "NOR": return (~(arg1 | arg2)) & 15;
    case "XOR": return arg1 ^ arg2;
    default: return 0;
  }

}

*/