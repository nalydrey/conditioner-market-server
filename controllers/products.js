import Product from '../models/Products.js'
import {errorResponse, successResponse, warningResponse} from "../utils/response.js";
import Rating from "../models/Rating.js";
import Comment from "../models/Comment.js";
import User from "../models/User.js";
import {deleteImages, loadImages} from "../utils/files.js";

export const createProduct = async (req, res) => {
    console.log('PRODUCT POST')
    try{
        const product = new Product({...req.body})

        await product.save()
        return successResponse(res, 'Товар створено', {product})
    }
    catch(err){return errorResponse(res, 'Помилка при створенні товару', err)}
}

export const getAll = async (req, res) => {
    console.log('GET PRODUCTS')
    try{
        const _page = req.query._page || 0
        const _limit =  req.query._limit || 0
        const _sort = req.query._sort
        const _dir = +req.query._dir || 0
        const q = req.query
        delete q._limit
        delete q._sort
        delete q._page
        delete q._dir

        const totalCount = await Product.find(q).countDocuments()
        const products = await Product.find(q).limit(_limit).skip(_page*_limit).sort({[_sort]: _dir})

        return successResponse(res, 'Товар успішно завантажено', {totalCount, products})
    }
    catch(err){return errorResponse(res, 'Помилка при зчитуванні', err)}
}

export const deleteProduct = async (req, res) => {
    console.log('Delete PRODUCT')
    const product = req.params.id
    try{
        const prod = await Product.findById(product, {rating: 1, favorites: 1, comments: 1, imgUrl: 1})
        console.log(prod)
        await Promise.all(prod.rating.map(async el => await User.findOneAndUpdate({rating: el}, {$pull: {rating: el}})))
        await Promise.all(prod.favorites.map(async el => await User.findByIdAndUpdate(el, {$pull: {favorites: product}})))
        await Promise.all(prod.comments.map(async el => await User.findOneAndUpdate({comments: el}, {$pull: {comments: el}})))
        await Rating.deleteMany({product})
        await Comment.deleteMany({product})
        prod.deleteOne()

        deleteImages(prod.imgUrl)

        return successResponse(res, 'Товар видалено')
    }
    catch(err){return errorResponse(res, 'Помилка при видаленні товару', err)}
}

export const editProduct = async (req, res) =>{
    console.log("EDIT PRODUCT")
    delete req.body.imgUrl
    const productId = req.params.id
    try {
        const product = await Product.findByIdAndUpdate(productId, {...req.body})
        if (product){
            return successResponse(res, 'Картку оновлено товару')
        }
        return warningResponse(res, 'Такої картки не існує')
    }
    catch(err){return errorResponse(res, 'Помилка при редагуванны товару', err)}
}

export const createImage = async (req, res) =>{
    console.log('CREATE IMAGE')
    const productId = req.params.id
    try{
        if(req.files){
            const prod = await Product.findById(productId)
            let images = loadImages(req.files, prod.imgUrl)

            const product = await Product.findByIdAndUpdate(productId, {$set: {imgUrl : images}}, {new: true})
            return successResponse(res, 'Малюнок додано', {product})
        }
        return warningResponse(res, 'Оберіть малюнок')
    }
    catch(err){return errorResponse(res, 'Помилка при додаванні малюнку', err)}
}

export const getProduct = async (req, res) => {
    console.log('GET_PRODUCT')
    try{
        const product = await Product.findByIdAndUpdate(req.params.id, {$inc : { views : 1}}, {new: true})
        return successResponse(res, 'Продукт отримано', {product})
    }
    catch(err){return errorResponse(res, 'Помилка при отриманні продукту', err)}
}
