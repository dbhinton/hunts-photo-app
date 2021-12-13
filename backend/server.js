import express from 'express'
import dotenv from 'dotenv'
import connectDatabase from './config/database.js'
import productRoutes from './routes/api/productRoutes.js'
import userRoutes from './routes/api/userRoutes.js'
import {notFound, errorHandler} from './middleware/error.js'




const app = express()

app.use(express.json())

dotenv.config()

connectDatabase()




const PORT = process.env.PORT || 3001
app.listen(3001, console.log(`server running in ${process.env.NODE_ENV} on port ${PORT}`))

app.get('/', (req, res) => {
    res.send('api is running')
})

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

app.use(notFound)
app.use(errorHandler)