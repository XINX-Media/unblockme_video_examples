const logoutButton = document.getElementById('logoutButton');

logoutButton.addEventListener('click', (e) => {
    fetch('api/users/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        window.location.href = '/';
    }).catch(err => {
        console.log(err);
    })
})