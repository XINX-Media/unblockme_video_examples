const logoutButton = document.getElementById('logoutButton')

if(logoutButton){
    document.getElementById('logoutButton').addEventListener('click', function() {
        fetch('/api/users/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            if(response.ok) {
                document.location.replace('/login');
            }else{
                alert('Failed to log out');
            }
        })
    })
}
