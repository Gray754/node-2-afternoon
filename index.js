require('dotenv').config()
const express = require('express')
const {json} =  require('body-parser')
const massive = require('massive')
const app = express()
const {create, getOne, getAll, update, deleteFn} = require('./products_controller')


app.use(json())

massive(process.env.CONNECTION_STRING).then(dbInstance=>{
    // console.log(dbInstance)
    app.set('db', dbInstance)
}).catch(err=>{
    console.log(err)
})

app.get('/api/products', getAll)
app.get('api/products/:id', getOne)

app.put('/api/products/:id?desc=', update)

app.post('/api/products', create)

app.delete('/api/products/:id', deleteFn)

const port = process.env.PORT || 3000
app.listen(port, ()=>{
    console.log(`Listening on port ${port}`)
})