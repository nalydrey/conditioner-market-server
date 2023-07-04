import Faq from "../models/Faq.js";
import {errorResponse, successResponse} from "../utils/response.js";

export const getFaqs = async (req, res) => {

    console.log('GET_FAQS')
    try{
        const faqs = await Faq.find()
        successResponse(res, 'Питання отриманні', {faqs})
    }
    catch(err){errorResponse(res, 'Помилка отриманні частих питань', err)}
}

export const createFaq = async (req, res) => {
    console.log('CREATE_FAQ')
    const {title, text} = req.body
    try{
        const faq = new Faq({title, text})
        await faq.save()
        successResponse(res, 'Питання створено', {faq})
    }
    catch(err){errorResponse(res, 'Помилка при створенні частих питань', err)}
}

export const changeFaq = async (req, res) => {
    console.log('CHANGE FAQ')
    const {title, text} = req.body
    try{
        const faq = await Faq.findByIdAndUpdate(req.params.id, {title, text}, {new: true})
        successResponse(res, 'Питання змінено', {faq})
    }
    catch(err){errorResponse(res, 'Помилка при зміні частого питання', err)}

}

export const deleteFaq = async (req, res) => {
    console.log('DELETE FAQ')
    try{
        await Faq.findByIdAndDelete(req.params.id)
        successResponse(res, 'Питання видалене')
    }
    catch(err){errorResponse(res, 'Помилка при видаленні частого питання', err)}
}