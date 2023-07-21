require('dotenv').config()

const express = require('express')
const app = express()
const fs = require('fs')
const cors = require('cors')
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)


app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.static('public'))
app.use(
    cors({
        origin: 'http://localhost:5501',
    })
)
// app.use(express.static('public'))


const storeItems = new Map([
    [1, {priceInCents: 10000, name: 'Item-1 Placeholder'}],
    [2, {priceInCents: 20000, name: 'Item-2 Placeholder'}],
    [3, {priceInCents: 30000, name: 'Item-3 Placeholder'}],
    [4, {priceInCents: 40000, name: 'Item-4 Placeholder'}],
    [5, {priceInCents: 50000, name: 'Item-5 Placeholder'}],
    [6, {priceInCents: 60000, name: 'Item-6 Placeholder'}],
])

app.post('/create-checkout-session', async (req, res) => {
    try{
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: req.body.items.map(item => {
                const storeItem = storeItems.get(item.id)
                return {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: storeItem.name
                        },
                        unit_amount: storeItem.priceInCents
                    },
                    quantity: item.quantity
                }
            }),
            success_url: `${process.env.CLIENT_URL}/public/index.html`,    //make sure to make success page
            cancel_url: `${process.env.CLIENT_URL}/public/index.html`      //cancel can take back to home page
        })    //^need to save session info on return, look into cookies
        res.json({ url: session.url })
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
})

app.get('/store', function(req, res) {
    fs.readFile('items.json', function(error, data) {
      if (error) {
        res.status(500).end()
      } else {
        res.render('index.ejs', {
          stripePublicKey: process.env.STRIPE_PRIVATE_KEY, //need to change to public
          items: JSON.parse(data)
        })
      }
    })
  })

app.listen(3000)