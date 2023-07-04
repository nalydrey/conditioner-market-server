import { Router } from 'express'
import {createEval, getEval} from "../controllers/evaluate.js";
import {checkAuth} from "../utils/checkAuth.js";

const router = new Router()


router.post('/',checkAuth, createEval )

router.get('/', getEval)
export default router