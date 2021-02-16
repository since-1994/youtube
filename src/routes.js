/*global*/
const HOME = '/';
const JOIN = '/join';
const LOGIN = '/login';
const LOGOUT = '/logout';
const SEARCH = '/search';

/*users*/
const USERS = '/users';
const USER_DETAIL = '/:id';
const EDIT_PROFILE = '/edit-profile';
const CHANGE_PASSWORD = '/change-password';
const DELETE_AVATAR=  '/delete-avatar';


/*videos*/
const VIDEOS = '/videos';
const UPLOAD_VIDEO = '/upload';
const VIDEO_DETAIL = '/:id';
const EDIT_VIDEO = '/:id/edit';
const DELETE_VIDEO = '/:id/delete';


/*API*/
const API = '/api';
const REGISTER_VIEW = '/:id/view';
const ADD_COMMENT = '/:id/comment';

const routes = {
	home: HOME,
  	join: JOIN,
  	login: LOGIN,
  	logout: LOGOUT,
  	search: SEARCH,
  	users: USERS,
  	userDetail: id => {
		if(id != null){
			return `${id}`
		}else{
			return USER_DETAIL;
		}
	},
  	editProfile: EDIT_PROFILE,
  	changePassword: CHANGE_PASSWORD,
  	videos: VIDEOS,
  	uploadVideos: UPLOAD_VIDEO,
  	videoDetail: id => {
		if(id){
			return `/videos/${id}`;
		}
		return VIDEO_DETAIL;
	},
  	editVideo: (id) => {
		  if(id){
			return `/videos/${id}/edit`;
		  }else{
			return EDIT_VIDEO;
		  }
	  },
  	deleteVideo: (id) => {
		if(id){
			return `/videos/${id}/delete`;
		}else{
			return DELETE_VIDEO;
		}
	},
	deleteAvatar: DELETE_AVATAR,
	api: API,
	registerView: REGISTER_VIEW,
	addComment: (id) => {
		if(id){
			return `/api/${id}/comment`;
		}
		return ADD_COMMENT;
	}
}

export default routes;