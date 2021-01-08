import express from 'express'
import data from './data.js'

const app = express()

app.get('/api/products', (req, res) => {
    console.log("/api/products")
    res.send(data.products)
})

app.get('/api/products/:id', (req, res) => {
    console.log("/api/products/"+req.params.id)
    const product = data.products.find( x => x._id === req.params.id)
    if (product) res.send(product)
    else res.status(404).send({ message: 'Product not found'})
})

app.get('/', (req, res) => {
    console.log("/")
    res.send('Server is ready')
})

const port = process.env.PORT || 5000
app.listen(port, () =>{
    console.log(`Serve at http://localhost:${port}`);
})