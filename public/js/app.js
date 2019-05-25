const cotacoesForm = document.querySelector('form')
const mainMessage = document.querySelector('h3')
const price = document.querySelector('#price')
const priceOpen = document.querySelector('#price_open')
const dayHigh = document.querySelector('#day_high')
const dayLow = document.querySelector('#day_low')

cotacoesForm.addEventListener('submit', () => {
    mainMessage.innerText = 'Buscando...'
    price.innerText = ''
    priceOpen.innerText = ''
    dayHigh.innerText = ''
    dayLow.innerText = ''
    event.preventDefault()
    const ativo = document.querySelector('input').value

    if(!ativo){
        mainMessage.innerText = 'O ativo deve ser informado'
        return
    }

    fetch(`http://localhost:3000/cotacoes?ativo=${ativo}`)    
        .then((response) => {
            response.json().then((data) => {
                if (data.error) {                    
                    mainMessage.innerText = `;( Something went wrong...`
                    price.innerText = `código ${data.error.code} | ${data.error.message}` 
                } else {
                    document.querySelector('input').value = ""
                    mainMessage.innerText = data.symbol
                    price.innerText = `Price: $ ${data.price}`
                    priceOpen.innerText = `Open: $ ${data.price_open}`
                    dayHigh.innerText = `High: $ ${data.day_high}`
                    dayLow.innerText = `Low: $ ${data.day_low}`

                }
            })
        })
})