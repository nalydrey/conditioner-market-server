import mongoose from "mongoose"

const mainSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        tel:{
            type: String,
            required: true
        },
        telegram:{
            type: String
        },
        viber:{
            type: String
        },
        watsapp:{
            type: String
        },
        counter:{
            type: Number,
            default: 0
        }
    }
)

export default mongoose.model('Main', mainSchema)