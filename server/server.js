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

var itemPrices = ["1000", "5995", "1495", "1495", "495", "495"];

const storeItems = new Map([
    [1, {priceInCents: itemPrices[0], name: 'Item-1 Placeholder'}],
    [2, {priceInCents: itemPrices[1], name: 'Item-2 Placeholder'}],
    [3, {priceInCents: itemPrices[2], name: 'Item-3 Placeholder'}],
    [4, {priceInCents: itemPrices[3], name: 'Item-4 Placeholder'}],
    [5, {priceInCents: itemPrices[4], name: 'Item-5 Placeholder'}],
    [6, {priceInCents: itemPrices[5], name: 'Item-6 Placeholder'}],
])

const item_list = new Map([
    [1, {priceInCents: itemPrices[0], name: 'Item-1 Placeholder'}],
    [2, {priceInCents: itemPrices[1], name: 'Item-2 [XS] Placeholder'}],
    [3, {priceInCents: itemPrices[1], name: 'Item-2 [S] Placeholder'}],
    [4, {priceInCents: itemPrices[1], name: 'Item-2 [M] Placeholder'}],
    [5, {priceInCents: itemPrices[1], name: 'Item-2 [L] Placeholder'}],
    [6, {priceInCents: itemPrices[1], name: 'Item-2 [XL] Placeholder'}],
    [7, {priceInCents: itemPrices[2], name: 'Item-3 [XS] Placeholder'}],
    [8, {priceInCents: itemPrices[2], name: 'Item-3 [S] Placeholder'}],
    [9, {priceInCents: itemPrices[2], name: 'Item-3 [M] Placeholder'}],
    [10, {priceInCents: itemPrices[2], name: 'Item-3 [L] Placeholder'}],
    [11, {priceInCents: itemPrices[2], name: 'Item-3 [XL] Placeholder'}],
    [12, {priceInCents: itemPrices[3], name: 'Item-4 [XS] Placeholder'}],
    [13, {priceInCents: itemPrices[3], name: 'Item-4 [S] Placeholder'}],
    [14, {priceInCents: itemPrices[3], name: 'Item-4 [M] Placeholder'}],
    [15, {priceInCents: itemPrices[3], name: 'Item-4 [L] Placeholder'}],
    [16, {priceInCents: itemPrices[3], name: 'Item-4 [XL] Placeholder'}],
    [17, {priceInCents: itemPrices[4], name: 'Item-5 [XS] Placeholder'}],
    [18, {priceInCents: itemPrices[4], name: 'Item-5 [S] Placeholder'}],
    [19, {priceInCents: itemPrices[4], name: 'Item-5 [M] Placeholder'}],
    [20, {priceInCents: itemPrices[4], name: 'Item-5 [L] Placeholder'}],
    [21, {priceInCents: itemPrices[4], name: 'Item-5 [XL] Placeholder'}],
    [22, {priceInCents: itemPrices[5], name: 'Item-6 [XS] Placeholder'}],
    [23, {priceInCents: itemPrices[5], name: 'Item-6 [S] Placeholder'}],
    [24, {priceInCents: itemPrices[5], name: 'Item-6 [M] Placeholder'}],
    [25, {priceInCents: itemPrices[5], name: 'Item-6 [L] Placeholder'}],
    [26, {priceInCents: itemPrices[5], name: 'Item-6 [XL] Placeholder'}],
])

app.post('/create-checkout-session', async (req, res) => {
    try{
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: req.body.items.map(item => {
                const storeItem = item_list.get(item.id)
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

// app.get('/store', function(req, res) {
//     fs.readFile('items.json', function(error, data) {
//       if (error) {
//         res.status(500).end()
//       } else {
//         res.render('index.ejs', {
//           stripePublicKey: process.env.STRIPE_PRIVATE_KEY, //need to change to public
//           items: JSON.parse(data)
//         })
//       }
//     })
//   })

app.listen(3000)