import { Router } from 'express'
import {changeComment, createComment, deleteComment, getComments, getMyComments} from "../controllers/comments.js";
import {checkAuth} from "../utils/checkAuth.js";

const router = new Router()


router.post('/:id',checkAuth, createComment)

router.get('/product/:id', getComments)

router.get('/me',checkAuth, getMyComments)

router.delete('/:id',checkAuth, deleteComment)

router.put('/:id',checkAuth, changeComment)

export default router