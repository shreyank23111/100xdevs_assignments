const fs = require("fs");
const path = "./writeMe.js"

const dummyData = "I can code in JavaScript, Python, i know react, react-native, node and express"

fs.writeFile(path, dummyData, "utf8", ((err)=>{
  if(err){
    console.log("A error occured while writing the file");
    return;
  }      
}))

//Showing data written to writeMe.js
fs.readFile(path,"utf8", ((err, data)=>{
  if(err){
    console.log("Data cannot be due to some error: ",err);
  }
  else{
    // eval(data);  execute manner
    console.log("Data from the file is: \n", data)
  }
}))