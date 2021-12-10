import express from 'express'
const router = express.Router()
import Product from '../../models/Product.js'
// import productIndex from '../../controllers/products.js'
// import productDetail from '../../controllers/products.js'

async function productIndex(req, res){
    try {
        const products = await Product.find({})
        console.log(products)
        res.json(products)
    } catch (error) {
        console.log({message: 'products not found'})
    }
}

async function productDetail(req, res){
    try {
        const product = await Product.findById(req.params.id)
        if(product){
            res.json(product)
        }else{
            res.status(404)
            throw new Error('product not found')
        }
        
    } catch (error) {
        console.log({message: 'product id not found'})
    }
}

router.get('/', productIndex)

router.get('/:id', productDetail)
 
export default router
  