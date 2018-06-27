const fs = require('fs');
// var sleep = require('sleep');

function readFilePromise(file) {
  // psst, the promise should be around here...
  return new Promise((resolve,reject) => {
    fs.readFile(file,(err,data) => {
      if (err) {
        reject(`file tidak ada`)
      }else {
        resolve(JSON.parse(data))
      }
    })
  })
}

function matchParentsWithChildrens(parentFileName, childrenFileName) {
  // your code here... (p.s. readFilePromise function(s) should be around here..)
}

// matchParentsWithChildrens('./parents.json', './childrens.json');
// console.log("Notification : Data sedang diproses !");

// // for Release 2
// matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
// matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');

readFilePromise('./parents.json')
.then((read_succees) => {
  console.log(read_succees);
})
.catch((read_error) => {
  console.log(read_error)
})