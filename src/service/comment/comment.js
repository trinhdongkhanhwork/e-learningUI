import { ref} from 'vue';
import { useStore } from 'vuex';
import baseApi from '@/axios';
import { getStompClient } from '@/service/socket/socket'

export default function commentService(){
    const store = useStore();
    const user = ref(store.state.userInfo);
    const comments = ref([]);

    const postComment = async (commentText, idVideo) => {
        const stompClient = getStompClient()
        const comment = {
            userId: user.value.id,
            commentText: commentText,
            createdAt: null,
            updatedAt: null,
            videoId: idVideo,
            parentId: null
        }
        stompClient.publish({
            destination: "/app/comments/post",
            body: JSON.stringify(comment)
        })
    }

    const postReply = async (commentText, idVideo, parentId) => {
        const stompClient = getStompClient()
        const comment = {
            userId: user.value.id,
            commentText: commentText,
            createdAt: null,
            updatedAt: null,
            videoId: idVideo,
            parentId: parentId
        }
        stompClient.publish({
            destination: "/app/comments/post",
            body: JSON.stringify(comment)
        })
    }

    const putComment = async (comment) => {
        const stompClient = getStompClient()
        stompClient.publish({
            destination: "/app/comments/update",
            body: JSON.stringify(comment)
        })
    }

    
    const deleteComment = async (idComment) => {
        const stompClient = getStompClient()
        stompClient.publish({
            destination: "/app/comments/delete",
            body: idComment.toString()
        })
    }

    const fetchComment = async (idVideo) => {
        if(idVideo != null){
            try {
                const response = await baseApi.request({
                    url: `/comments/get/${idVideo}`,
                    method:'GET'
                })
                comments.value = response.data;
            } catch (error){
                console.error('Lỗi khi tải comment:', error);
            }
        }
    } 

    let subscriptionCommentPost = null;
    let subscriptionCommentPut = null;
    let subscriptionCommentDelete = null;
    const receiveComment = async (idvideo) => {
        if(subscriptionCommentPost) subscriptionCommentPost.unsubscribe();
        if(subscriptionCommentPut) subscriptionCommentPut.unsubscribe();
        if(subscriptionCommentDelete) subscriptionCommentDelete.unsubscribe();

        const stompClient = getStompClient()
        subscriptionCommentPost = stompClient.subscribe(`/comment/${idvideo}/post`, (commentResponse) => {
            try {
                const commentData = JSON.parse(commentResponse.body);
                comments.value.push(commentData);
            } catch (error) {
                console.error("Lỗi gửi tin nhắn: ", error);
            }
        }) 

        subscriptionCommentPut = stompClient.subscribe(`/comment/${idvideo}/put`, (commentResponse) => {
            try {
                const commentData = JSON.parse(commentResponse.body);
                comments.value.forEach(comment => {
                    if(comment.id == commentData.id) {
                        comment.commentText = commentData.commentText;
                        comment.updatedAt = commentData.updatedAt;
                    }
                });
            } catch (error) {
                console.error("Lỗi cập nhật thay đổi tin nhắn: ", error);
            }
        })

        subscriptionCommentDelete = stompClient.subscribe(`/comment/${idvideo}/delete`, (idcommentResponse) => {
            try {
                const idcommentData = parseInt(idcommentResponse.body);
                comments.value = comments.value.filter(c => c.id != idcommentData);
            } catch (error) {
                console.error("Lỗi cập nhật xóa tin nhắn: ", error);
            }
        })
    }

    return {
        postComment,
        postReply,
        deleteComment,
        putComment,
        fetchComment,
        receiveComment,
        comments,
        user
    }
}