const baseURL = 'https://fastfoodfast-api.herokuapp.com/api/v2/menu'
window.onload = function getMenu(){
    fetch(baseURL, {
            method: 'GET',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-type': 'application/json'
            }
    
        })
    .then(res => res.json())
    .then((data) => {
        let output = '';
        data['Full Menu'].forEach(function(menu){
            output +=`
            <div class="item">
            <a href="#content"><img src="./images/juice.jpeg"></a>
            <h3>${menu.name}</h3>
            <p> ${menu.name} for your ${menu.category} meal </p>
            <b>KES. ${menu.price}</b><br><br>
            <button class="call_to" onclick="location.href='order.html';">Order Now</button>
            </div>
            `;
        });   
        document.getElementById('main-dish').innerHTML = output;
    })
    .catch((err)=>console.log(err))
}
