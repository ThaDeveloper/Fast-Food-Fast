const baseURL = 'https://fastfoodfast-api.herokuapp.com/api/v2/menu'
window.orderItems = []
window.onload = function getFullMenu(){
    fetch(baseURL, {
            method: 'GET',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-type': 'application/json'
            }
    
        })
    .then(res => {
        statusCode = res.status
        return res.json()
    })
    .then((data) => {
        if (statusCode == 200){
            data['Full Menu'].forEach((menu) => {
                if (menu.category == 'main'){
                    mainItems = document.createElement('tr');
                    let td1 = document.createElement('td');
                    let image = document.createElement('img');
                    image.setAttribute('src', menu.image);
                    td1.appendChild(image);

                    let td2 = document.createElement('td');
                    let td2Text = document.createTextNode(menu.name);
                    td2.appendChild(td2Text);

                    let td3 = document.createElement('td');
                    let td3Text = document.createTextNode(menu.price);
                    td3.appendChild(td3Text);

                    let td4 = document.createElement('td');
                    button = document.createElement('button');
                    button.setAttribute('class', "call_to")
                    button.setAttribute('id', menu.name)
                    let buttonText = document.createTextNode('Order');
                    button.appendChild(buttonText)
                    button.addEventListener('click', function clicked(){
                        orderItems.push({'name':this.id,'price':menu.price, 'image':menu.image})
                        localStorage.setItem('orderItems', JSON.stringify(orderItems))
                        console.log(localStorage.getItem('orderItems'))
                        alert('Item added to cart')
                    })
                    td4.appendChild(button)
                    mainItems.appendChild(td1)
                    mainItems.appendChild(td2)
                    mainItems.appendChild(td3)
                    mainItems.appendChild(td4)
                    document.getElementById('main-dish').appendChild(mainItems);
                }
                if (menu.category == 'snacks'){
                    snacksItems = document.createElement('tr');
                    let td1 = document.createElement('td');
                    let image = document.createElement('img');
                    image.setAttribute('src', menu.image);
                    td1.appendChild(image);

                    let td2 = document.createElement('td');
                    let td2Text = document.createTextNode(menu.name);
                    td2.appendChild(td2Text);

                    let td3 = document.createElement('td');
                    let td3Text = document.createTextNode(menu.price);
                    td3.appendChild(td3Text);

                    let td4 = document.createElement('td');
                    button = document.createElement('button');
                    button.setAttribute('class', "call_to")
                    button.setAttribute('id', menu.name)
                    let buttonText = document.createTextNode('Order');
                    button.appendChild(buttonText)
                    button.addEventListener('click', function clicked(){
                        orderItems.push({'name':this.id,'price':menu.price, 'image':menu.image})
                        localStorage.setItem('orderItems', JSON.stringify(orderItems))
                        console.log(localStorage.getItem('orderItems'))
                        alert('Item added to cart')
                    })
                    td4.appendChild(button)
                    snacksItems.appendChild(td1)
                    snacksItems.appendChild(td2)
                    snacksItems.appendChild(td3)
                    snacksItems.appendChild(td4)
                    document.getElementById('snacks').appendChild(snacksItems);
                }
                if (menu.category == 'drinks'){
                drinksItems = document.createElement('tr');
                let td1 = document.createElement('td');
                let image = document.createElement('img');
                image.setAttribute('src', menu.image);
                td1.appendChild(image);

                let td2 = document.createElement('td');
                let td2Text = document.createTextNode(menu.name);
                td2.appendChild(td2Text);
                
                let td3 = document.createElement('td');
                let td3Text = document.createTextNode(menu.price);
                td3.appendChild(td3Text);

                let td4 = document.createElement('td');
                button = document.createElement('button');
                button.setAttribute('class', "call_to")
                button.setAttribute('id', menu.name)
                let buttonText = document.createTextNode('Order');
                button.appendChild(buttonText)
                button.addEventListener('click', function clicked(){
                    orderItems.push({'name':this.id,'price':menu.price, 'image':menu.image})
                    localStorage.setItem('orderItems', JSON.stringify(orderItems))
                    console.log(localStorage.getItem('orderItems'))
                    alert('Item added to cart')
                })
                td4.appendChild(button)
                drinksItems.appendChild(td1)
                drinksItems.appendChild(td2)
                drinksItems.appendChild(td3)
                drinksItems.appendChild(td4)
                document.getElementById('drinks').appendChild(drinksItems);
                }
            });   
        }
        else{
            document.getElementById('title').innerHTML = res.Message;
        }
    })
    .catch((err)=>console.log(err))
}
