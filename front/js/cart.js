// récupérer le localStorage
const storage = { ...localStorage}

/**
 * Fonction qui retoune un tableau qui contient toutes les clés du storage qui se trouve être les id et couleur des articles
 * @returns un tableau 
 */
function getKeysFromStorage() {
  let keys = []
  for (let key in storage) {
    keys.push(key)
  }
  return keys
}

console.log(getKeysFromStorage());

/**
 * Fonction qui retourne un tableau d'objet article
 * @param {Array} keys prends en parametre un tableau de clé du storage
 * @returns un tableau
 */
function getArticles(keys) {
  let articles = []
  keys.forEach(key => {
    let item = JSON.parse(localStorage.getItem(key))
    articles.push(item)
  })
  return articles
}

console.log(getArticles);

/**
 * fonction pour récupérer les ID du produit 
 */
function getAllArticlesId() {
  let articlesId = []
  const keys = getKeysFromStorage()
  const articles = getArticles(keys)
  articles.forEach(article => {
    articlesId.push(article.id)
  })
  return articlesId
}
console.log(getAllArticlesId());

// executer la fonction getKeysFromStorage
const ids = getKeysFromStorage()

// executer la fonction getArticles
let articles = getArticles(ids)

/**
 * Fonction qui permet de récupérer le prix total
 * @returns Le prix total
 */
function getTotalPrice() {
  let total = 0
  const prices = document.querySelectorAll('.priceClass')
  prices.forEach(price => {
     const priceValue = price.innerHTML
     // enlever le signe € de la string et transformer la string en number
     const priceWithoutEuro = priceValue.replace(' €', '')
     const finalPrice = Number(priceWithoutEuro)
     total = total + finalPrice
    })
    return total
  }

/**
 * Fonction qui permet de récupérer la quantité totale
 * @returns la quantité totale
 */
function getTotalQuantity() {
    let total = 0
    const quantities = document.querySelectorAll('.itemQuantity')
    quantities.forEach(quantity => {
      const quantityValue = quantity.valueAsNumber
      total = total + quantityValue
    })
    return total
}

/**
 * Fonction qui ajoute a l'HTML la quantité et le prix total du panier
 */
function displayTotalPriceAndQuantity() {
  const cartPrice = document.createElement('div')
  cartPrice.setAttribute(`class`, `.cart__price`)
  const totalArticleTag = document.querySelector('#totalQuantity')
  const totalPriceTag = document.querySelector('#totalPrice')
  const totalQuantity = getTotalQuantity()
  const totalPrice = getTotalPrice()
  totalArticleTag.textContent = totalQuantity
  totalPriceTag.textContent = totalPrice
}

// fonction pour paramétrer le form
const checkInputValue = (value, errorMessageId, max, regex = null) => {
  let error = false
  const errorMessage = document.querySelector(errorMessageId)
  const regexMatch = regex && value.match(regex) == false
  if (regexMatch
  || value.length <= 3 
  || value.length >= max)
  {
    error = true
    errorMessage.innerHTML= 'Le champs prénom doit contenir que des lettres et être entre 3 et 20 charactères.'
  }
  else 
  {
    errorMessage.innerHTML= ''
  }
  return error
}

// executer la fonction flechée article
articles.forEach(article => {

    // créer cardItems et l'associer a l'ID cart__items
    const cardItems = document.querySelector('#cart__items')

    // créer l'article ArticleTag
    const articleTag = document.createElement('article')
    articleTag.setAttribute('class', 'cart__item')
    articleTag.setAttribute('id', article.id)
    articleTag.setAttribute('data-id', article.id)
    articleTag.setAttribute('data-color', article.color)

    // mettre l'article dans le cart__items
    cardItems.appendChild(articleTag)
    
    // créer la divImg
    const divImg = document.createElement('div')
    divImg.setAttribute('class', 'cart__item__img')

    // créer la balise image
    const image = document.createElement('img')
    image.setAttribute('src', article.image)

    // mettre la balise image dans la divImg
    divImg.appendChild(image)

    // mettre la divImg dans l'article
    articleTag.appendChild(divImg)

    // créer la divCartcontent
    const divCartContent = document.createElement('div')
    divCartContent.setAttribute('class', 'cart__item__content')

    // créer la divCartDescription
    const divCartDescription = document.createElement('div')
    divCartDescription.setAttribute('class', 'cart__item__content__description')

    // créer le title et récupérer la valeur article.title
    const title = document.createElement('h2')
    title.innerHTML = article.title

    // créer le paragraphe et récupérer la valeur article.color
    const color = document.createElement('p')
    color.innerHTML = article.color

    // créer le paragraphe et récupérer la valeur article.price
    const price = document.createElement('p')
    price.setAttribute('class', 'priceClass')
    price.innerHTML = article.price * article.quantity + ' € '
    divCartDescription.appendChild(title)
    divCartDescription.appendChild(color)
    divCartDescription.appendChild(price)
    divCartContent.appendChild(divCartDescription)
    articleTag.appendChild(divCartContent)

    // créer la divCartContentSettings
    const divCartContentSettings = document.createElement('div')

    // créer la divCartContentSettingsQuantity
    const divCartContentSettingsQuantity = document.createElement('div')

    // créer le paragraphe pour la quantité
    const qte = document.createElement('p')
    qte.innerHTML = "Qté : "

    // créer l'inputQte et lui assigner tous les attributs
    const   inputQte = document.createElement('input')
            inputQte.setAttribute('type', 'number')
            inputQte.setAttribute('class', 'itemQuantity')
            inputQte.setAttribute('name', 'itemQuantity')
            inputQte.setAttribute('min', 1)
            inputQte.setAttribute('max', 100)
            inputQte.setAttribute('value', article.quantity)


    divCartContentSettingsQuantity.appendChild(inputQte)
    divCartContentSettingsQuantity.appendChild(qte)
    divCartContentSettings.appendChild(divCartContentSettingsQuantity)
    articleTag.appendChild(divCartContentSettings)
              
  // créer un addEventListener afin de modifier le prix en fonction du changement d'input        
    inputQte.addEventListener('change', (e) => {
      const value = e.target.value
      const calculatedValue = article.price * value
      price.innerHTML = calculatedValue + ' €'
    });

    const settingsDelete = document.createElement('div')
    settingsDelete.setAttribute(`class`, `cart__item__content__settings__delete`)
    const deleteItem = document.createElement('p')
    deleteItem.setAttribute(`class`, `deleteItem`)
    deleteItem.setAttribute('data-id', article.id)
    deleteItem.setAttribute('data-color', article.color)
    deleteItem.innerHTML = "Supprimer";
    settingsDelete.appendChild(deleteItem)
    articleTag.appendChild(settingsDelete)

   // créer l'ecoute click du bouton supprimer
    deleteItem.addEventListener('click', (e) => {
      const id = e.target.dataset.id
      const color = e.target.dataset.color
      console.log(id);
      console.log(color);
      const key = id + '_' + color
      const article = document.getElementById(id)
      console.log(article);
      article.remove()
      displayTotalPriceAndQuantity()
      localStorage.removeItem(key)
      alert('Votre article à bien été supprimé')
  })
});

displayTotalPriceAndQuantity()


// créer la const inputs et l'associer a la class itemQuantity
const inputs = document.querySelectorAll('.itemQuantity')
inputs.forEach(input => {
  input.addEventListener('change', (e) => {
    displayTotalPriceAndQuantity()
  })
})

/**
 * fonction pour valider le form
 */
function validateForm() {
  let error = false

  const firstName = document.querySelector('#firstName').value
  const lastName = document.querySelector('#lastName').value
  const address = document.querySelector('#address').value
  const city = document.querySelector('#city').value
  const email = document.querySelector('#email').value

  // validate first name
  const isInvalidFirstName = checkInputValue(firstName, '#firstNameErrorMsg', 20, (/^[ a-zA-Z-/']+$/))

  // validate last name
  const isInvalidLastName = checkInputValue(lastName, '#lastNameErrorMsg', 25, (/^[ a-zA-Z-/']+$/))
  
  // validate adress
  const isInvalidAddress = checkInputValue(address, '#addressErrorMsg', 50)
  
  // validate city
  const isInvalidCity = checkInputValue(city, '#cityErrorMsg', 20)
  
  // validate email
  const isInvalidEmail = checkInputValue(email, '#emailErrorMsg', 40, (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/))
  
  error = isInvalidFirstName || isInvalidLastName || isInvalidAddress || isInvalidCity || isInvalidEmail

  // créer l'objet customer
  const customer = {
    firstName: firstName,
    lastName: lastName,
    address: address,
    city: city,
    email: email,
  }

  if (error) 
  {
    return null
  }
  else
  {
    return customer
  }
}

const form = document.querySelector('.cart__order__form')
form.addEventListener('submit', (e) => {
  e.preventDefault()
  const customer = validateForm()
  console.log(customer);
  if (customer) {
    const order = getAllArticlesId()
    console.log(order);
    const finalOrderCustomer = {
      contact: customer,
      products: order,
    }
      // requête fetch de l'URL de l'API method POST
      fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(finalOrderCustomer),
      })
      .then(response => {
        return response.json()
      })
      .then((data) => {
        let orderId = data.orderId
        window.location.href= `./confirmation.html?id=${orderId}` ; 
        console.log(orderId);
      })
      .catch((error) => console.log(error.message))
  }
})
