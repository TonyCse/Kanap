// début de la boucle getProducts
const getProducts = () => {

    // requête fetch de l'URL de l'API
    fetch("http://localhost:3000/api/products")

    // conversion de la réponse en json pour qu'il soit utilisé dans le script js
    .then(response => response.json())
    .then(items => {
        // créer un élément et l'associer à la class items
        const itemsContainer = document.getElementById("items")
        items.forEach(item => {
            // créer un élément a et mettre l'id dans le href
                const itemCard = document.createElement("a")
                itemCard.setAttribute('href',`./product.html?id=${item._id}`)

            // créer un élément article
                const itemArticle = document.createElement("article")

            // créer un élément image et mettre le src et le alt
                const itemImage = document.createElement("img")
                itemImage.setAttribute("src", item.imageUrl)
                itemImage.setAttribute("alt", item.altTxt)
                
            // créer un h3 avec une class et le nom
                const itemTitre = document.createElement("h3")
                itemTitre.setAttribute('class', 'productName')
                itemTitre.innerHTML = item.name

            // créer un p avec une class et description
                const itemParagraphe = document.createElement("p")
                itemParagraphe.setAttribute('class', 'productDescription')
                itemParagraphe.innerHTML = item.description
            
            // mettre l'image dans l'article
                itemArticle.appendChild(itemImage)

            // mettre h3 dans l'article
                itemArticle.appendChild(itemTitre)

            // mettre p dans l'article
                itemArticle.appendChild(itemParagraphe)

            // mettre l'article dans a
                itemCard.appendChild(itemArticle)

            // mettre a dans itemsContainer
                itemsContainer.appendChild(itemCard)
        })
    })
    .catch((error) => console.log(error.message))
}

getProducts()


