const historyURL = 'https://fastfoodfast-api.herokuapp.com/api/v2/auth/users/orders'
const token = localStorage.getItem('token');

window.onload = function orderHistory(){
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
            data['Orders'].forEach(order => {
                let tr = document.createElement('tr')
                let itemsTd = document.createElement('td')
                iText = ""   
                for (const key of Object.keys(JSON.parse(order.items))) {
                    iText +=  JSON.parse(order.items)[key] + ":" + key+"(s) \n"
                }         
                let itemsText = document.createTextNode(iText)
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
                actionButton.setAttribute('id', order.id)
                actionButton.setAttribute('class', 'delete')
                let buttonText = document.createTextNode('Cancel')
                actionButton.appendChild(buttonText)
                actionButton.addEventListener('click', function toCancel(){
                    localStorage.setItem('toCancel', this.id)
                })
                actionButton.addEventListener('click', cancel)
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
    .catch(error => console.log(error))
}
function cancel(){
    toCancel = localStorage.getItem('toCancel')
    fetch(historyURL + '/' + toCancel, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type': 'application/json',
            'x-access-token': token
        }
    })
    .then(response =>{
        statusCode = response.status
        return response.json()
    })
    .then(data =>{
        if (statusCode == 200){
            location.reload();
        }
        else{
            console.log(data.Message)
        }
    })
    .catch(error => console.log(error))
}