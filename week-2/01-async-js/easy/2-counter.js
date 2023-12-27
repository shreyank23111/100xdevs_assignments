let count = 0;

const counter = (()=>{
  console.clear();
  console.log(count++);
  setInterval(()=>{
    counter()
  },1000)
})

counter();