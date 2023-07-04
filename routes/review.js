import { Router } from 'express'
import {changeReview, createReview, deleteReview, getReviews} from "../controllers/reviews.js";
import {checkAuth} from "../utils/checkAuth.js";

const router = new Router()


router.post('/',checkAuth, createReview)

router.put('/:id',checkAuth, changeReview)

router.delete('/:id',checkAuth, deleteReview)

router.get('/', getReviews)

export default router