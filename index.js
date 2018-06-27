const fs = require('fs');
var sleep = require('sleep');

function readFilePromise(dataJson) {
  return new Promise ((resolve, reject) => {
    fs.readFile(dataJson, (err, data) => {
      if (err) reject(err)
      else resolve(JSON.parse(data))
    })
  })
}

function matchParentsWithChildrens(parentFileName, childrenFileName) {
  const readDataParent = readFilePromise(parentFileName)
  const readDataChildren = readFilePromise(childrenFileName)
  Promise.all([readDataParent, readDataChildren])
  .then(data => {

    const dataParent = data[0]
    const dataChildren = data[1]

    for (let i = 0; i < dataParent.length; i++) {
      var childParent = []
      for (let j = 0; j < dataChildren.length; j++) {
        if (dataParent[i].last_name === dataChildren[j].family) {
          childParent.push(dataChildren[j].full_name)
        }
      }
      dataParent[i].children = childParent
    }
    sleep.sleep(5)
    console.log(dataParent)
  })
  .catch(err => console.log("Error message : ", err));
  
}

matchParentsWithChildrens('./parents.json', './childrens.json');
console.log("Notification : Data sedang diproses !");

// for Release 2
// matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
// matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');