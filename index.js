const fs = require('fs');
// var sleep = require('sleep');

function readFilePromise(file) {
  // psst, the promise should be around here...
  return new Promise(function(resolve,reject){
    fs.readFile(file,"utf8",function(err,data){
      if(err){
        reject(err)
      }else{
        let parseData = JSON.parse(data)
        resolve(parseData)
      }
    })
  })

}

function matchParentsWithChildrens(parentFileName, childrenFileName) {
  // your code here... (p.s. readFilePromise function(s) should be around here..)
  readFilePromise(parentFileName)
  .then(function(dataParent){
    return readFilePromise(childrenFileName)
      .then(function(dataChildren){
        return ([dataParent,dataChildren])
      })
  })
  .then(function(allData){
    let parent = allData[0]
    let children = allData[1]
    // console.log(children)
    // console.log(parent)
    for(let i=0;i<parent.length;i++){
      let arrChild = []
      for(let j=0;j<children.length;j++){
        if(parent[i].last_name == children[j].family){
          arrChild.push(children[j].full_name)
        }
      }
      parent[i].age = arrChild
    }
    console.log(parent)
  })
  .catch(function(err){
    console.log("error",err)
  })
  
}

matchParentsWithChildrens('./parents.json', './childrens.json');
console.log("Notification : Data sedang diproses !");

// for Release 2
matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');