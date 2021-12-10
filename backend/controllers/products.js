// import Product from '../models/Product.js'
// const S3 = require("aws-sdk/clients/s3");
// const s3 = new S3();
// const {v4: uuidv4} = require("uuid");
// const BUCKET_NAME = process.env.BUCKET_NAME;


// export default async function productIndex(req, res){
//     try {
//         const products = await Product.find({})
//         res.json(products)
//     } catch (error) {
//         console.log(err)
//     }
// }

// export async function productDetail(req, res){
//     try {
//         const product = await Product.findById(req.params.id)
//         if(product){
//             res.json(product)
//         }else{
//             res.status(404).json({message: 'Product not found'})
//         }
        
//     } catch (error) {
//         console.log(err)
//     }
// }
