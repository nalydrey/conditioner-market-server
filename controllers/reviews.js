import Review from "../models/Review.js";
import Eval from "../models/Eval.js";
import User from "../models/User.js";
import {errorResponse, infoResponse, successResponse} from "../utils/response.js";

export const createReview = async (req, res) => {
    console.log('CREATE REVIEW')
    const user = req.userId
    const {text} = req.body
    try{
        //Ищем отзыв по пользователю
        let review = await Review.findOne({user})
        //Ищем оценка по пользователю
        let evaluate = await Eval.findOne({user})
        //отзыва нет
        if(!review) {
            //оценка есть
            if(evaluate){
                //Создаем отзыв , добавляем в него оценку,  и пользователя
                review = new Review({text, user, eval: evaluate})
                //Добавляем отвыв в оценки
                await Eval.findByIdAndUpdate(evaluate._id, {review})
            }
            //оценки нет
            else{
                //Создаем отзыв и добавляем в него пользователя
                review = new Review({text, user})
            }
            //Сохраняем отзыв
            await review.save()

            review = await Review.findById(review._id).populate('user', 'imgUrl name').populate('eval', 'value')
            //Считаем общее колличество отзывов
            const totalReviews = await Review.find().countDocuments()
            //Добавляем отзыв пользователю
            await User.findByIdAndUpdate(user, {$push: {reviews: review}})
            //Возвращаем результат
            return successResponse(res,'Відгук створено', {review, totalReviews})
        }
        else return infoResponse(res, 'Ви вже додавали відгук')
    }
    catch {return errorResponse(res,'Відгук не створено')}
}

export const changeReview = async (req, res) => {
    console.log('CHANGE REVIEW')
    const {id} = req.params
    const {text} = req.body
    try{
        //Поменять отзыв
        const review = await Review.findByIdAndUpdate(id, {text}, {new: true})
        //Возвращаем результат
        return successResponse(res,'Відгук змінено', {review} )
    }
    catch {return errorResponse(res,'Відгук не створено')}
}

export const deleteReview = async (req, res) => {
    console.log('DELETE REVIEW')
    const {id} = req.params
    try{
        //Удалить отзыв
        const review = await Review.findByIdAndDelete(id)
        await User.findByIdAndUpdate(review.user, {$pull: {reviews: id}})
        await Eval.findByIdAndUpdate(review.eval, {review: null})
        //Считаем общее колличество отзывов
        const totalReviews = await Review.find().countDocuments()
        //Возвращаем результат
        return successResponse(res,'Відгук видалено', {review, totalReviews})
    }
    catch {return errorResponse(res,'Відгук не видалено')}
}

export const getReviews = async (req, res) => {
    console.log('GET REVIEWS')
    try{
        const reviews = await Review.find({}).populate('user', 'imgUrl name').populate('eval', 'value')
        //Считаем общее колличество отзывов
        const totalReviews = await Review.find().countDocuments()
        //Возвращаем результат
        return successResponse(res,'Відгук отримано', {reviews, totalReviews})
    }
    catch {return errorResponse(res,'Відгук не отримано')}
}