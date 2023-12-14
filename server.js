const express = require('express')
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const cors = require('cors');
const app = express()

//connect-DB
require('./drivers/connect-db')

//setters
app.set('PORT',process.env.PORT || 3000 )

//middlewares
app.use(express.json())

const options = {
    swaggerDefinition: {
        info: {
            title: 'API de Ventas',
            version: '1.0.0',
            description: 'API de Ventas',
        }
    },
    apis: ['swagger.yaml']
}

const swaggerUiOptions = {
    cusstomCss: ".scheme-container {display: none}"
}

const specs = swaggerJSDoc(options);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs, swaggerUiOptions))
app.use(cors());

app.use("/products", require('./routers/products'))
app.use("/sales", require('./routers/sales'))
app.use("/categories", require('./routers/categories'))

app.listen(app.get('PORT'),()=>console.log(`Sever Listen to Port ${app.get('PORT')}`))