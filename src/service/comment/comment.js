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

    let subscriptionComment = null;
    const receiveComment = async (idvideo) => {
        if(subscriptionComment) subscriptionComment.unsubscribe();

        const stompClient = getStompClient()
        subscriptionComment = stompClient.subscribe(`/comment/${idvideo}/private`, (commentResponse) => {
            try {
                const commentData = JSON.parse(commentResponse.body);
                comments.value.push(commentData);
            } catch (error) {
                console.log("Lỗi gửi tin nhắn: ", error);
            }
        })
    }

    return {
        postComment,
        postReply,
        fetchComment,
        receiveComment,
        comments
    }
}