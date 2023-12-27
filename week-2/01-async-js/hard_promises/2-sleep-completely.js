/*
 * Write a function that halts the JS thread (make it busy wait) for a given number of milliseconds.
 * During this time the thread should not be able to do anything else.
 * the function should return a promise just like before
 */

function sleep(milliseconds) {
  const current = Date.now()
  const halt = current+milliseconds*1000

  while(Date.now()<=halt){

  }
}
sleep(20)
console.log("hello");

module.exports = sleep;
