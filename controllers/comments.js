import Comment from '../models/Comment.js'
import User from "../models/User.js"
import Product from "../models/Products.js"
import Rating from "../models/Rating.js";
import {login} from "./auth.js";
import {errorResponse, infoResponse, successResponse} from "../utils/response.js";
export const createComment = async (req, res) => {
    console.log('CREATE_COMMENT')
    const {text} = req.body
    const product = req.params.id
    const user = req.userId
    try{
        let comment = await Comment.findOne({user, product})
        const rating = await Rating.findOne({user, product})
        //Коментарий нет
        if(!comment){
            //Оценка есть
            if(rating){
                comment = new Comment({ text, user, product, rating})
                await rating.updateOne({comment})
            }
            //Оценки нет
            else comment = new Comment({text, user, product})

            await comment.save()
            comment = await Comment.findById(comment._id).populate('user', 'name imgUrl').populate('rating', 'value')
            await User.findByIdAndUpdate(user, {$push: {comments: comment}})
            await Product.findByIdAndUpdate(product, {$push: {comments: comment}})

            return successResponse(res, 'Коментар створено', {comment})
        }
        return infoResponse(res, 'Ви вже додавали коментар до цього товару')
    }
    //Коментария есть
    catch(err){return errorResponse(res, 'Помилка при створенні коментарю', err)}
}

export const changeComment = async (req, res) => {
    console.log('CREATE_COMMENT')
    const text = req.body.text
    const commentId = req.params.id
    try{
        const comment = await Comment.findByIdAndUpdate(commentId, {text}, {new: 1})

        return successResponse(res, 'Коментар змінено', {comment})
    }
    catch(err){return errorResponse(res, 'Помилка при зміненні коментарю', err)}
}

export const getComments = async (req, res) => {
    console.log('GET_COMMENTS')
    const product = req.params.id
    try{
        const comments = await Comment.find({product}).populate('user', 'name imgUrl').populate('rating', 'value')
        return successResponse(res, 'Коментарі отримано', {comments})
    }
    catch(err){return errorResponse(res, 'Помилка при створенні коментарю', err)}
}

export const getMyComments = async (req, res) => {
    console.log('GET_MY_COMMENTS')
    console.log(req.params)
    const user = req.userId
    try{
        const comments = await Comment.find({user}).populate('product',{manufacture: 1, model: 1, imgUrl: 1}).populate('rating', 'value')
        return successResponse(res, 'Коментарі отримано', {comments})
    }
    catch(err){return errorResponse(res, 'Помилка при отриманні коментарю', err)}
}

export const deleteComment = async (req, res) =>{
    console.log('DELETE_COMMENT')
    const comment = req.params.id
    const user = req.userId
    try{
        const {product} = await Comment.findByIdAndDelete(comment)
        console.log(user, product)
        await User.findByIdAndUpdate(user, {$pull: {comments: comment}})
        await Product.findByIdAndUpdate(product, {$pull: {comments: comment}})
        await Rating.findOneAndUpdate({product, user}, {comment: null})
        return successResponse(res, 'Коментарі видалено')
    }
    catch(err){return errorResponse(res, 'Помилка при видаленні коментарю', err)}
}