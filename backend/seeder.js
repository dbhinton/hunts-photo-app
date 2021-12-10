import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/users.js'
import products from './data/products.js'
import User from './models/User.js'
import Product from './models/Product.js'
import Order from './models/Order.js'
import connectDatabase from './config/database.js'

dotenv.config()

connectDatabase()

const importData = async () => {
    try {
        await Order.deleteMany()
        await User.deleteMany()
        await Product.deleteMany()

        const createdUsers = await User.insertMany(users)
        const adminUser = createdUsers.find((u) => u.isAdmin === true)[0]

        const sampleProducts = products.map(product => {
            return {...product, user:adminUser}
        })

        await Product.insertMany(sampleProducts)

        console.log('Data Imported ')
        process.exit()

    } catch (error) {
        console.log(`Sample Data Import Error Message: ${error}`)
    }
}

const destroyData = async () => {
    try {
        await Order.deleteMany()
        await User.deleteMany()
        await Product.deleteMany()

        console.log('Data Destroyed ')
        process.exit()

    } catch (error) {
        console.log(`Sample Data Destroy Error Message: ${error}`)
        process.exit(1)
    }
}

if(process.argv[2] === '-d'){
    destroyData()
}else{
    importData()
}