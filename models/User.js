import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
{
        name:{
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        role:{
            type: String,
            default: 'user'
        },
        imgUrl:{
            type: String,
            default: '',
        },
        email:{
            type: String,
            required: true,
            unique: true,
        },
        tel:{
            type: String,
            required: true,
            unique: true,
        },
        comments:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Comment'
            }
        ],
        reviews:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review'
        }],
        evals:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Eval'
        }],
        favorites: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }],
        rating:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Rating'
            }
        ]
    },
    {timestamps: true}

)

export default mongoose.model('User', UserSchema)