import Eval from "../models/Eval.js"
import Review from "../models/Review.js"
import User from "../models/User.js";
import {errorResponse, successResponse} from "../utils/response.js";

const countAndResp = async (evaluate, text='') => {
    //Всего оценок
    const totalEval = await Eval.find().countDocuments()
    //Посчитать среднюю оценку
    const [average] = await Eval.aggregate([{ $group: { _id: 'averageEval', averageEval: { $avg: '$value' }}}])
    const averageEval = Math.ceil(average.averageEval*10)/10
    //Выводим оценку
    return {
        totalEval,
        evaluate,
        averageEval,
        message: `Оцінку ${text}`,
        typeMessage:'success'
    }
}

export const createEval = async (req, res) => {
    console.log('CREATE EVAL')
    const user = req.userId
    const value = req.body.value
    try{
        //Ищем оценку от этого пользователя
        let evaluate = await Eval.findOne({user})
        //Ищем комментарий к сервису от этого пользователя
        let review = await Review.findOne({user})
        //Если нет оценки
        if(!evaluate){
            //Если есть комментарий
            if(review){
                //Создаем оценку и добавляем в нее комментарий и пользователя
                evaluate = new Eval({value, review, user})
                //В комментарий добавляем оценку
                await Review.findByIdAndUpdate(review._id, {eval: evaluate}, {new: true})
            }
            //Если нет комментария
            else{
                //Создаем оценку
                evaluate = new Eval({value, user})
            }
            //Сохраняем оценку
            await evaluate.save()
            //Добавляем оценку пользователю
            await User.findByIdAndUpdate(user, {$push: {evals: evaluate}})
            // Считаем и выводим оценку и среднюю оценку
            return res.json(await countAndResp(evaluate, 'додано'))
        }
        //Если есть оценка
         else{
            //Меняем оценку
            evaluate = await Eval.findByIdAndUpdate(evaluate._id, {value},  {new: true})
            // Считаем и выводим оценку и среднюю оценку
            return res.json(await countAndResp(evaluate, 'змінено'))
        }
    }
    catch{ errorResponse(res, 'Оцінку не додано')}
}

export const getEval = async (req, res) => {
    console.log('GET EVAL')
    try{
        return res.json(await countAndResp())
    }
    catch{ errorResponse(res, 'Оцінку не отримано')}
}



