const fs = require('fs');

//edge case to first check to see if theres an amount of results to be pulled
if (process.argv.length < 4) {
    console.log("not enough arguments")
    process.exit(1)
}

//assign N to argv[3] 
N = process.argv[3]

//function for edge case to see if N is an integer(thanks stackoverflow)
function isInt(value) {
    return !isNaN(value) && 
           parseInt(Number(value)) == value && 
           !isNaN(parseInt(value, 10));
  }
//if N is not an integer please input integer
if (! isInt(N)) {
    console.log("Please use integer")
    process.exit(1)
}
//end of stack overflow


//edge cases to handle negative value on argv[3]
if (N <= 0) {
    console.log("Please use positive integer")
    process.exit(1)
}

//Main function for reading the file, changing it to a string and splitting the data 
highScore = (file_name, N) =>{ var data = fs.readFileSync(file_name).toString().split("\n");

//Create new array to hold processed objects
const scoreArray = []

//loop over data and push into new object.
for (let i =0; i < data.length; i++) {
    let line = data[i];
    let [score, record] = line.split(': ')

//try catch to see if the record (id) being requested is parsable
   try {
    record = JSON.parse(record)
//pushing the data into the scoreArray so I can sort it
    scoreArray.push({score : score, id : record.name})
   } catch (error) {
        record = 'error'
    scoreArray.push({score : score, id : record})
   } 

}
//sort the new scoreArray by descending order
const sorted = scoreArray.sort((a,b) => {
    return b.score - a.score
});

return sorted.slice(0, N);
}


result = highScore(process.argv[2], process.argv[3]);
let isError = false

for (let index = 0; index < result.length; index++) {
    element = result[index];

//actually log "this is not JSON" if the id value request is not parsable as JSON
    if (element.id == "error") {
        console.log("THIS IS NOT JSON")
        isError = true
    }

}

if (! isError) {

//console logs the results if they pass the tests above and null,2 just makes the strigified JSON data look prettier.
console.log(JSON.stringify(result, null, 2))

}