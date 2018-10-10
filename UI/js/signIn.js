const baseURL = 'https://fastfoodfast-api.herokuapp.com/api/v2/auth/login';
document.getElementById('signIn').addEventListener('submit', signIn)

function signIn(e){
    e.preventDefault()
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    credentials = JSON.stringify({
        "username": username,
        "password": password
    })
    fetch(baseURL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
            
        },
        body: credentials
    })
    .then(res => {
        statusCode = res.status
        return res.json()
    })
    .then(res =>{
        if (statusCode == 200){
            token = res.token
            localStorage.setItem('token',token)
            window.location = 'account_home.html';
        }
        else{
            let element = document.getElementById('errors');
            element.style.color = '#CC0000';
            element.innerHTML = res.Message;
        }
    })
    .catch((err) => console.log(err))
}