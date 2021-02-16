import express from 'express';
import { deleteVideo, getEditVideo, postEditVideo, getUpload, postUpload, video, videoDetail, videos } from '../controllers/videoController';
import {uploadVideoMiddleware, encodingVideo} from '../middlewares';
import routes from '../routes';

const videoRouter = express.Router();
videoRouter.get(routes.home, video);

videoRouter.get(routes.uploadVideos, getUpload);
videoRouter.post(routes.uploadVideos, uploadVideoMiddleware, postUpload);

videoRouter.get(routes.videoDetail(), videoDetail);

videoRouter.get(routes.editVideo(), getEditVideo);
videoRouter.post(routes.editVideo(), postEditVideo);

videoRouter.get(routes.deleteVideo(), deleteVideo);

export default videoRouter;