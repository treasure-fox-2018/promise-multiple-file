const fs = require('fs');
var sleep = require('sleep');
const util = require('util');

function readFilePromise(file_name) {
  // psst, the promise should be around here...
  return new Promise(function(resolve, reject) {
    fs.readFile(file_name, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
}

function matchParentsWithChildrens(parentFileName, childrenFileName) {
  // your code here... (p.s. readFilePromise function(s) should be around here..)
  readFilePromise(parentFileName).then((result) => {
    sleep.sleep(5);
    // console.log(result);
    var parent_data = result;
    return parent_data;
  })
  .then((parent_data) => {
    readFilePromise(childrenFileName).then((result) => {
      sleep.sleep(5);
      // console.log(result);
      var children_data = result;
      // console.log(children_data);
      return children_data;
    })
    .then((children_data) => {
      for (let i = 0; i < parent_data.length; i++) {
        currentParent = parent_data[i];
        currentParentLastName = currentParent.last_name;
        arrCurrentChildren = [];
        for (let j = 0; j < children_data.length; j++) {
          if (children_data[j].family === currentParentLastName) {
            arrCurrentChildren.push(children_data[j].full_name)
          }
        }
        currentParent.children = arrCurrentChildren;
      }
      console.log(util.inspect(parent_data, false, null));
    })
    .catch((err) => {
      console.log("Oops! Something's wrong during reading the data");
      console.log(err);
    })
  })
  .catch((err) => {
    console.log("Oops! Something's wrong during reading the data");
    console.log(err);
  })
}

matchParentsWithChildrens('./parents.json', './childrens.json');
console.log("Notification : Data sedang diproses !");

// for Release 2
matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');
