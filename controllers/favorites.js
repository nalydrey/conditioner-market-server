import Product from "../models/Products.js";
import User from "../models/User.js";
import {errorResponse, successResponse} from "../utils/response.js";

export const getFavorites = async (req, res) => {
    console.log('GET_FAVORITES')
    console.log(req.query)
    const {_limit, _page} = req.query
    try{
        const products = await Product.find(({'favorites.0': {$exists: true}})).limit(_limit).skip(_limit*_page)
        const total = await Product.find(({'favorites.0': {$exists: true}})).countDocuments()
         return successResponse(res, 'Обрані отримано', {products, total})
    }
    catch (err){ return errorResponse(res, 'Помилка при отриманні обраних', err)}
}
export const myFavorite = async (req, res) => {
    console.log('MY_FAVORITES')
    const user = req.userId
    try{
        const my = await User.findById(user, {favorites: 1}).populate('favorites')
        return successResponse(res, 'Мої обрані отримано', {favorites: my.favorites})
    }
    catch (err){ return errorResponse(res, 'Помилка при отриманні моїх обраних', err)}
}

export const addDelFavotive = async (req, res) =>{
    console.log('FAVORITES')
    const user = req.userId
    try{
        let product = await Product.findOne({_id: req.params.id,  favorites: user})
        console.log(product)
        if(product){
            await User.findByIdAndUpdate(user, {$pull: { favorites: product._id }})
            await Product.findByIdAndUpdate(req.params.id, { $pull: { favorites: user }})
            return successResponse(res, 'Видалено з улюблених', {isAdd: false})
        }
        product = await Product.findByIdAndUpdate(req.params.id, { $push: { favorites: user }})
        await User.findByIdAndUpdate(user, { $push: { favorites: product }})
        return successResponse(res, 'Додано до улюблених', {isAdd: true})

    }
    catch(err){ return errorResponse(res, 'Помилка при зміні обраних', err)}
}