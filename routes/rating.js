import { Router } from 'express'
import {addRating} from "../controllers/rating.js";
import {checkAuth} from "../utils/checkAuth.js";

const router = new Router()


router.post('/:id',checkAuth, addRating)

export default router