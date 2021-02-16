const { default: axios } = require("axios");

const commentForm = document.querySelector('#jsCommentForm');
const commentText = document.querySelector('#jsCommentText');
const commentButton = document.querySelector('#jsCommentButton');

async function handleAddComment (event){
    event.preventDefault();
    const comment = commentText.value;
    commentText.value = "";
    const videoId = window.location.href.split('/videos/')[1];
    const response = await axios({
        url: `/api/${videoId}/comment`,
        method: "POST",
        data: {
            comment
        }
    });
    if(response.status === 200){
        console.log("good");
    }
}
function handleFocus(){
    commentButton.classList.add('active');
}

function handleFocusout(){
    commentButton.classList.remove('active'); 
}

function init(){
    commentForm.addEventListener('submit', handleAddComment);
    commentText.addEventListener('focus', handleFocus);
    commentText.addEventListener('focusout', handleFocusout);
}

if(commentForm){
    init();
}