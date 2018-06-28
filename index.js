const fs = require('fs');
var sleep = require('sleep');

function readFilePromise(fileName) {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, 'utf8', function (err, data) {
      if (err) {
        return reject(err)
      } else {
        sleep.sleep(5);
        let readData = JSON.parse(data);
        resolve(readData)
      }
    })
  })
}

function matchParentsWithChildrens(parentFileName, childrenFileName) {
  readFilePromise(parentFileName)
    .then((parent_data) => {
      return readFilePromise(childrenFileName)
        .then((child_data) => {
          return (parent_data, child_data) 
        })
    })
    .then((parentAndChild) => {
      var parent_data = parentAndChild[0];
      var child_data = parentAndChild[1];
      for (let i = 0; i < parent_data.length; i++) {
        parent_data[i].children = [];
        for (let j = 0; j < child_data.length; j++) {
          if (parent_data[i].last_name === child_data[j].family) {
            parent_data[i].children.push(child_data[j].full_name);
          }
        }
      }
      console.log(parent_data)
    })
    .catch((err) => {
      console.log('ERROR! ERROR!');
      console.log(err);
    })
}

matchParentsWithChildrens('./parents.json', './childrens.json');
console.log("Notification : Data sedang diproses !");

// for Release 2
matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
// matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');