import express from 'express'
import dotenv from 'dotenv'
import connectDatabase from './config/database.js'
import products from './routes/api/products.js'
import {notFound, errorHandler} from './middleware/error.js'
// import users from './routes/api/users.js'



const app = express()

dotenv.config()

connectDatabase()




const PORT = process.env.PORT || 3001
app.listen(3001, console.log(`server running in ${process.env.NODE_ENV} on port ${PORT}`))

app.get('/', (req, res) => {
    res.send('api is running')
})

app.use('/api/products', products);

app.use(notFound)
app.use(errorHandler)