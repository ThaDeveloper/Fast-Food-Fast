const baseURL = 'https://fastfoodfast-api.herokuapp.com/api/v2/auth/register'
document.getElementById('signUp').addEventListener('submit', signUp)

function signUp(e){
    e.preventDefault();
    let first_name = document.getElementById('full_name').value.split(" ")[0];
    let last_name = document.getElementById('full_name').value.split(" ")[1];
    let username = document.getElementById('username').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let password_confirm = document.getElementById('pass_confirm').value;

    let errorsDiv = document.createElement('div');
    errorsDiv.setAttribute('id', 'errors')
    let successDiv = document.createElement('div');
    successDiv.setAttribute('id', 'success')
    document.getElementById('messages').innerHTML = "";

    if (last_name == undefined){
        let nameText = document.createTextNode("First Name and Last Name"
        + " is required in the format 'Firstname Lastname'");
        errorsDiv.appendChild(nameText)
        document.getElementById('messages').appendChild(errorsDiv);
        return
    }
    if (password != password_confirm){
        errorsDiv.innerHTML = "Passwords don't match";
        document.getElementById('messages').appendChild(errorsDiv)
        return
    }
    else{
        user = JSON.stringify({
            "first_name": first_name,
            "last_name": last_name,
            "username": username,
            "email": email,
            "password": password
        })
    }
    fetch(baseURL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type': 'application/json'
        },
        body: user
    })
    .then(res => {
        statusCode = res.status
        return res.json()
    })
    .then(res => {
        if (statusCode == 201 ){
            successDiv.innerHTML = res.Message
            document.getElementById('messages').appendChild(successDiv)
            window.setTimeout(() => window.location = 'login.html', 900);
        }
        else {
            errorsDiv.innerHTML = res.Message;
            document.getElementById('messages').appendChild(errorsDiv)
        }
    })
    .catch((err) => console.log(err))
}