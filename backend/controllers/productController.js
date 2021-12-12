import Product from '../models/Product.js'
import { S3Client as S3, AbortMultipartUploadCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from 'uuid';
const s3 = new S3();
const BUCKET_NAME = process.env.BUCKET_NAME;


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


export {productIndex, productDetail}