import Video from '../models/Video';
import User from '../models/User';
import routes from '../routes';
import Comment from '../models/Comment';

export const home = async (req, res) => {
    try{
        const videos = await Video.find({}).populate('creator');
        console.log(videos[0].creator);
        console.log(videos[0].creator.name);
        res.render('home', { pageTitle: 'title', videos });
    }
    catch(e) {
        console.log(e);
        res.render('home', { pageTitle: 'home', videos: [] });
    }
}
export const search = async(req, res) => {
    const {query:{term:searchingBy}} = req;
    let videos = [];
    try{
        videos = await Video.find({title:{$regex: searchingBy, $options:"i"}});
    }catch(e){
        console.log(e);
    }
    res.render("search", {pageTitle: "Search", searchingBy, videos});
}

export const video = (req, res) => res.render("videos");

export const getUpload = (req, res) => res.render("upload");
export const postUpload = async (req, res) => {
    const {body:{title, description}, file:{location}} = req;
    console.log(req.file);
    const newVideo = await Video.create({
        fileUrl: location,
        title,
        description,
        creator: req.user._id,
        comments:[],
    });
    const user = await User.findById(req.user._id);
    if(!user.videos)
        user.videos=[];
    user.videos.push(newVideo.id);
    user.save();
    
    console.log(newVideo);
    res.redirect(`${routes.videoDetail(newVideo.id)}`);
}

export const videoDetail = async(req, res) => {
    const {params:{id}} = req;
    try{
        const video = await Video.findById(id)
            .populate('creator')
            .populate('comments');
        
        const comments = await Promise.all( 
            video.comments.map(async comment => await Comment.findById(comment.id).populate('creator'))
        );

        res.render('videoDetail', {video, comments});
    }catch(e){
        console.log(e);
        res.redirect(routes.home);
    }
}
export const getEditVideo = async(req, res) => {
    const {params:{id}} = req;
    try{
        const video = await Video.findById(id);
        if(req.user && req.user._id == video.creator){
            res.render("editVideo", {video})
        }else{
            throw Error();
        }
    }
    catch(e){
        res.redirect(routes.home);
    }
}
export const postEditVideo = async(req, res) => {
    const {body:{title, description}, params:{id}} = req;
    await Video.findByIdAndUpdate(id,{title, description});
    res.redirect(routes.videoDetail(id));
}

export const deleteVideo = async(req, res) => {
    const {params:{id}} = req;

    try{
        const video = await Video.findById(id);
        if(req.user && req.user._id == video.creator){
            video.deleteOne();
            res.redirect(routes.home);
        }else{
            throw Error();
        }
    }catch(e){
        console.log(e);
    }
    res.redirect(routes.home);
}

export const postRegisterView = async (req, res) => {
    const {
        params:{id},
    }=req;
    try{
        const video = await Video.findById(id);
        video.views += 1;
        video.save();
        res.status(200);
    }catch(e){
        console.log(e);
        res.status(400);
    }finally{
        res.end();
    }    
}

export const postAddComment = async (req, res) => {
    const {
        body: {comment},
        params:{id},
        user
    }=req;
    try{
        const video = await Video.findById(id);
        const newComment = await Comment.create({
           text: comment,
           video: id,
           creator: user._id 
        });
        video.comments.push(newComment.id);
        video.save();
        res.status(200);
    }catch(e){
        console.log(e);
        res.status(400);
    }finally{
        res.end();
    }
}