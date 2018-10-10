const baseURL = 'https://fastfoodfast-api.herokuapp.com/api/v2/menu'
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
            let snacksOutput = '';
            let mainOutput = '';
            let drinksOutput = '';
            data['Full Menu'].forEach((menu) => {
                if (menu.category == 'main'){
                    mainOutput +=`
                    <div class="item">
                    <a href="#content"><img src=${menu.image}></a>
                    <h3>${menu.name}</h3>
                    <p> ${menu.name} for that heavy meal </p>
                    <b>KES. ${menu.price}</b><br><br>
                    <button class="call_to" onclick="location.href='order.html';">Order Now</button>
                    </div>
                    `;
                }
                if (menu.category == 'snacks'){
                    snacksOutput +=`
                    <div class="item">
                    <a href="#content"><img src=${menu.image}></a>
                    <h3>${menu.name}</h3>
                    <p> ${menu.name} for your grab and go meal </p>
                    <b>KES. ${menu.price}</b><br><br>
                    <button class="call_to" onclick="location.href='order.html';">Order Now</button>
                    </div>
                    `;
                }
                if (menu.category == 'drinks'){
                    drinksOutput +=`
                    <div class="item">
                    <a href="#content"><img src=${menu.image}></a>
                    <h3>${menu.name}</h3>
                    <p> ${menu.name} for your thirst </p>
                    <b>KES. ${menu.price}</b><br><br>
                    <button class="call_to" onclick="location.href='order.html';">Order Now</button>
                    </div>
                    `;
                }
            });   
            document.getElementById('main-dish').innerHTML = mainOutput;
            document.getElementById('snacks').innerHTML = snacksOutput;
            document.getElementById('drinks').innerHTML = drinksOutput;
        }
        else {
            document.getElementById('content').innerHTML = res.Message;
        }
    })
    .catch((err)=>console.log(err))
}
