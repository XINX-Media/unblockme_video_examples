module.exports = {
    getRandomColor: () => {
        const colors = ['red', 'green','blue', 'purple', 'yellow', 'orange', ]

        const randomIndex = Math.floor(Math.random() * colors.length);
        return colors[randomIndex]
    }
    
}