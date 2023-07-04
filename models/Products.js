import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
    {
        model:{
            type: String,
            required: true
        },
        imgUrl:[{
            type: String,
            default: ''
        }],
        manufacture:{
            type: String,
            required: true
        },
        price:{
            type: Number,
            required: true
        },
        description:{
            type: String
        },
        views:{
            type: Number,
            default: 0
        },
        favorites: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],
        rating:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Rating'
            }
        ],
        averageRating:{
            type: Number,
            required: true,
            default: 0
        },
        comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Comment'
            }
        ],
        characteristics:[
            {
                label:{
                    type:String,
                    required:true
                },
                value:{
                    type:String,
                    required:true
                },
                unit:{
                  type: String
                }
            }
        ]
    },
    {timestamps: true}

)

export default mongoose.model('Product', ProductSchema)