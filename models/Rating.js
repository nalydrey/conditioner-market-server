import mongoose from "mongoose"

const serviceSchema = new mongoose.Schema(
    {

        value: {
            type: Number,
            required: true
        },
        comment:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        },
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        product:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    }
)

export default mongoose.model('Rating', serviceSchema)