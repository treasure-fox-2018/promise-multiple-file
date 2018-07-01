const fs = require('fs');
const sleep = require('sleep'); 

function readFilePromise(file) {
  return new Promise ((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) {
        reject (err);
      } else {
        resolve (JSON.parse(data));
      }
    })
  })
}

// readFilePromise('./parents.json')
// .then(result => {
//   console.log(result)
// })

function matchParentsWithChildrens(parentFileName, childrenFileName) {
  
  readFilePromise(parentFileName)
  .then(result => {
    sleep.sleep(5);
    var parent_data = result;

    readFilePromise(childrenFileName)
    .then(result => {
      sleep.sleep(5);
      var childrens = result;

      for(let i in childrens){
        for (let j in parent_data){
          if (childrens[i].family == parent_data[j].last_name){
            if (!parent_data[j].children){
              parent_data[j].children = [childrens[i].full_name];
            } else {
              parent_data[j].children.push(childrens[i].full_name);
            }
          }
        }
      }
      console.log(parent_data)
    })
    .catch (err =>{
      console.log('Error reading data')
    })
  })
  .catch (err =>{
    console.log('Error reading data')
  })
}

// matchParentsWithChildrens('./parents.json', './childrens.json');
// console.log("Notification : Data sedang diproses !");


// matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json')