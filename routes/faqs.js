import { Router } from 'express'
import {changeFaq, createFaq, deleteFaq, getFaqs} from "../controllers/faqs.js";
import {checkAuth} from "../utils/checkAuth.js";

const router = new Router()


router.post('/',checkAuth, createFaq)

router.get('/',getFaqs)

router.put('/:id',checkAuth, changeFaq)

router.delete('/:id',checkAuth, deleteFaq)

export default router