const displayCurrentTime = (()=>{
  const currentTime = new Date()
  let hours = currentTime.getHours();
     
  const minutes = String(currentTime.getMinutes()).padStart(2, "0");
  const seconds = String(currentTime.getSeconds()).padStart(2, "0");

  let am_pm = "AM";
  if(hours >= 12){
    am_pm = "PM"
  }

  const time = `${hours}: ${minutes}: ${seconds} ${am_pm}`
  console.log(time);
})

displayCurrentTime()