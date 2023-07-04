import User from "../models/User.js";
import {errorResponse, successResponse, warningResponse} from "../utils/response.js";

import {deleteImage, loadImage} from "../utils/files.js";

export const getUsers = async (req, res) => {
    console.log('GET_USERS')
    console.log(req.query)
    const limit = req.query._limit
    const page = req.query._page
    try{
        const users = await User.find().limit(limit).skip(page*limit)
        console.log(users)
        const total = await User.find().countDocuments()
        return successResponse(res, 'Користувачів отримано', {users, total})
    }
    catch (err){errorResponse(res, 'помилка при пошуку користувача', err )}
}
export const deleteUser = async (req, res) => {
    console.log('DELETE_USER')
    try{
        const user = await User.findById(req.params.id, {imgUrl: 1})
        if(user){
            deleteImage(user.imgUrl)
            user.deleteOne()
            return successResponse(res, 'користувача видалено', {user})
        }
        return warningResponse(res, 'немає такого користувача')
    }
    catch (err){return errorResponse(res, 'помилка при видаленні користувача', err )}
}

export const createAvatar = async (req, res) =>{
    console.log('CREATE_AVATAR')
    const userId = req.userId
    try{
        if (req.files){
            const oldUser = await User.findById(userId, {imgUrl: 1})
            const fileName = loadImage(req.files.image, oldUser.imgUrl)
            const user = await User.findByIdAndUpdate(userId, {$set: {imgUrl : fileName}}, {new: 1})
            console.log(user)
            return successResponse(res, 'Аватар додано', {user})
        }
        return warningResponse(res, 'додайте аватар')
    }
    catch(err){return errorResponse(res, 'Помилка при створенні аватару', err)}
}