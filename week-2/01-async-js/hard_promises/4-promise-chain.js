/*
 * Write 3 different functions that return promises that resolve after t1, t2, and t3 seconds respectively.
 * Write a function that sequentially calls all 3 of these functions in order.
 * Return a promise chain which return the time in milliseconds it takes to complete the entire operation.
 * Compare it with the results from 3-promise-all.js
 */

function wait1(t) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Promise 1 resolved");
      resolve();
    }, t);
  });
}

function wait2(t) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Promise 2 resolved");
      resolve();
    }, t);
  });
}

function wait3(t) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Promise 3 resolved");
      resolve();
    }, t);
  });
}

// function calculateTime(t1, t2, t3) {
// console.time("Promise Chain")
// wait1(t1)
// .then(() => wait2(t2))
// .then(() => wait3(t3))
// .then(() => {
//   console.timeEnd("Promise Chain");
// })
// }

async function calculateTime(t1, t2, t3) {
console.time('Sequential')
  await wait1(t1);
  await wait2(t2);
  await wait3(t3);
console.timeEnd('Sequential')
}

calculateTime(1000,2000,3000)

module.exports = calculateTime;
