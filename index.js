const fs = require('fs');
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}

function match_data(parent_file, children_file) {
  return new Promise((resolve, reject)=>{
    fs.readFile(parent_file, 'utf8', function(err, parents_file){
      if(err) {reject('error')}
      const parents = JSON.parse(parents_file)
      sleep(1000);
      fs.readFile(children_file, 'utf8', function(err, childrens_file){
        if(err) {reject('error')}
        const childrens = JSON.parse(childrens_file)
        sleep(1000);
        for (let i = 0; i < parents.length; i++) {
          var childrenArr = [];
          for (let j = 0; j < childrens.length; j++) {
            if (parents[i].last_name === childrens[j].family) {
              childrenArr.push(childrens[j].full_name);
            }
          }
          parents[i].children = childrenArr;
          resolve(parents);
        }
      })
    })

  })
}

match_data('./parents.json', './childrens.json')
.then(response =>{
  console.log(response);
})
.catch(response =>{
  console.log(response);
})
console.log("Notification : Data sedang diproses !");
