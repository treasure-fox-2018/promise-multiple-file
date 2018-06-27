const fs = require('fs');
// var sleep = require('sleep');

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}

function readFilePromise(data) { // menerima one param nama_file will be read
  // psst, the promise should be around here...
  return new Promise((resolve, reject) => {
    fs.readFile(data, (err, dataParent) => {
      let parentData = JSON.parse(dataParent)
      if(err) {
        reject(err) 
      } else {
        resolve(parentData)
        sleep(3000)
      }
    })
  })
}

function matchParentsWithChildrens(parentFileName, childrenFileName) {
  // your code here... (p.s. readFilePromise function(s) should be around here..)
  
  readFilePromise(parentFileName)
  .then((resultParents) => {
    // console.log(resultParents);
    return readFilePromise(childrenFileName)
    .then((resultChildrens) => {
      for (let i = 0; i < resultParents.length; i++) {
        resultParents[i].childrens = []
        for (let j = 0; j < resultChildrens.length; j++) {
          if(resultParents[i].last_name === resultChildrens[j].family) {
            resultParents[i].childrens.push(resultChildrens[j].full_name)
          }
        }
        console.log(resultParents);
      }
    })
  })
  .catch((err) => {
    console.log(err);
  })
}

readFilePromise('./parents.json', './childrens.json')
// matchParentsWithChildrens('./parents.json', './childrens.json');
console.log("Notification : Data sedang diproses !");

// for Release 2
matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
// matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');