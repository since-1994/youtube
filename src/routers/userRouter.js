import express from 'express';
import { getChangePassword, postChangePassword, getEditProfile, postEditProfile, userDetail, users, deleteAvatar} from '../controllers/userController.js';
import routes from '../routes.js';
import {uploadAvatarMiddleware} from '../middlewares';

const userRouter = express.Router();

userRouter.get(routes.users, users);

userRouter.get(routes.editProfile, getEditProfile);
userRouter.post(routes.editProfile, uploadAvatarMiddleware, postEditProfile);
userRouter.get(routes.deleteAvatar, deleteAvatar);

userRouter.get(routes.changePassword, getChangePassword);
userRouter.post(routes.changePassword, postChangePassword);

userRouter.get(routes.userDetail(), userDetail);


export default userRouter;
