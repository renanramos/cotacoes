const path = require('path')
const express = require('express')
const hbs = require('hbs')
const cotacao = require('./util/cotacao')

const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Cotações',
        author: 'Renan Ramos'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Sobre',
        author: 'Renan Ramos'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Ajuda',
        author: 'Renan Ramos'
    })
})

app.get('/cotacoes', (req, res) => {

    if (!req.query.ativo) {
        return res.status(400).send({
            error: {
                code: 400,
                message: 'O ativo deve ser informado como query parameter'
            }
        })
    }

    const symbol = req.query.ativo.toUpperCase()

    cotacao.cotacao(symbol, (err, body) => {
        if (err) {
            const { message } = err
            return res.status(err.code).json({
                error: {
                    code: err.code,
                    message: err.message
                }
            })
        }
        res.status(200).json(body)
    })

})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Esta página não foi encontrada!',
        author: 'Renan Ramos'
    })
})

app.listen(3000, () => {
    console.log('server is up on port 3000')
})