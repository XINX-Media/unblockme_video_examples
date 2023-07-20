//  We need to have a word for the user to guess
// Before the game starts, there is no chosen word
define word as null

//  We need to have some way of tracking the user's guesses
define guesses as empty

//  We need a way to track the number of blanks, which should be equal to the word letter count
define blanks as string of length same to word, full of "-"

//  We need a way to display the number of blanks
//  We need a function that populates the above container based on the number of blanks
function populateContainerWithBlanks
    for character in blanks
        create a new element
        set that element's text to character
        add that element to the container #letter_container

//  We need a way to get keyboard input from the player
function handleKeyboardInput
    // If the game is not started, the user's keyboard input is ignored
    if game not started
        return
    //  When the user types a key, we need to check it against the word and update the blanks
    //  When the user enters a key, determine if its valid
    if key is not a valid letter
        return
    //  Check if the key input exists in the word
    for character at index in word
        if character is key
            //  If the key input does exist in the word, then update the blanks, replacing blanks with the appropriate letter at the appropriate place
            set value of blanks at index to character

    call populateContainerWithBlanks
    call checkGameEnd

register handleKeyboardInput as a key listener with the document

// We need a variable that tracks seconds left in the game
define seconds as 60

// Every second the game is active, this variable decreases by 1
run every second:
    // If the game is not started, the timer does not decrement
    if game not started
        return

    decrease seconds by 1
    call updateScore
    call handleTimerOut

// This variable is displayed to the user and the user can see when it changes
function updateScore
    set value of #timer_holder to seconds

// When the user has filled in all the blanks, the game should end
function checkGameEnd
    if blanks is same as word
        // We need to stop the timer
        stop the above timer (run every second)
        call handleGameEnd(true)

// When the timer runs out the game should end
// Instead of a victory message, display a defeat message
function handleTimerOut
    if seconds is 0 or less
        stop the above timer (run every second)
        call handleGameEnd(false)

//  We need to define two variables, one to hold losses and one to hold wins
define wins as 0
define losses as 0

//  When the game ends, we need to increment the wins variable in case of victory and the loss variable in case of defeat
function handleGameEnd(won)
    //  When the game ends, show the wins and losses count in the final message
    if won
        increment wins

        // We need to display a victory message
        display victory message containing wins and losses to #message_holder
    else
        increment losses

        display loss message containing wins and losses to #message_holder

    //  After incrementing, we need to persist these variables to localStorage
    send wins to localStorage
    send losses to localStorage

//  When the page loads, we need to fetch these values from localStorage and put them into the win and loss variables
get wins from localStorage
get losses from localStorage

// We need a variable to track if the game is started or not
define gameStarted as false

// When the start game button is clicked, the game starts
when start button clicked
    set gameStarted to true
    // When the game starts, we choose a word at random from the list and assign that as our chosen word
    pick random word from wordList
    set that word to "word"

    call populateContainerWithBlanks

// We have a list of potential words defined in an array and assigned to a variable.
define wordList as a list of words