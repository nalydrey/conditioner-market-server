import { Router } from 'express'
import {addDelFavotive, getFavorites, myFavorite} from "../controllers/favorites.js";
import {checkAuth} from "../utils/checkAuth.js";

const router = new Router()

router.get('/',checkAuth, getFavorites)

router.get('/me',checkAuth, myFavorite)

router.put('/:id',checkAuth, addDelFavotive)

export default router