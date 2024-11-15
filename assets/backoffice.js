const yearSpan = document.getElementById('current-year')
yearSpan.innerText = new Date().getFullYear()

class Cat {
  constructor(_name, _description, _brand, _imageUrl, _price) {
    this.name = _name
    this.description = _description
    this.brand = _brand
    this.imageUrl = _imageUrl
    this.price = _price
  }
}

const API_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM3MWVjYzhhZDEyOTAwMTU4NzZjNjIiLCJpYXQiOjE3MzE2NjU2MTIsImV4cCI6MTczMjg3NTIxMn0.qGqcnKf754jM8oUe_jpe1P_je3orsCKS8pMbR9kxdZs'

const link = 'https://striveschool-api.herokuapp.com/api/product/'

const catsId = new URLSearchParams(window.location.search).get('catsId')

if (catsId) {
  fetch(link + catsId, {
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM3MWVjYzhhZDEyOTAwMTU4NzZjNjIiLCJpYXQiOjE3MzE2NjU2MTIsImV4cCI6MTczMjg3NTIxMn0.qGqcnKf754jM8oUe_jpe1P_je3orsCKS8pMbR9kxdZs',
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error('Errore nel recupero dettagli per pre-popolazione form')
      }
    })
    .then((singleCat) => {
      document.getElementById('name').value = singleCat.name
      document.getElementById('description').value = singleCat.description
      document.getElementById('brand').value = singleCat.brand
      document.getElementById('price').value = singleCat.price
      document.getElementById('imageUrl').value = singleCat.imgUrl
    })
    .catch((err) => console.log('Errore:', err))
}

const form = document.getElementById('cat-form')
form.addEventListener('submit', (e) => {
  e.preventDefault()

  const nameInput = document.getElementById('name')
  const descriptionInput = document.getElementById('description')
  const brandInput = document.getElementById('brand')
  const priceInput = document.getElementById('price')
  const imageUrlInput = document.getElementById('imageUrl')

  if (
    !nameInput.value ||
    !descriptionInput.value ||
    !brandInput.value ||
    !priceInput.value ||
    !imageUrlInput.value
  ) {
    alert('Tutti i campi sono obbligatori!')
    return
  }

  if (isNaN(parseFloat(priceInput.value))) {
    alert('Il prezzo deve essere un numero valido!')
    return
  }

  const createdCat = new Cat(
    nameInput.value.trim(),
    descriptionInput.value.trim(),
    brandInput.value.trim(),
    imageUrlInput.value.trim(),
    parseFloat(priceInput.value)
  )

  console.log("GATTO CREATO E PRONTO PER L'INVIO", createdCat)

  const methodToUse = catsId ? 'PUT' : 'POST'
  const URLToUse = catsId ? link + catsId : link

  fetch(URLToUse, {
    method: methodToUse,
    body: JSON.stringify(createdCat),
    headers: {
      'Content-Type': 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM3MWVjYzhhZDEyOTAwMTU4NzZjNjIiLCJpYXQiOjE3MzE2NjU2MTIsImV4cCI6MTczMjg3NTIxMn0.qGqcnKf754jM8oUe_jpe1P_je3orsCKS8pMbR9kxdZs',
    },
  })
    .then((response) => {
      if (response.ok) {
        alert('Gattino salvato con successo!')
        form.reset()
      } else {
        throw new Error('Errore nel salvataggio del gattino')
      }
    })
    .catch((error) => {
      console.log('Errore:', error)
    })
})
