const menuURL = 'https://fastfoodfast-api.herokuapp.com/api/v2/menu';
const token = localStorage.getItem('token');

window.onload = function getItems(){
    fetch(menuURL, {
        method: 'GET',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type': 'application/json'
        }

    })
    .then(res =>  {
        statusCode = res.status
        return res.json()
    })
    .then((data) => {
        if (statusCode == 200){  
            allItemsTable = document.getElementById('all_items')      
            data['Full Menu'].forEach((item) => {
                let tr = document.createElement('tr')
                let imageTd = document.createElement('td')
                let img = document.createElement('img')
                img.setAttribute('src', item.image)
                imageTd.appendChild(img)
                let nameTd = document.createElement('td')
                let nameText = document.createTextNode(item.name)
                nameTd.appendChild(nameText)
                let priceTd = document.createElement('td')
                let priceText = document.createTextNode(item.price)
                priceTd.appendChild(priceText)
                let catTd = document.createElement('td')
                let catText = document.createTextNode(item.category)
                catTd.appendChild(catText)
                let actionTd = document.createElement('td')
                let editButton = document.createElement('button')
                editButton.setAttribute('class', 'complete')
                editButton.setAttribute('id', item.id)
                editButton.setAttribute('onclick',"location.href='edit_item.html';")
                let editButtonText = document.createTextNode('Edit')
                editButton.appendChild(editButtonText)
                editButton.addEventListener('click', function clicked(){
                    localStorage.setItem('menuId', this.id)
                })
                let deleteButton = document.createElement('button')
                deleteButton.setAttribute('class', 'decline')
                deleteButton.setAttribute('id', item.id)
                let deleteButtonText = document.createTextNode('Delete')
                deleteButton.appendChild(deleteButtonText)
                deleteButton.addEventListener('click', function clicked(){
                    localStorage.setItem('menuId', this.id)
                })
                deleteButton.addEventListener('click', deleteMenu)
                actionTd.appendChild(editButton)
                actionTd.appendChild(deleteButton)
                tr.appendChild(imageTd)
                tr.appendChild(nameTd)
                tr.appendChild(priceTd)
                tr.appendChild(catTd)
                tr.appendChild(actionTd)
                allItemsTable.appendChild(tr)
            })
            let addTr = document.createElement('tr')
            let addTd = document.createElement('td')
            let addButton = document.createElement('button')
            addButton.setAttribute('class', 'call_to')
            addButton.setAttribute('id', 'add')
            addButton.setAttribute('onclick',"location.href='add_item.html';")
            let addButtonText = document.createTextNode('Add New')
            addButton.appendChild(addButtonText)
            addTd.appendChild(addButton)
            addTd.setAttribute('colspan', '5')
            addTr.appendChild(addTd)
            allItemsTable.appendChild(addTr)
        }
        else{
            console.log(data.Message)
        }
    })
    .catch((err)=>console.log(err))
}
document.getElementById('addMenu').addEventListener('submit', addMenu)

function addMenu(e){
    e.preventDefault();
    let name = document.getElementById('name').value;
    let price = document.getElementById('price').value;
    let category = document.getElementById('category').value;
    let image = document.querySelector('img').src;

    let errorsDiv = document.createElement('div');
    errorsDiv.setAttribute('id', 'errors')
    let successDiv = document.createElement('div');
    successDiv.setAttribute('id', 'success')
    document.getElementById('messages').innerHTML = "";

    let item = JSON.stringify({
        'name': name,
        'price': price,
        'category': category,
        'image': image
    })
    fetch(menuURL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type': 'application/json',
            'x-access-token': token
        },
        body: item

    })
    .then(res =>  {
        statusCode = res.status
        return res.json()
    })
    .then(data => {
        if(statusCode == 201){
            successDiv.innerHTML = data.Message
            document.getElementById('messages').appendChild(successDiv)
            location.reload()
        }
        else{
            errorsDiv.innerHTML = data.Message;
            document.getElementById('messages').appendChild(errorsDiv)
        }
    })
}

function deleteMenu(e){
    e.preventDefault();
    itemId = localStorage.getItem('menuId');
    fetch(menuURL +'/'+ itemId, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json, text/plain, */*',
            'x-access-token': token
        }

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
            alert("Item deleted")
            location.reload();
        }
        else{
            document.getElementById('errors').innerHTML = data.Message
            console.log(data.Message)
        }
    })
    .catch((err) => console.log(err))
}
