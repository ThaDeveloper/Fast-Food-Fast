if (token){
    const tokenData = JSON.parse(atob(token.split('.')[1]))
    if (tokenData.exp < Date.now() / 1000) {
        logout()
    }
}
function logout(){
    localStorage.setItem('loggedIn',false) 
    localStorage.clear();
    window.location = 'index.html';
}