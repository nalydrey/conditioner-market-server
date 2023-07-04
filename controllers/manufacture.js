import Product from '../models/Products.js'
import {errorResponse, successResponse} from "../utils/response.js";
export const getManufactures = async (req, res) => {
    console.log('GET MANUFACTURES')
    try{
        const manufactures = await Product.find().distinct('manufacture')
        successResponse(res, 'Виробникыв отримано', {manufactures})
    }
    catch(err){errorResponse(res, 'Помилка при отриманні виробникыв', err)}
}