var userWord = ''

while(userWord.length !== 4){
    userWord = prompt('please enter a four letter word')
    if(userWord.length !== 4){
        alert('you did not enter a four letter word')
    }
}
alert('great job choosing a four letter word')

do{
    alert('your current word is '+userWord+'. you may choose a new word')
    userWord = prompt('please enter a four letter word')
    if(userWord.length !== 4){
        alert('you did not enter a four letter word')
    }
}while(userWord.length !== 4)

alert('great job choosing a four letter word') 