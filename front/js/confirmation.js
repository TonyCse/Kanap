// récupérer le localStorage
const params = new URLSearchParams(location.search)
let id = params.get("id")
console.log(id)

const orderId = document.getElementById("orderId")
orderId.innerHTML = id
localStorage.clear()