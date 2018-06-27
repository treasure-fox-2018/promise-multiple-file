const fs = require('fs');
var sleep = require('sleep');

function readFilePromise(fileName) {
  return new Promise(function(resolve,reject){
    fs.readFile(fileName,'utf8',function(err,dataParse){
      sleep.sleep(2)
      if(err) throw err
      let dataString = JSON.parse(dataParse);
      resolve(dataString)
    })
  })
  // psst, the promise should be around here...
}

function matchParentsWithChildrens(parentFileName, childrenFileName) {
  readFilePromise(parentFileName)
  .then(function(dataParents){
    return readFilePromise(childrenFileName)
    .then(function(dataChildren){
      return 
    })
  })
  // your code here... (p.s. readFilePromise function(s) should be around here..)
}

matchParentsWithChildrens('./parents.json', './childrens.json');
console.log("Notification : Data sedang diproses !");

// for Release 2
matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');