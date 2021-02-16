import routes from './routes.js';
import multer from 'multer';

//s3
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';

//ffmpeg
import stream from 'path';
import ffmpeg from 'fluent-ffmpeg';

const s3 = new aws.S3({
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_PRIVATE_KEY,
    region: "ap-northeast-2"
})

const uploadVideo = multer({
    storage: multerS3({
        s3,
        acl: "public-read",
        bucket: 'youtube-2021/video'
    })
});
const uploadAvatar = multer({
    storage: multerS3({
        s3,
        acl: "public-read",
        bucket: 'youtube-2021/avatar'
    })
});

export const uploadVideoMiddleware = uploadVideo.single('videoFile');
export const uploadAvatarMiddleware = uploadAvatar.single('avatar');

export const localsMiddleware = (req, res, next) =>{
    res.locals.siteName = "YouTube";
    res.locals.routes =  routes;
    res.locals.loggedUser = req.user || null;
    next();
}

export const encodingVideo = (req, res, next) => {
    const {file:{path}} = req;
    console.log(path);
    const command = ffmpeg(stream.join(__dirname, path))
    .format('mp4')
    .on('progress', function(progress) {
        console.log('Processing: ' + progress.percent + '% done');
    })
    .on('end', (stdout, stderr)=>{
        next();
    })
    .save(`${stream.join(__dirname, path)}.mp4`);
    // .audioCodec('libfaac')
    // .videoCodec('libx264')
}