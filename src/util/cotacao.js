const request = require('request')

const api_token = `khLNvRTYjtdz5QkkeDdgRrxdT9VPAatTrJYqJo5qqxWejv597dV6wtdDdQgb`

const _cotacao = (symbol, callback) => {

    const url = `https://www.worldtradingdata.com/api/v1/stock?symbol=${symbol}&api_token=${api_token}`

    request({ url: url, json: true }, (err, response) => {
        if (err) {
            callback({
                message: `Something went wrong: ${err}`,
                code: 500
            }, undefined)
        }

        if (response.body.data === undefined || response.body === undefined) {
            callback({
                message: `No data found`,
                code: 404
            }, undefined)
        }

        if(response.body.data){
            const parsedJSON = response.body.data[0]
            const { symbol, price_open, price, day_high, day_low } = parsedJSON
            callback(undefined, { symbol, price_open, price, day_high, day_low })
        }
    })
}

module.exports = {
    cotacao: _cotacao
}