const yearSpan = document.getElementById('current-year')
yearSpan.innerText = new Date().getFullYear()

const API_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM3MWVjYzhhZDEyOTAwMTU4NzZjNjIiLCJpYXQiOjE3MzE2NjU2MTIsImV4cCI6MTczMjg3NTIxMn0.qGqcnKf754jM8oUe_jpe1P_je3orsCKS8pMbR9kxdZs'

const link = 'https://striveschool-api.herokuapp.com/api/product/'

const addressBarContent = new URLSearchParams(window.location.search)

const catsId = addressBarContent.get('catsId')
console.log('catsId', catsId)

fetch(link + catsId, {
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
})
  .then((response) => {
    if (response.ok) {
      return response.json()
    } else {
      throw new Error("Errore nel recupero dei dettagli dell'evento")
    }
  })
  .then((singleCat) => {
    console.log('singleCat', singleCat)
    const col = document.getElementById('card-container')
    col.innerHTML = `
        <div class="card">
            <img src="${
              singleCat.imageUrl || 'default-image-url.jpg'
            }" class="card-img-top" alt="${singleCat.name}">
            <div class="card-body">
                <h5 class="card-title">${singleCat.name}</h5>
                <p class="card-text">${singleCat.description}</p>
                <p class="card-text">${singleCat.brand}</p>
                <p class="card-text">${singleCat.imageUrl}</p>
                <p class="card-text">${singleCat.price}€</p>
                <a class="btn btn-warning" href="./backoffice.html?catsId=${catsId}">MODIFICA</a>
                <button class="btn btn-danger" id="delete-btn">ELIMINA</button>
            </div>
        </div>
    `

    document.getElementById('delete-btn').addEventListener('click', deleteCat)
  })
  .catch((error) => {
    console.log('ERROR', error)
  })

const deleteCat = function () {
  console.log('PROVO A DISINTEGRARE GATTINO')
  fetch(link + catsId, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  })
    .then((response) => {
      if (response.ok) {
        alert('Gattino disintegrato!')
        window.location.assign('./index.html')
      } else {
        throw new Error('Errore nella disintegrazione del gattino')
      }
    })
    .catch((error) => {
      console.log('error', error)
    })
}
