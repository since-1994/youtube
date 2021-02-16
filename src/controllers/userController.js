import routes from '../routes';
import passport from 'passport';
import User from '../models/User';

export const getJoin = (req, res) => res.render("join", {pageTitle:"Join"});
export const postJoin = async (req, res, next) =>{
    const {body:{email, name, password, password2}} = req;
    if(password !== password2){
        res.status(400);
        res.render("join", {pageTitle: "Join"});
    }else{
        try{
            const user = await User({name, email});
            console.log(user);
            await User.register(user, password);
            next();
        }catch(e){
            console.log(e);
            console.log(email);
            res.render("join", {pageTitle: "Join"});
        }
    }
}

export const getLogin = (req, res) => res.render("login", {pageTitle: "Login"});
export const postLogin = passport.authenticate('local', {
    successRedirect: routes.home,
    failureRedirect: routes.login
})


export const githubLogin = passport.authenticate('github');
export const githubLoginCallback = async (_, __, profile, cb) => {
	const {_json:{id, avatar_url, name, email}} = profile;
    try{
      let user = await User.findOne({githubId: id})
      if(user){
        return cb(null, user);
      }else{
      	user = await User.findOne({email});
        if(user){
          return cb(null, user);
        }else{
          const newUser = await User.create({
            email,
            name,
            githubId: id,
            avatarUrl: avatar_url
          });
          return cb(null, newUser);
        }
      }
    }catch(e){
      return cb(e, null);
    }
}

export const logout = (req, res) => {
    req.logout();
    res.redirect(routes.home);
}
export const users = (req ,res) => res.send('Users');
export const userDetail = async (req ,res) => {
  const {params:{id}} = req;
  try{
    const user = await User.findById(id);
    res.render("userDetail", {pageTitle: "Profile", user:{
      _id: user.id,
      avatarUrl: user.avatarUrl === '' ? null : `/${user.avatarUrl}`,
      name: user.name,
      email: user.email
    }})
  }catch(e){
    res.redirect(routes.home);
  }
}
export const getEditProfile = async (req ,res) => {
  const {user:loggedUser} = req;

  const user = await User.findById(loggedUser._id);
  if(user){
    res.render("editProfile", {user:{
      _id: user.id,
      avatarUrl: `/${user.avatarUrl}`,
      name: user.name,
      email: user.email
    }});
  }else{
    res.redirect(routes.home);
  }
}

export const postEditProfile = async (req, res) => {
  const {
    user:{
      _id:id
    },
    body:{
      name
    }
  } = req;

  try{
    await User.findByIdAndUpdate(id, {
      name,
      avatarUrl: req.file? req.file.path : req.user.avatarUrl
    });
    const user = await User.findById(id);
    req.logout();
    req.login(user, function(err){
      console.log(err);
    });
    res.redirect(`/users/${routes.userDetail(user.id)}`);
  }catch(e){
    console.log(e);
    res.redirect(routes.home);
  }
}
export const getChangePassword = (req ,res) => res.render("changePassword");
export const postChangePassword = async (req, res) => {
  const {body:{oldPassword, newPassword, newPassword1}} = req;

  try{
    if(newPassword === newPassword1){
      const user = await User.findById(req.user._id);
      await user.changePassword(oldPassword, newPassword);
      res.redirect(`/users/${routes.userDetail(user.id)}`);
    }else{
      res.status(400);
      res.redirect(`/users${routes.changePassword}`);
    }
  }catch(e){
    console.log(e);
    res.redirect(`/users${routes.changePassword}`);
  }
}

export const deleteAvatar = async (req ,res ) => {
  try{
    await User.findByIdAndUpdate(req.user._id, {
      avatarUrl: ''
    });
    const user = await User.findById(req.user._id);
    req.logout();
    req.login(user, function(err){
      console.log(err);
    });
  }catch(e){
    console.log(e);
    res.redirect(routes.userDetail(req.user._id));
  }

  res.redirect(routes.userDetail(req.user._id));
}