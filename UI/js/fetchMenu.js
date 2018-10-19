const baseURL = 'https://fastfoodfast-api.herokuapp.com/api/v2/menu'
window.orderItems = []
window.onload = function getMenu(){
    fetch(baseURL, {
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
            data['Full Menu'].forEach((menu) => {
                if (menu.category == 'main'){
                    mainItems = document.createElement('div');
                    mainItems.setAttribute('class', 'item');
                    let link = document.createElement('a');
                    link.setAttribute('href', '#content');
                    let image = document.createElement('img');
                    image.setAttribute('src', menu.image);
                    link.appendChild(image);
                    let name = document.createElement('h3');
                    let nameText = document.createTextNode(menu.name);
                    name.appendChild(nameText);
                    let description = document.createElement('p');
                    let descriptionText = document.createTextNode(menu.name + " for your grab and go meal");
                    description.appendChild(descriptionText);
                    let price = document.createElement('b');
                    let priceText = document.createTextNode('KES '+ menu.price);
                    price.appendChild(priceText);
                    let br = document.createElement('br');
                    let button = document.createElement('button');
                    button.setAttribute('class', "call_to");
                    button.setAttribute('id', menu.name)
                    let buttonText = document.createTextNode('Order Now')
                    button.appendChild(buttonText)
                    button.addEventListener('click', function clicked(){
                        orderItems.push({'name':this.id,'price':menu.price, 'image':menu.image})
                        localStorage.setItem('orderItems', JSON.stringify(orderItems))
                        console.log(localStorage.getItem('orderItems'))
                        alert('Item added to cart')
                    })
                    mainItems.appendChild(link);
                    mainItems.appendChild(name);
                    mainItems.appendChild(description);
                    mainItems.appendChild(price);
                    mainItems.appendChild(br);
                    br2 = br.cloneNode(true)
                    mainItems.appendChild(br2);
                    mainItems.appendChild(button)
                    document.getElementById('main-dish').appendChild(mainItems);
                }
                if (menu.category == 'snacks'){
                    snacksItems = document.createElement('div');
                    snacksItems.setAttribute('class', 'item');
                    let link = document.createElement('a');
                    link.setAttribute('href', '#content');
                    let image = document.createElement('img');
                    image.setAttribute('src', menu.image);
                    link.appendChild(image);
                    let name = document.createElement('h3');
                    let nameText = document.createTextNode(menu.name);
                    name.appendChild(nameText);
                    let description = document.createElement('p');
                    let descriptionText = document.createTextNode(menu.name + " for your grab and go meal");
                    description.appendChild(descriptionText);
                    let price = document.createElement('b');
                    let priceText = document.createTextNode('KES '+ menu.price);
                    price.appendChild(priceText);
                    let br = document.createElement('br');
                    let button = document.createElement('button');
                    button.setAttribute('class', "call_to");
                    button.setAttribute('id', menu.name)
                    let buttonText = document.createTextNode('Order Now')
                    button.appendChild(buttonText)
                    button.addEventListener('click', function clicked(){
                        itemsStorage = localStorage.getItem('orderItems');
                        if (itemsStorage != null){        
                            items = []
                            itemsStorage = JSON.parse(itemsStorage)
                            for (let i in itemsStorage){
                                items.push(itemsStorage[i]['name'])
                            }
                            for (let i in itemsStorage){
                                if (items.includes(menu.name)){
                                    q = JSON.parse(localStorage.getItem('orderItems'))[i]['quantity'];
                                    q++;
                                    JSON.parse(localStorage.getItem('orderItems'))[i].quantity = q
                                    console.log(JSON.parse(localStorage.getItem('orderItems'))[i].quantity)
                                }
                                else{
                                    quantity = 1
                                    orderItems.push({'name':this.id,'price':menu.price, 'image':menu.image, 'quantity': quantity})
                                    localStorage.setItem('orderItems', JSON.stringify(orderItems))   
                                }  
                            }
                        }
                        else{
                            quantity = 1
                            orderItems.push({'name':this.id,'price':menu.price, 'image':menu.image, 'quantity': quantity})
                            localStorage.setItem('orderItems', JSON.stringify(orderItems))   
                        }

                        alert('Item added to cart')
                    })
                    snacksItems.appendChild(link);
                    snacksItems.appendChild(name);
                    snacksItems.appendChild(description);
                    snacksItems.appendChild(price);
                    snacksItems.appendChild(br);
                    br2 = br.cloneNode(true)
                    snacksItems.appendChild(br2);
                    snacksItems.appendChild(button)
                    document.getElementById('snacks').appendChild(snacksItems);
                }
                if (menu.category == 'drinks'){
                    drinksItems = document.createElement('div');
                    drinksItems.setAttribute('class', 'item');
                    let link = document.createElement('a');
                    link.setAttribute('href', '#content');
                    let image = document.createElement('img');
                    image.setAttribute('src', menu.image);
                    link.appendChild(image);
                    let name = document.createElement('h3');
                    let nameText = document.createTextNode(menu.name);
                    name.appendChild(nameText);
                    let description = document.createElement('p');
                    let descriptionText = document.createTextNode(menu.name + " for your grab and go meal");
                    description.appendChild(descriptionText);
                    let price = document.createElement('b');
                    let priceText = document.createTextNode('KES '+ menu.price);
                    price.appendChild(priceText);
                    let br = document.createElement('br');
                    let button = document.createElement('button');
                    button.setAttribute('class', "call_to");
                    button.setAttribute('id', 'orderOne')
                    button.setAttribute('name', menu.name)
                    let buttonText = document.createTextNode('Order Now')
                    button.appendChild(buttonText)
                    button.addEventListener('click', function clicked(){
                        orderItems.push({'name':this.id,'price':menu.price, 'image':menu.image})
                        localStorage.setItem('orderItems', JSON.stringify(orderItems))
                        console.log(localStorage.getItem('orderItems'))
                        alert('Item added to cart')
                    })
                    drinksItems.appendChild(link);
                    drinksItems.appendChild(name);
                    drinksItems.appendChild(description);
                    drinksItems.appendChild(price);
                    drinksItems.appendChild(br);
                    br2 = br.cloneNode(true)
                    drinksItems.appendChild(br2);
                    drinksItems.appendChild(button)
                    document.getElementById('drinks').appendChild(drinksItems);
                }
            });   
        }
        else {
            document.getElementById('content').innerHTML = res.Message;
        }
    })
    .catch((err)=>console.log(err))
}
