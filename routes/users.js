import {Router} from 'express'
import {createAvatar, deleteUser, getUsers} from "../controllers/users.js";
import {checkAuth} from "../utils/checkAuth.js";

const router = new Router()



//http://localhost:3002/api/users
router.get('/',checkAuth, getUsers)

router.delete('/:id',checkAuth, deleteUser)

router.put('/me/avatar',checkAuth, createAvatar)


export default router