import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import path, {dirname} from 'path'
import {fileURLToPath} from "url";
import Product from "../models/Products.js";
import {errorResponse, infoResponse, successResponse, warningResponse} from "../utils/response.js";
import {loadImage} from "../utils/files.js";

//Register
export const register = async (req, res) => {
    console.log('REGISTER')
    try{
        const {name, password, email, tel} = req.body
//Ищем в модели элемент по имени пользователя
        const isUsed = await User.findOne({email})

        if(isUsed) {
            return infoResponse(res, 'Не можна зареєструвати такий email')
        }
//Получаем новый хешированный пароль
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
//Сoздаем нового пользователя
        const newUser = new User({
            name,
            email,
            tel,
            password: hash
        })
//Сохраняем созданного пользователя а БД
        await newUser.save()
        const token = jwt.sign(
            {id: newUser._id},
            process.env.JWT_SECRET,
            {expiresIn: '1h'}
        )
        return successResponse(res, 'Зареєстровано', {
            token,
            newUser})
    }
    catch(err){return errorResponse(res, 'Ошибка при создании пользователя', err)}
}
//Login
export const login = async (req, res) => {
    console.log('LOGIN')
    try {
        const {email, password} = req.body
        console.log(email, password)

        const user = await User.findOne({email})
        console.log(user)
        if (user) {
            const isPasswordCorrect = await bcrypt.compare(password, user.password)
            console.log(isPasswordCorrect)
            if (isPasswordCorrect) {
                const token = jwt.sign(
                    {id: user._id},
                    process.env.JWT_SECRET,
                    {expiresIn: '1d'}
                )
                return successResponse(res, 'Успешный вход в систему', {
                    token,
                    user
                })
            }

            return warningResponse(res, 'Неверный пароль')
        }

        return warningResponse(res, 'Нет пользователя с таким именем')
    }
    catch(err){return errorResponse(res, 'Помилка при логінізації', err)}
}
//Get me
export const getMe = async (req, res) => {
    console.log("GET ME")
    try{
        const user = await User.findById(req.userId)
        console.log(user)
        if(!user){
            return warningResponse(res, 'такого пользователя не существует')
        }
        const token = jwt.sign(
            {id: user._id},
            process.env.JWT_SECRET,
            {expiresIn: '1d'}
        )
        return successResponse(res, '', {
            token,
            user,
        })
    }
    catch(err){return errorResponse(res, 'нет доступа', err)}
}


