token = localStorage.getItem('token')
if(token){
    user = JSON.parse(atob(token.split('.')[1]));
    if (!user['admin']){
        window.location = 'index.html';
    }
}
else{
    window.location = 'index.html';
}