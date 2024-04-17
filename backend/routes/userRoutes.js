// routes/userRoutes.js
import express from 'express';
import { createUser, getAllUsers, loginUser, getUserById} from '../controllers/userController.js';
import authenticateToken from '../middleware/authMiddleware.js';


const userRouter = express.Router();

userRouter.route('/user').post(createUser);
userRouter.route('/getAllUsers').get(getAllUsers);
userRouter.route('/loginUser').post( loginUser);
userRouter.route('/getUserById/:uid').get(getUserById);


export default userRouter;
