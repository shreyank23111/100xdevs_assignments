const fs = require("fs")
const path = "./dummydata.js"

fs.readFile(path, "utf8", (err, data) => {
     
  if(err){
    console.log("Error occured while reading the file: ", err);
    return;
  }
 
  console.log("Actual data: \n",data);

  const ans = data.replace(/\s+/g, ' ').trim();
  fs.writeFile(path, ans, "utf8", (err) => {
    if(err){
      console.log("Error in writing the file ", err);
      return;
    }
  });
  console.log("After trimmed data: ");
    console.log(ans);
})

