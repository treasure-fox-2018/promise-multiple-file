const fs = require('fs');
var sleep = require('sleep');

function readFilePromise(dataToRead) {
  // psst, the promise should be around here...
  return new Promise ((resolve,reject) => {
  
      fs.readFile(dataToRead,(err,data_parent) => {
        // if(err)throw err
        dataArrObj = JSON.parse(data_parent)
        if(err){
          reject(err)
        }else{
          resolve(dataArrObj)
        }
      })
    
  })

}

function matchParentsWithChildrens(parentFileName, childrenFileName) {
  // your code here... (p.s. readFilePromise function(s) should be around here..)
  readFilePromise(parentFileName)
  .then((dataArrObj) =>{
    // console.log(dataArrObj);
    var parentArrObj = dataArrObj
    return readFilePromise(childrenFileName)
    .then((dataArrObj) => {
      var childArrObj = dataArrObj
      for(var i = 0; i < parentArrObj.length;i++){
        var arrChildren = []
        for(var j = 0; j < childArrObj.length;j++){
          if(parentArrObj[i].last_name === childArrObj[j].family){
            arrChildren.push(childArrObj[j].full_name)
          }
          parentArrObj[i].children = arrChildren
        }
        sleep.sleep(2)
        console.log(parentArrObj);
        }
      })
      
      .catch((dataArrObj) =>{
        console.log('read data child Error');
        
      })
    })

    .catch((dataArrObj) =>{
      console.log('read Data parent Error');
    })
  }

matchParentsWithChildrens('./parents.json', './childrens.json');
console.log("Notification : Data sedang diproses !");

// for Release 2
// matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
// matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');