import { Router } from 'express'
import {getManufactures} from "../controllers/manufacture.js";

const router = new Router()

router.get('/', getManufactures)

export default router