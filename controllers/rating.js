import Rating from '../models/Rating.js'
import Product from "../models/Products.js"
import User from '../models/User.js'
import Comment from '../models/Comment.js'
import {errorResponse, successResponse} from "../utils/response.js";


const avgRating = async (product) => {
    console.log('!!!!!!!!!!!!!!!!!!!!!!')
    const [average] = await Rating.aggregate([ {$match : {$expr:{$eq:['$product', {$toObjectId: product}]}}},
        { $group: {_id: 'averageRating' ,averageRating: { $avg: '$value' } } }  ])
    return Math.ceil(average.averageRating*10)/10
}
export const addRating = async (req, res) => {
    console.log('RATING')
    const {value} = req.body
    const product = req.params.id
    const user = req.userId
    try {
        let rating = await Rating.findOne({user, product })

        const comment = await Comment.findOne({user, product})
        //Рейтинга нет
        if (!rating) {
            //Комментарий есть
            if (comment) {
                rating = new Rating({value, user, product, comment})
                await comment.updateOne({rating})
            }
            //Комментария нет
            else {
                rating = new Rating({value, user, product})
            }

            await rating.save()

            const averageRating = await avgRating(product)

            await Product.findByIdAndUpdate(product, {$push: {rating}, averageRating })
            await User.findByIdAndUpdate(user, {$push: {rating}})

            return successResponse(res, 'Рейтинг додано', {averageRating, rating})
        }
         else{
            await Rating.findByIdAndUpdate(rating._id, {value}, {new: true})

            const averageRating = await avgRating(product)

            await Product.findByIdAndUpdate(product, {averageRating}, {new: true})

            return successResponse(res, 'Рейтинг змінено', {averageRating})
        }
    }
    catch(err){return errorResponse(res, 'Помилка обиранні рейтингу', err)}
}

