import { Router } from 'express'
import {
    createProduct,
    deleteProduct,
    getAll,
    editProduct,
    createImage,
    getProduct
} from "../controllers/products.js";
import {checkAuth} from "../utils/checkAuth.js";

const router = new Router()

router.get('/',getAll)

router.post('/',checkAuth, createProduct)

router.delete('/:id',checkAuth, deleteProduct)

router.put('/:id',checkAuth, editProduct)

router.get('/:id', getProduct)

router.put('/img/:id',checkAuth, createImage)

export default router