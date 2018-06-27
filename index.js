const fs = require('fs');
var sleep = require('sleep');

function readFilePromise(file) {
    return new Promise(function(resolve, reject) {
        fs.readFile(file, 'utf8', function(err, dataFile) {
            sleep.sleep(3)

            if(err) reject(err)
            resolve(JSON.parse(dataFile))
        })
    })
}

function matchParentsWithChildrens(parentFileName, childrenFileName) {
    readFilePromise(parentFileName)
        .then(function(parentData) {
            
            return readFilePromise(childrenFileName)
            .then(function(childrenData) {
                return [parentData, childrenData]
            })
        }).then(function(readData) {
            let parentData = readData[0]
            let childrenData = readData[1]

            for(let i = 0; i < parentData.length; i++) {
                let tempParent = parentData[i]
                let familyMember = []
                for(let j = 0; j < childrenData.length; j++) {
                    let tempChild = childrenData[j]
                    if(tempChild.family == tempParent.last_name) {
                        familyMember.push(tempChild.full_name)
                    }
                }
                parentData[i].childrens = familyMember 
            }

            console.log(parentData)
        }).catch(function() {
            return 'Error'
        })

}

matchParentsWithChildrens('./parents.json', './childrens.json');
console.log("Notification : Data sedang diproses !");

// for Release 2
// matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
// matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');