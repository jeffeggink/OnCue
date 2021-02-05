const fs = require('fs');

//edge case to first check to see if theres an amount of results to be pulled
if (process.argv.length < 4) {
    console.log("not enough arguments")
    process.exit(1)
}

//assign N to argv[3] 
let n = process.argv[3]

//function for edge case to see if N is an integer(thanks stackoverflow!)
function isInt(value) {
    return !isNaN(value) && 
           parseInt(Number(value)) == value && 
           !isNaN(parseInt(value, 10));
  }
//edge case for if N is not an integer please input integer
if (! isInt(n)) {
    console.log("Please use integer")
    process.exit(1)
}

//edge cases to handle 0 or negative value on argv[3]
if (n <= 0) {
    console.log("Please use positive integer")
    process.exit(1)
}

//Main function for reading the file, changing it to a string and splitting the data 
let highScore = (file_name, n) =>{ let data = fs.readFileSync(file_name).toString().split("\n");

//Create new array to hold processed objects
const scoreArray = []

//loop over data (the split string from the file being read (made on line 31)
for (let i =0; i < data.length; i++) {
//sets variable for data that was looped over then splits data with proper format
    let line = data[i];
    let [score, record] = line.split(': ')

//try catch to see if the record (id) being requested is parsable as JSON
   try {
    record = JSON.parse(record)

//pushing the data into the scoreArray if its parsable as JSON so I can sort it later
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
//slice off 0 index (the score) and N (process.argv[3])
return sorted.slice(0, n);
}

//set result to the 2 highscore arguments we need to grab from CLI
result = highScore(process.argv[2], process.argv[3]);

//make sure the error used later doesnt automatically fire
// until the boolean gets set to true (if true) after error handling
let isError = false

//for loop to loop over the result index
for (let index = 0; index < result.length; index++) {
//set variable element to be the result index 
    element = result[index];

//edge case to check if id coming back from actually log "this is not JSON" if the id value request is not parsable as JSON and set the isError to true
    if (element.id == "error") {
        console.log("THIS IS NOT JSON")
        isError = true
    }

}

//if isError is NOT true (its parsable as JSON) then
if (! isError) {

//console log the results if they pass the tests above
//null,2 just makes the strigified JSON data look prettier.
console.log(JSON.stringify(result, null, 2))

}