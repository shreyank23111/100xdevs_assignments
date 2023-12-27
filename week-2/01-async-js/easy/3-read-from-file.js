const { isUtf8 } = require("buffer");
const fs = require("fs");
const path = "./readMe.js"

fs.readFile(path, "utf8", (err, data)=>{
  if(err){
    console.log("Data cannot be due to some error: ",err);
  }
  else{
    eval(data);  //execute manner
    console.log("Data from the file is: \n", data)
  }
})     