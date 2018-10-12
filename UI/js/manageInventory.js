const menuURL = 'https://fastfoodfast-api.herokuapp.com/api/v2/menu'
const token = localStorage.getItem('token')

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
                editButton.setAttribute('id', item.item_id)
                editButton.addEventListener('click', function clicked(){
                    localStorage.setItem('toEdit', this.id)
                })
                let deleteButton = document.createElement('button')
                deleteButton.setAttribute('class', 'complete')
                deleteButton.setAttribute('id', item.item_id)
                deleteButton.addEventListener('click', function clicked(){
                    localStorage.setItem('toEdit', this.id)
                })
                actionTd.appendChild(editButton)
                actionTd.appendChild(deleteButton)
                tr.appendChild(imageTd)
                tr.appendChild(nameTd)
                tr.appendChild(priceTd)
                tr.appendChild(catTd)
                tr.appendChild(actionTd)
                document.getElementById('all_items').appendChild(tr)
            })
        }
        else{
            console.log(data.Message)
        }
    })
    .catch((err)=>console.log(err))
}
