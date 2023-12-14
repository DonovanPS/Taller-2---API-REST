const express = require('express')
const cors = require('cors');
const app = express()

//connect-DB
require('./drivers/connect-db')

//setters
app.set('PORT',process.env.PORT || 3000 )

//middlewares
app.use(express.json())
app.use(cors());

app.use("/products", require('./routers/products'))
app.use("/sales", require('./routers/sales'))
app.use("/categories", require('./routers/categories'))

app.listen(app.get('PORT'),()=>console.log(`Sever Listen to Port ${app.get('PORT')}`))