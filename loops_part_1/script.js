var myArray = ['first' , 'second', 'magic', 'third', 'fourth']

// DECLARE A FOR LOOP to iterate through myArray
// initialization; condition; update
for(var i = 0; i < myArray.length; i++){
    // CODE BLOCK
    // console.log each word
    console.log(myArray[i])
    // if we find the magic word...
    if(myArray[i] === 'magic'){
        // console log 'found it' and iterate through the word, 
        // console logging each letter individually
        console.log('found it!')
        // DECLARE A NESTED FOR LOOP
        for(var j = 0; j < myArray[i].length; j++){
            // this is how we referece an index within an index, to
            // access individual letters in the word
            console.log(myArray[i][j])
        }
        //exit the OUTER for loop once the 'magic' loop is complete
        break
    }
}