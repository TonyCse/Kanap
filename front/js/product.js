// récupérer ce que contient l'URL avec location.search
const params = new URLSearchParams(location.search)

// utilise l'ID de l'URL qui correspond a l'article selectionné
const id = params.get("id")               


// début de la boucle getProduct
const getProduct = () => {
    // requête fetch de l'URL de l'API + ID
    fetch("http://localhost:3000/api/products/"+id)

    // conversion de la réponse en json pour qu'il soit utilisé dans le script js
    .then(response => response.json())
    .then(product => {
        // créer un élément et l'associer à la class item__img
        const imageClass = document.querySelector('.item__img')

        // créer un élément image et mettre le src et le alt
        const image = document.createElement('img')
        image.setAttribute('src', product.imageUrl)
        image.setAttribute('id', "imageProduct")
        image.setAttribute('alt', product.altTxt)
        
        // mettre l'image dans l'imageClass
        imageClass.appendChild(image)
        
        // créer un élément et l'associer à la class item__content__titlePrice
        const titreClass = document.querySelector(".item__content__titlePrice")
        
        // créer un élément titre
        const titre = document.querySelector("#title")
        titre.textContent = product.name
        
        // mettre le titre dans la div class item__content__titlePrice
        titreClass.appendChild(titre)
        
        // créer un élément pour le paragraphe et pour le prix et associer aux ID paragraphe et price
        const paragraphe = document.getElementsByTagName('p')
        const prix = document.querySelector("#price")
        prix.textContent = product.price
        
        // mettre le prix dans le paragraphe et le paragraphe dans la div class item__content__titlePrice
        titreClass.appendChild(paragraphe[0])
        
        // créer un élément et l'associer à la div class item__content__description__title
        const descriptionClass = document.querySelector(".item__content__description__title")

        // créer un élément description et l'associer à l'ID description
        const description = document.getElementById("description")
        description.textContent = product.description
        
        // mettre la description dans la div class item__content__description__title
        descriptionClass.appendChild(description)
        
        // créer un élément pour la couleur et l'associer à l'ID colors
        const couleur = document.getElementById('colors')

        // début de la boucle choixCouleur
        product.colors.forEach(color =>{
    
            // créer un élément option
            const option = document.createElement('option')

            // le texte et le choix d'option est égale à la boucle des product.colors
            option.textContent = color

            option.setAttribute('value', color)

            // mettre l'option dans la const couleur
            couleur.appendChild(option)
        })
    })
}

// créer le localstorage
const storage = localStorage

// créer un élément addButton et l'associer à l'ID addToCart
const addButton = document.querySelector("#addToCart")

// début de la mise en écoute du boutton
addButton.addEventListener('click', (e) => {

    // récupérer l'id de l'article dans l'URL
    const id = params.get("id")
    
    // récupérer l'image avec la src
    const image = document.querySelector('#imageProduct')
    const imageValue = image.src
    
    // récupérer le titre avec innerHTML
    const title = document.querySelector('#title')
    const titleValue = title.innerHTML
    
    // récupérer la valeur de la couleur selectionnée
    const select = document.querySelector('#colors')
    const selectedValue = select.value

    // récuperer la valeur de la quantité selectionnée
    const quantity = document.querySelector('#quantity')
    const quantityValue = quantity.value

    // récuperer le prix avec innerHTML
    const price = document.querySelector('#price')
    const priceValue = price.innerHTML

    // créer un objet en récupérant toutes les valeurs necessaires à la commande finale (clé/valeur)
    const commande = {
        id: id,
        image: imageValue,
        title: titleValue,
        color: selectedValue,
        quantity: quantityValue,
        price: priceValue,
    }
    // stocker la commande finale en la convertissant en chaîne JSON
    storage.setItem(id + '_' + selectedValue, JSON.stringify(commande))

    console.log(JSON.parse(storage.getItem(id + '_' + selectedValue)))

    alert('Votre produit à bien été ajouté au panier')
})

getProduct()
