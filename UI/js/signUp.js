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

    if (password != password_confirm){
        document.getElementById('errors').innerHTML = "Passwords don't match";
        return
    }
    if (last_name == undefined){
        let element = document.getElementById('errors');
        element.style.color = '#CC0000';
        element.innerHTML = "First Name and Last Name"
        + " is required in the format 'Firstname Lastname'";
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
            let element = document.getElementById('success');
            element.style.color = '#00C851';
            element.innerHTML = res.Message;
            window.setTimeout(() => window.location = 'login.html', 900);
        }
        else {
            let element = document.getElementById('errors');
            element.style.color = '#CC0000';
            element.innerHTML = res.Message;
        }
    })
    .catch((err) => console.log(err))
}