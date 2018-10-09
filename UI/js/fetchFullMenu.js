const baseURL = 'https://fastfoodfast-api.herokuapp.com/api/v2/menu'
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
            let snacksOutput = '';
            let mainOutput = '';
            let drinksOutput = '';
            data['Full Menu'].forEach((menu) => {
                if (menu.category == 'main'){
                    mainOutput +=`
                    <tr>
                    <td><img src="./images/beefsteak.jpeg"></td>
                    <td>${menu.name}</td>
                    <td>${menu.price}</td>
                    <td><button id="order" class="call_to" onclick="location.href='order.html';">Order</button></td>
                    </tr>
                    `;
                }
                if (menu.category == 'snacks'){
                    snacksOutput +=`
                    <tr>
                    <td><img src="./images/sausage.jpeg"></td>
                    <td>${menu.name}</td>
                    <td>${menu.price}</td>
                    <td><button id="order" class="call_to" onclick="location.href='order.html';">Order</button></td>
                    </tr>
                    `;
                }
                if (menu.category == 'drinks'){
                    drinksOutput +=`
                    <tr>
                    <td><img src="./images/smoothie.jpeg"></td>
                    <td>${menu.name}</td>
                    <td>${menu.price}</td>
                    <td><button id="order" class="call_to" onclick="location.href='order.html';">Order</button></td>
                    </tr>
                    `;
                }
            });   
            document.getElementById('main-dish').innerHTML = mainOutput;
            document.getElementById('snacks').innerHTML = snacksOutput;
            document.getElementById('drinks').innerHTML = drinksOutput;
        }
        else{
            document.getElementById('title').innerHTML = res.Message;
        }
    })
    .catch((err)=>console.log(err))
}
