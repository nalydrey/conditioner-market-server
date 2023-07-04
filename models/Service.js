import mongoose from "mongoose"

const serviceSchema = new mongoose.Schema(
    {
        label: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true,
            default: 0
        }
    }
)

export default mongoose.model('Service', serviceSchema)