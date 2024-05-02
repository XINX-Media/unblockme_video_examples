let loginEmail = document.getElementById('loginEmail');
let loginPassword = document.getElementById('loginPassword');
let loginForm = document.getElementById('loginForm');

let signUpEmail = document.getElementById('signUpEmail');
let signUpPassword = document.getElementById('signUpPassword');
let signUpForm = document.getElementById('signUpForm');


loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let user = {
        email: loginEmail.value,
        password: loginPassword.value
    }
    fetch('api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }).then(res => {
        if (!res.ok) {
            alert('Login failed. Please try again.');
        }else{
            window.location.href = '/home';
        }
        return 
    
    }).catch(err => {
        console.log(err);
    })
})

signUpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let user = {
        email: signUpEmail.value,
        password: signUpPassword.value
    }
    fetch('api/users/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }).then(res => {
        if (!res.ok) {
            alert('sign up failed. Please try again.');
        }else{
            window.location.href = '/home';
        }
        return 
    }).catch(err => {
        console.log(err);
    })
})




