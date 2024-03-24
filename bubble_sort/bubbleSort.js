function bubbleSort(arr){
    //define a variable for the final index to check for a needed swap. initialize it as the second to last index because we will be comparing the current index to the one after it (we don't want to go to the last index of the array because there isn't one after it to compare it to)
    var lastIndexToCheck = arr.length - 2
    //define a variable to track if we've performed a swap
    var swapHasOccured = false
    do{
        //re-initializing swapHasOccured to false each time before we begin iterating and looking for numbers to swap
        swapHasOccured = false
        //iterating through the array up to and including lastIndexToCheck
        for(var i = 0; i <= lastIndexToCheck; i++){
            //if the value of the current index is greater than that of the next index...
            if(arr[i] > arr[i+1]){
                //perform a swap
                var temp = arr[i]
                arr[i] = arr[i+1]
                arr[i+1] = temp
                //set swapHasOccured to true
                swapHasOccured = true 
            }
        } 
    }
    //if at least one swap was found, repeat the "do" block
    while(swapHasOccured)
    //if we are here, no swaps were performed on the most recend iteration and the array is sorted. We can now return the array
    return arr
}
//two test cases
console.log(bubbleSort([7,6,5,4,3,2,1]))
console.log(bubbleSort([6765,3,45,77,43,5,3,5,5,5,]))