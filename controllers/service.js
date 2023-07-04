import Service from '../models/Service.js'
import {errorResponse, successResponse} from "../utils/response.js";

export const createService = async (req, res) => {
    console.log('CREATE_SERVICE')
    try {
        const service = new Service(req.body)
        await service.save()
        return successResponse(res, 'Послугу створено', {service})
    }
    catch(err){return errorResponse(res, 'Послугу не створено', err)}
}

export const getService = async (req, res) => {
    console.log('GET_SERVICE')
    try{
        const service = await Service.find()
        return successResponse(res, 'Послугу отримано', {service})
    }
    catch(err){return errorResponse(res, 'Помилка при отриманні послуг', err)}
}

export const changeService = async (req, res) => {
    console.log('CHANGE_SERVICE')
    const {label, price } = req.body
    try{
        const service = await Service.findByIdAndUpdate(req.params.id, {label, price}, {new: true})
        return successResponse(res, 'Послугу оновлено', {service})
    }
    catch(err){return errorResponse(res, 'Помилка при оновленні послуг', err)}
}

export const deleteService = async (req, res) => {
    console.log('DELETE_SERVICE')
    try{
        await Service.findByIdAndDelete(req.params.id)
        return successResponse(res, 'Послугу видалено')
    }
    catch(err){return errorResponse(res, 'Помилка при видаленні послуг', err)}
}
