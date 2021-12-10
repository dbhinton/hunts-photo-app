import mongoose from 'mongoose'

const reviewSchema = mongoose.Schema({
    name: {type: String, required: true},
    rating: {type: Number, required: true},
    comment: {type: String, required: true},
}, {
    timestamps: true
})

const productSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    name: {
        type: String,
        uppercase: true,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String
    },
    rating: {
        type: Number,
        required: true,
        default: 0
    },
    reviews: [reviewSchema],
    countInStock: {
        type: Number,
        required: true,
        default: 0
    },
    brand: {
        type: String,
        required: true
    },
    category: {
        type: String, required: true
    },
    numReviews: {
        type: Number,
        required: true,
        default: 0
    },
    createdBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
    }


},{timestamps: true})

const Product = mongoose.model('Product', productSchema)
export default Product