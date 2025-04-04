import { ref} from 'vue';
import { useStore } from 'vuex';
import baseApi from '@/axios';
import { getStompClient } from '@/service/socket/socket'

export default function messagesService(){
    const store = useStore();
    const user = ref(store.state.userInfo);
    const messages = ref([]);

    const fetchMessages =  async (idUserFrom) => {
        try {
            const response = await baseApi.request({
                url: '/message/get',
                method:'POST',
                data: {
                    idUser: user.value.id,
                    idFriend: idUserFrom
                }
            })
            messages.value = response.data;
        } catch (error){
            // console.error('Lỗi khi tải tin nhắn:', error);
        }
    }

    const sendMessage = async (textMessage, friendId, urlImage, urlFile) => {
        const stompClient = getStompClient()
        const message = {
            userId: user.value.id,
            friendId: friendId,
            message: textMessage,
            urlFile: urlFile,
            urlImage: urlImage
        }
        stompClient.publish({
            destination: "/app/message/send",
            body: JSON.stringify(message)
        })
    }

    const receiveMessage = async() => {
        const stompClient = getStompClient()
        stompClient.subscribe(`/message/${user.value.id}/private`, (messageResponse) => {
            try {
                const messageData = JSON.parse(messageResponse.body);
                messages.value.push(messageData);
            } catch (error) {
                console.log("Lỗi gửi tin nhắn: ", error);
            }
        })
    }

    return {
        messages,
        fetchMessages,
        sendMessage,
        receiveMessage
    }
}
