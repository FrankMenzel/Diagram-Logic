const symbolCategories = [
  {catName: "A", catDesc: "Lines"},
  {catName: "B", catDesc: "Arcs"},
  {catName: "C", catDesc: "Dots"},
  {catName: "D", catDesc: "Centric Shapes"},
  {catName: "E", catDesc: "Arrows"},
  {catName: "F", catDesc: "Circles"}    
];
      
const symbols = [
  {catName: "A", symName: "A1", symDesc: "Line Vertical"},
  {catName: "A", symName: "A2", symDesc: "Line Horizontal"},
  {catName: "A", symName: "A3", symDesc: "Diagonal Left"},
  {catName: "A", symName: "A4", symDesc: "Diagonal Right"},
  {catName: "B", symName: "B1", symDesc: "Arc Top Left"},
  {catName: "B", symName: "B2", symDesc: "Arc Top Right"},
  {catName: "B", symName: "B3", symDesc: "Arc Bottom Left"},
  {catName: "B", symName: "B4", symDesc: "Arc Bottom Right"},
  {catName: "C", symName: "C1", symDesc: "Dot Top Left"},
  {catName: "C", symName: "C2", symDesc: "Dot Top Right"},
  {catName: "C", symName: "C3", symDesc: "Dot Bottom Right"},
  {catName: "C", symName: "C4", symDesc: "Dot Bottom Left"},
  {catName: "D", symName: "D1", symDesc: "Star Small"},
  {catName: "D", symName: "D2", symDesc: "Star Medium"},
  {catName: "D", symName: "D3", symDesc: "Star Large"},
  {catName: "D", symName: "D4", symDesc: "Square"},
  {catName: "E", symName: "E1", symDesc: "Arrow Up"},
  {catName: "E", symName: "E2", symDesc: "Arrow Right"},
  {catName: "E", symName: "E3", symDesc: "Arrow Down"},
  {catName: "E", symName: "E4", symDesc: "Arrow Left"},
  {catName: "F", symName: "F1", symDesc: "Circle Top"},
  {catName: "F", symName: "F2", symDesc: "Circle Bottom"},
  {catName: "F", symName: "F3", symDesc: "Circle Left"},
  {catName: "F", symName: "F4", symDesc: "Circle Right"}
];

const operations = [
  {opName: "AND",  opDesc: "Intersect of"},
  {opName: "NAND", opDesc: "Negative intersect of"},
  {opName: "OR",   opDesc: "Union of"},
  {opName: "NOR",  opDesc: "Negative union of"},
  {opName: "XOR",  opDesc: "Exclusive union of"},
  {opName: "CW",   opDesc: "Clockwise rotation of"},
  {opName: "CCW",  opDesc: "Counter-clockwise rotation of"}
]; 


//Exclude certain symbol combinations!!!!!
//Exclude certain category combinations!!!!!
//Exclude certain category-operation combinations!!!!!

const symbolRestrictions = [
  {oneOf: ["D1","D2","D3"]},
  {oneOf: ["E1","E2","E3, E4"]},
  {oneOf: ["D1","E1","E2","E3, E4"]},
  {oneOf: ["D2","E1","E2","E3, E4"]},
  {oneOf: ["D3","E1","E2","E3, E4"]}
];

/* Generate TestComponent

catName = choose 1 randomly 
opName = choose 1 randomly
arg1   = choose N symbols from the selected category. Check restrictions!
arg2   = choose M symbols from the selected category. Check restrictions!
result = calculate
*/

testComponent = {
  catName: String,     //symbol category name 
  opName: String,      //operation name
  arg1: [],    //array of Symbol of one category
  arg2: [],    //array of Symbol of one category
  result: []   //array of Symbol of one category
};

let cat = symbolCategories[Math.floor(Math.random() * symbolCategories.length)].catName;
let op = operations[Math.floor(Math.random() * operations.length)].opName;
let symCount = Math.floor(Math.random() * 4);
let arg1 = selectShapesfromCategory(cat, symCount);   
let symCount = Math.floor(Math.random() * 4);
let arg2 = selectShapesfromCategory(cat, symCount);
//check restrictions
let result = calculateResult(arg1, arg2, op);   //rule logic here


/* Generate TestLine

categories = choose K categories randomly
components = select K components
lineArg1 = sum of component arg1
lineArg2 = sum of component arg2
lineResult = sum of component results
*/

/* Generate TestCase

Select 3 TestLines for the same categories

Generate Test

*/