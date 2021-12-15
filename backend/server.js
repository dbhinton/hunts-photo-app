import express from 'express'
import dotenv from 'dotenv'
import connectDatabase from './config/database.js'
import productRoutes from './routes/api/productRoutes.js'
import userRoutes from './routes/api/userRoutes.js'
import {notFound, errorHandler} from './middleware/error.js'
import path from 'path'


console.log('hello')

const app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json())

dotenv.config()

connectDatabase()


app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);



const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.use(express.static(path.join(__dirname, 'build')));
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '/frontend/build')))

//   app.get('*', (req, res) =>
//     res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
//   )
// } else {
//   app.get('/', (req, res) => {
//     res.send('API is running....')
//   })
// }
// console.log(__dirname)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, console.log(`server running in ${process.env.NODE_ENV} on port ${PORT}`))