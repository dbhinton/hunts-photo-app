import mongoose from 'mongoose'

const connectDatabase = async () => {
    try{
        const conn = await mongoose.connect(
            process.env.DATABASE_URL, {
                useUnifiedTopology: true,
                useNewUrlParser: true
            }
        )
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    }catch(error){
        console.log(`Error: ${error.message}`)
        process.exit(1)

    }
}

export default connectDatabase
