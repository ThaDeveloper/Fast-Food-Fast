const baseURL = 'https://fastfoodfast-api.herokuapp.com/api/v2/auth/login';
document.getElementById('signIn').addEventListener('submit', signIn)

function signIn(e){
    e.preventDefault()
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    document.getElementById('messages').innerHTML = "";

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
    .then(data =>{
        if (statusCode == 200){
            token = data.token
            //atob decodes base64-encoded string
            user = JSON.parse(atob(token.split('.')[1]));
            localStorage.setItem('token',token)
            localStorage.setItem('user',user['username'])
            localStorage.setItem('loggedIn',true) 
            if (user['admin']){
                window.location = 'orders_admin.html';
            }
            else{
                window.location = 'index.html';
            }
        }
        else{
            let errorsDiv = document.createElement('div');
            errorsDiv.setAttribute('id', 'errors')
            errorsDiv.innerHTML = data.Message;
            document.getElementById('messages').appendChild(errorsDiv)

        }
    })
    .catch((err) => console.log(err))
}