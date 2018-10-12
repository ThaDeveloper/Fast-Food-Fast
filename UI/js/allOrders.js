const ordersURL = 'https://fastfoodfast-api.herokuapp.com/api/v2/orders'
const token = localStorage.getItem('token');

window.onload = function allOrders(){
    fetch(ordersURL, {
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
            data['Orders'].forEach(order => {
                let tr = document.createElement('tr')
                let ownerTd = document.createElement('td')            
                let ownerText = document.createTextNode(order.user_id)
                ownerTd.appendChild(ownerText)
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
                let processButton = document.createElement('button')
                processButton.setAttribute('id', order.id)
                processButton.setAttribute('class', 'accept')
                let processText = document.createTextNode('Process')
                processButton.appendChild(processText)
                processButton.addEventListener('click', function toUpdate(){
                    localStorage.setItem('toUpdate', this.id)
                })
                processButton.addEventListener('click', updateStatus)
                actionTd.appendChild(processButton)
                let cancelButton = document.createElement('button')
                cancelButton.setAttribute('id', order.id)
                cancelButton.setAttribute('class', 'decline')
                let cancelText = document.createTextNode('Cancel')
                cancelButton.appendChild(cancelText)
                cancelButton.addEventListener('click', function toUpdate(){
                    localStorage.setItem('toUpdate', this.id)
                })
                cancelButton.addEventListener('click', updateStatus)
                actionTd.appendChild(cancelButton)
                let completeButton = document.createElement('button')
                completeButton.setAttribute('id', order.id)
                completeButton.setAttribute('class', 'complete')
                let completeText = document.createTextNode('Complete')
                completeButton.appendChild(completeText)
                completeButton.addEventListener('click', function toUpdate(){
                    localStorage.setItem('toUpdate', this.id)
                })
                completeButton.addEventListener('click', updateStatus)
                actionTd.appendChild(completeButton)
                tr.appendChild(ownerTd )
                tr.appendChild(itemsTd)
                tr.appendChild(totalTd)
                tr.appendChild(dateTd)
                tr.appendChild(statusTd)
                tr.appendChild(actionTd)
                document.getElementById('all_orders').appendChild(tr)
            })
        }
        else{
            document.getElementById('message').innerHTML = data.Message;
        }
    })
    .catch(error => console.log(error))
}
