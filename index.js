const fs = require('fs');
var sleep = require('sleep');

function readFilePromise(fileName) {
  return new Promise ((resolve, reject) => {
    fs.readFile(fileName, 'utf8', (err,data) => {
      if (err) {
        reject(err);
      }
      else {
        resolve (data)
      }
    })
  })
}

function matchParentsWithChildrens(parentFileName, childrenFileName) {
  readFilePromise(parentFileName).then((parentJSON) => {
    let parentData = JSON.parse(parentJSON);
    sleep.sleep(5);
    readFilePromise(childrenFileName).then((childJSON) => {
      let childData = JSON.parse(childJSON);
      sleep.sleep(5);
      for (let i = 0 ; i < parentData.length ; i++) {
        let childrensArray = [];
        for (let j = 0 ; j < childData.length ; j++) {
          if ( parentData[i].last_name === childData[j].family) {
            childrensArray.push(childData[j].full_name);
          }
          parentData[i].children = childrensArray;
        }
      }
      console.log(parentData)
      
    }).catch((error) => {
      console.log("reading file children JSON error with message : ", error)
    })
  }).catch((error) => {
    console.log("reading file parent JSON error with message :", error)
  })
}

matchParentsWithChildrens('./parents.json', './childrens.json');
console.log("Notification : Data sedang diproses !");

// // for Release 2
// matchParentsWithChildrens('./parents.json', './not_a_real_file.json')
// matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json')