import mongoose from "mongoose"

const serviceSchema = new mongoose.Schema(
    {
        text: {
            type: String,
            required: true
        },
        rating:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Rating'
        },
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        product:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    },
    {timestamps: true}
)

export default mongoose.model('Comment', serviceSchema)