import jwt from 'jsonwebtoken'
import {errorResponse, warningResponse} from "./response.js";
export const checkAuth = (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/,'')
    if(token){
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.userId = decoded.id
            next()
        }
        catch (error){ errorResponse(res, 'Помилка при реєстрації чи логінізації')}
    }
    else{ warningResponse(res, 'Війдіть в систему чи зареєєструйтеся')}
}
