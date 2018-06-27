const fs = require('fs');
var sleep = require('sleep');

function readFilePromise(file) {
  return new Promise ((resolve, reject) => {
    fs.readFile(file, 'utf8', (err,data) => {
      if (err) {
        reject({
          message : "Error Message :",
          output : err});
      }
      else {
        resolve ({
          message : true,
          output : data
        })
      }
    })
  })
  // psst, the promise should be around here...
}

function matchParentsWithChildrens(parentFileName, childrenFileName) {
  readFilePromise(parentFileName)
    .then (dataParent => {
      if (dataParent.message === true) {
        sleep.sleep(1)
        // console.log(dataParent.output);
        readFilePromise(childrenFileName)
          .then (dataChildren => {
            sleep.sleep(1)
            // console.log(dataChildren.output);

            let parents = JSON.parse(dataParent.output);
            let childrens = JSON.parse(dataChildren.output);
            
            for (let i = 0; i <= parents.length - 1; i++) {
              let childParent = [];
              for (let j = 0; j <= childrens.length - 1; j++) {
                if (parents[i].last_name === childrens[j].family) {
                  childParent.push(childrens[j].full_name);
                  
                }
              }
              parents[i]['childrens'] = childParent;
            }
            console.log(parents)
          })
          .catch (errorChildren => {
            console.log(`Terjadi error pada proses pembacaan data. \n${errorChildren.message} ${errorChildren.output}`)
          })
      }
    })

    .catch (errorParent => {
      console.log(`Terjadi error pada proses pembacaan data. \n${errorParent.message} ${errorParent.output}`)
    });
  // your code here... (p.s. readFilePromise function(s) should be around here..)
}

matchParentsWithChildrens('./parents.json', './childrens.json');
console.log("Notification : Data sedang diproses !");

// for Release 2
matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');