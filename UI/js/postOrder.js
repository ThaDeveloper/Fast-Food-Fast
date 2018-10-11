const orderURL = 'https://fastfoodfast-api.herokuapp.com/api/v2/auth/users/orders';

function postOrder(){
    let item = localStorage.getItem('orderItem');
    let token = localStorage.getItem('token');
    items = {}
    items[item] = 1
    order = JSON.stringify({
        'items':items
    })
    fetch(orderURL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type': 'application/json',
            'x-access-token': token
        },
        body: order
    })
    .then(res =>{
        statusCode = res.status
        return res.json()
    })
    .then(data =>{
        if (statusCode == 201){
        console.log(data)
        alert(data.Message)
        }
        else{
            alert(data.Message)
        }
    })
    .catch(error => console.log(err))
}