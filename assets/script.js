const yearSpan = document.getElementById('current-year')
yearSpan.innerText = new Date().getFullYear()

const API_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM3MWVjYzhhZDEyOTAwMTU4NzZjNjIiLCJpYXQiOjE3MzE2NjU2MTIsImV4cCI6MTczMjg3NTIxMn0.qGqcnKf754jM8oUe_jpe1P_je3orsCKS8pMbR9kxdZs'

const link = 'https://striveschool-api.herokuapp.com/api/product/'

fetch(link, {
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
})
  .then((response) => {
    console.log('RESPONSE', response)
    if (response.ok) {
      return response.json()
    } else {
      throw new Error('Errore nel recupero della risposta dal server')
    }
  })
  .then((data) => {
    console.log('Dati ricevuti:', data)
  })
  .catch((error) => {
    console.error('Si è verificato un errore:', error)
  })
  .then((arrayOfCats) => {
    console.log('arrayOfCats', arrayOfCats)

    const row = document.getElementById('cats-row')
    arrayOfCats.forEach((cat) => {
      const newCol = document.createElement('div')
      newCol.classList.add('col', 'col-12', 'col-md-6', 'col-lg-4')
      newCol.innerHTML = `
            <div class="card">
                <img src="https://cdn.pixabay.com/photo/2020/03/02/20/24/kitten-4896840_960_720.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${cat.name}</h5>
                    <p class="card-text">${cat.description}</p>
                    <p class="card-text">${singleCat.brand}</p>
                <p class="card-text">${singleCat.imageUrl}</p>
                    <p class="card-text">${cat.price}€ - ${
        cat.time.split('T')[0]
      }</p>
                    <a href="./details.html?catsId=${
                      cat._id
                    }" class="btn btn-primary">Vai ai dettagli!</a>
                </div>
            </div>
        `
      row.appendChild(newCol)
    })
  })
  .catch((error) => {
    console.log('ERROR', error)
  })
