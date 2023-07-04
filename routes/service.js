import {Router} from "express";
import {changeService, createService, deleteService, getService} from "../controllers/service.js";
import {checkAuth} from "../utils/checkAuth.js";

const router = new Router()

router.post('/',checkAuth, createService)

router.get('/', getService)

router.put('/:id',checkAuth, changeService)

router.delete('/:id',checkAuth, deleteService)



export default router

