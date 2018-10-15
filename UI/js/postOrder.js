const orderURL = 'https://fastfoodfast-api.herokuapp.com/api/v2/auth/users/orders';
const token = localStorage.getItem('token');
function postOrder(){
    orderitems = JSON.parse(localStorage.getItem('orderItems'))
    items = {}
    orderitems.forEach(item => {
        items[item['name']] = 1
    });    
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
    .catch(error => console.log(error))
}