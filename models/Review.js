import mongoose from "mongoose"

const serviceSchema = new mongoose.Schema(
    {
        text: {
            type: String,
            required: true
        },
        eval:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Eval'
        },
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
    },
    {timestamps: true}
)

export default mongoose.model('Review', serviceSchema)