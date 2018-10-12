const historyURL = 'https://fastfoodfast-api.herokuapp.com/api/v2/auth/users/orders'

window.onload = function orderHistory(){
    let token = localStorage.getItem('token');
    fetch(historyURL, {
        method: 'GET',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type': 'application/json',
            'x-access-token': token
        }
    })
    .then(response => {
        statusCode = response.status
        return response.json()
    })
    .then(data => {
        if (statusCode == 200){
            console.log(data['Orders'])
            data['Orders'].forEach(order => {
                let tr = document.createElement('tr')
                let itemsTd = document.createElement('td')            
                let itemsText = document.createTextNode(order.items)
                itemsTd.appendChild(itemsText)
                let totalTd = document.createElement('td')
                let totalText = document.createTextNode(order.total)
                totalTd.appendChild(totalText)
                let dateTd = document.createElement('td')
                let dateText = document.createTextNode(order.created_at)
                dateTd.appendChild(dateText)
                let statusTd = document.createElement('td')
                let statusText = document.createTextNode(order.status)
                statusTd.appendChild(statusText)
                let actionTd = document.createElement('td')
                let actionButton = document.createElement('button')
                actionButton.setAttribute('id', 'cancel')
                let buttonText = document.createTextNode('Cancel')
                actionButton.appendChild(buttonText)
                actionTd.appendChild(actionButton)
                tr.appendChild(itemsTd)
                tr.appendChild(totalTd)
                tr.appendChild(dateTd)
                tr.appendChild(statusTd)
                tr.appendChild(actionTd)
                document.getElementById('historyTable').appendChild(tr)
            })
        }
        else{
            document.getElementById('message').innerHTML = data.Message;
        }
    })
    .catch(error => console.log(err))
}