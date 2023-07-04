import { Router } from 'express'
import {changeContact, getContact} from "../controllers/main.js";
import {checkAuth} from "../utils/checkAuth.js";

const router = new Router()

router.put('/',checkAuth, changeContact)

router.get('/', getContact)
export default router