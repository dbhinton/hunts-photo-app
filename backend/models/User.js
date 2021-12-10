import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        default: false
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
      },
    photoUrl: {type: String}

}, {
    timestamps: true
})

const User = mongoose.model('User', userSchema)

export default User