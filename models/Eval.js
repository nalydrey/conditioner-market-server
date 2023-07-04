import mongoose from "mongoose"

const serviceSchema = new mongoose.Schema(
    {
        value: {
            type: Number,
            required: true
        },
        review:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review',
        },
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
    },
)

export default mongoose.model('Eval', serviceSchema)