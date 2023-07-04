import {errorResponse} from "../utils/response.js";
import Main from "../models/main.js";
export const changeContact = async (req, res) => {
    console.log(req.body)
    const {name, tel, viber, telegram, watsapp} = req.body
    try{
        const main = await Main.findByIdAndUpdate('64289f1bf3493ffd652748da', {name, tel, viber, telegram, watsapp}, {new: 1})

        return res.json(main)
    }
    catch (err){ return errorResponse(res, 'Помилка при зміні данних', err)}
}
export const getContact = async (req, res) => {
    try{
        const main = await Main.findByIdAndUpdate('64289f1bf3493ffd652748da', {$inc:{counter: 1 }}, {new: 1})
        console.log(main)
        return res.json(main)
    }
    catch (err){ return errorResponse(res, 'Помилка при отриманні данних', err)}
}



