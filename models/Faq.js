import mongoose from "mongoose"

const serviceSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        text:{
            type: String,
            required: true
        }
    }
)

export default mongoose.model('Faq', serviceSchema)