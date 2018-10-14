const menuURL = 'https://fastfoodfast-api.herokuapp.com/api/v2/menu';
const token = localStorage.getItem('token');
window.onload = function getEditItem(){
    itemId = localStorage.getItem('menuId');
    fetch(menuURL +'/'+itemId, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        }
    })
    .then(res =>  {
        statusCode = res.status
        return res.json()
    })
    .then((data) => {
        if (statusCode == 200){
            document.getElementById('name').value = data['Item'][0].name
            document.getElementById('price').value = data['Item'][0].price
            document.getElementById('category').value = data['Item'][0].category
            document.querySelector('img').src = data['Item'][0].image
        }
        else{
            document.getElementById('errors').innerHTML = data.Message
        }
    })

}
document.getElementById('editMenu').addEventListener('submit', editMenu)

function editMenu(e){
    e.preventDefault();
    let name = document.getElementById('name').value;
    let price = document.getElementById('price').value;
    let category = document.getElementById('category').value;
    let image = document.querySelector('img').src;

    let item = JSON.stringify({
        'name': name,
        'price': price,
        'category': category,
        'image': image
    })
    fetch(menuURL +'/'+ itemId, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json, text/plain, */*',
            'x-access-token': token
        },
        body: item

    })
    .then(res =>  {
        statusCode = res.status
        return res.json()
    })
    .then(data => {
        if (data.Message == "Invalid request:Signature has expired"){
            window.location = "login.html"
        }
        if(statusCode == 200){
            alert("Item updated")
            window.location = 'food_catalog.html';
        }
        else{
            document.getElementById('errors').innerHTML = data.Message
            console.log(data.Message)
        }
    })
    .catch((err) => console.log(err))
}
