
const fs = require('fs');
//var Heap = require("collections/heap");

highScore = (file_name, N) =>{ var data = fs.readFileSync(file_name).toString().split("\n");

//Create new array to hold processed objects
const scoreArray = []

//loop over data and push into new object.
for (let i =0; i < data.length; i++) {
    let line = data[i];
    let [score, record] = line.split(': ')
   try {
    record = JSON.parse(record)
    scoreArray.push({score : score, id : record.name})
   } catch (error) {
        record = 'error'
    scoreArray.push({score : score, id : record})
   } 
   try {
       
   } catch (error) {
       
   }
   //console.log(score, record.name)
   //scoreArray.push({score : score, id : record.name})
}

const sorted = scoreArray.sort((a,b) => {
    return b.score - a.score
});
//console.log(sorted)
return sorted.slice(0, N);
}
result = highScore(process.argv[2], process.argv[3]);
let isError = false
for (let index = 0; index < result.length; index++) {
    element = result[index];
    if (element.id == "error") {
        console.log("THIS IS NOT JSON")
        isError = true
    }

}

if (! isError) {
    
console.log(JSON.stringify(result, null, 2))

}